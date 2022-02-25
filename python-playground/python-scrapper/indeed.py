import requests
from bs4 import BeautifulSoup

LIMIT = 50
INDEED_URL = f"https://indeed.com/jobs?q=Python&limit={LIMIT}"

def find_max_page(page = 1):
    indeed_resul = requests.get(f"https://indeed.com/jobs?q=Python&limit=50&start={(page-1) * 50}")

    soup = BeautifulSoup(indeed_resul.text, "html.parser")
    pagination = soup.find("div", class_="pagination")
    links = pagination.find_all("a")
    hasNext = False
    hasPrev = False

    for link in links:
        if link['aria-label'] == "Next" :
            hasNext = True
        elif  link['aria-label'] == "Previous" :
            hasPrev = True
    
    if hasNext:
        pages = []

        links = links[1:-1] if hasPrev else links[0:-1]

        for link in links:
            pages.append(int(link.string))

        return find_max_page(pages[-1])
    else: 
        return int(links[-1].string)


def extract_job(html):
    title = html.find("span", title=True).string
    company = html.find("span", class_="companyName").string
    location = html.find("div", class_="companyLocation").string
    location = "Remote" if location is None else location
    job_id = html['data-jk']
    return { "title": title, "company": company, "location": location, "link": f"https://www.indeed.com/viewjob?jk={job_id}" }

def extract_indeed_jobs(last_page):
    jobs = []
    for page in range(last_page):
        html = requests.get(f"{INDEED_URL}&start={page * LIMIT}")
        soup = BeautifulSoup(html.text, "html.parser")
        results = soup.find_all("a", class_="tapItem")
        
        for result in results:
            job = extract_job(result)
            jobs.append(job)
    
    return jobs



