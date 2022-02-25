import indeed
from save import save_to_file

last_page = indeed.find_max_page()

indeed_result = indeed.extract_indeed_jobs(last_page)

save_to_file(indeed_result)
