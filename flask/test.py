# Import Modules
import csv
import requests
import urllib3
from bs4 import BeautifulSoup
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Create dictionary of { job : [ job website link, job category, job closing ] }
job_dict = {}
html_table = requests.get("https://psacareers.singaporepsa.com/en/listing/?page=1&page-items=250").text
html_table = html_table.split("<table>")[1].split("</table>")[0]
for job in html_table.split("<tr>"):
    try:
        name = job.split("<a class=\"job-link\" href=\"")[1]
        name = name.split("</a>")[0]
        name = name.split("\">")
        cat = job.split("<span class=\"categories\">")[1].split("</span>")[0]
        date = job.split("datetime=\"")[1].split("\">")[0]
        job_dict[name[1]] = [name[0], cat, date]
    except:
        continue

with open("./output.csv", "w", newline="", encoding="utf-8") as csv_file:
    csv_writer = csv.writer(csv_file)
    split_words = ["Requirements:", "Qualifications:", "Requirements", "Qualifications", "requirements"]
    for job in job_dict.keys():
        job_url = f"https://psacareers.singaporepsa.com{job_dict[job][0]}"
        print("Visiting Job URL " + job_url)
        job_desc = requests.get(job_url).text
        job_desc_clean = BeautifulSoup(job_desc, "lxml").text
        # Find split word
        try:
            for word in split_words:
                if job_desc_clean.find(word) != -1:
                    split_word = word
                    break
            job_requirements = job_desc_clean.split(split_word)[1].split("Advertised")[0].rstrip().strip()
            print(job_requirements)
            csv_writer.writerow([job, job_dict[job][0], job_dict[job][1], job_dict[job][2], job_requirements])
        except IndexError:
            print("List Index out of Range")
        except:
            print("Unhandled error")
