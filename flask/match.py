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
                'skillSet': 'Python, Programming, frontend, backend, UI'
                }, 
                {'id': "2", 
                'name': "li sizhuang", 
                'gender': 'F',
                'birthYear': 2077,
                'education': 'Primary School',
                'skillSet': 'driving, electric engineering, Java'
                }, 
                ]

entry = (896, 
         'UX Technical Lead and Designer', 
         '/en/job/492603/ux-technical-lead-and-designer', 
         'Infocomm Technology', 
         # '2023-10-31 01:30:00', 
         datetime(2023, 10, 31, 1, 30 ,0),
         'This is a software engineer position with expertise in Python, Django, and web development')

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
    nlp = spacy.load("en_core_web_lg")

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

    for candiate in sorted_candidates:
        candiate.pop("score", None)

    return sorted_candidates


if __name__ == '__main__':
    match(demo_candidates, p)


