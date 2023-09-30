from datetime import datetime
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import spacy
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

demo_candidates = [{'id': "1", 
                'name': "li xintong", 
                'gender': 'F',
                'birthYear': 2018,
                'education': 'Degree',
                'skillSet': 'Program Direction, Leadership, Youth Mentoring, Mentoring, Hosting Services, Live Streaming, Social Media Consulting, Cross-functional Team Leadership, Content Creation, Organization Skills, Agile Project Management, Online Content Creation, Start-ups, Community Building, Team Management, Operations Management, Dance, Event Management, Film Production, Social Media, Production Planning, Project Management, Program Management, Public Speaking, Community Management, Video Production'
                }, 
                {'id': "2", 
                'name': "li sizhuang", 
                'gender': 'F',
                'birthYear': 2077,
                'education': 'Primary School',
                'skillSet': 'Acting, Creative Writing, Film Editing, Film Production, Final Cut Pro, Mac OS, Microsoft Office, Radio Broadcasting, Social Media, Sociology, Teaching, Theatre, Microsoft Excel, Event Management, Public Speaking, Event Planning, Public Relations, Social Media Marketing, Management'
                }, 
                {'id': "3", 
                'name': "li sizhuang 2 号", 
                'gender': 'F',
                'birthYear': 2088,
                'education': 'Primary School',
                'skillSet': 'Communication and Information, Radio and Television Broadcasting, Public relations, Pitching Ideas, Team Management, Creative Ideation, Project Management, Content Strategy, Social Media Marketing, Program Facilitation, Digital Marketing, Social Media, Teamwork, Customer Service, Interacting with people'
                }, 
                ]

entry = (896, 
         'UX Technical Lead and Designer', 
         '/en/job/492603/ux-technical-lead-and-designer', 
         'Infocomm Technology', 
         # '2023-10-31 01:30:00', 
         datetime(2023, 10, 31, 1, 30 ,0),
         'Possess a Degree in any discipline or equivalent  At least 8 to 10 years of relevant experience with industry exposure to B2B organisations  Strong communication and interpersonal skills  Track record in supporting senior stakeholders on their business needs Possess drive and able to thrive in a dynamic environment  Results-driven and takes ownership and accountability  Experience with end-to-end HR programmes; including but not limited to leading projects,   campus recruitment fairs, recruitment branding  Strong business acumen and analytical skills Proactive and a team player')

p = {"id": entry[0],
    "name": entry[1],
    "link": entry[2],
    "description": entry[5],
    "type": entry[3],
    "closing": entry[4].strftime("%m/%d/%Y")}

# print(p)

def calculate_fuzzy_match_score(str1, str2):
    return fuzz.ratio(str1, str2)

def match(candidates: list, position: dict):
    nlp = spacy.load("en_core_web_sm")

    '''
    job_description = position["description"] 
    candidate_scores = []
    for candidate in candidates:
        candidate_skillset = candidate["skillset"]
        score = calculate_fuzzy_match_score(job_description, candidate_skillset)
        candidate_scores.append({"candidate": candidate, "score": score})
    sorted_candidates = sorted(candidate_scores, key=lambda x: x["score"], reverse=True)
    print(candidate_scores)
    return sorted_candidates
    '''
    position_text = position["description"]
    position_doc = nlp(position_text)
    position_processed = " ".join([token.lemma_ for token in position_doc])
    tfidf_vectorizer = TfidfVectorizer()

    for candidate in candidates:
        skillset_text = candidate["skillSet"]
        skillset_doc = nlp(skillset_text)
        skillset_processed = " ".join([token.lemma_ for token in skillset_doc])
        tfidf_matrix = tfidf_vectorizer.fit_transform([position_processed, skillset_processed])
        similarity_score = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
        candidate["score"] = similarity_score
    sorted_candidates = sorted(candidates, key=lambda x: x["score"], reverse=True)

    for i, candidate in enumerate(sorted_candidates):
        print(f"Rank {i + 1}: {candidate['name']} - Similarity Score: {candidate['score']:.4f}")

    scores = [d["score"] for d in sorted_candidates]
    n = len(scores)
    max_score = max(scores)
    for d in sorted_candidates:
        d["matchingScore"] = "{:.1f}".format(d["score"] / max_score * 100)
    for d in sorted_candidates:
        print(d)
    for candiate in sorted_candidates:
        candiate.pop("score", None)

    return sorted_candidates


if __name__ == '__main__':
    match(demo_candidates, p)


