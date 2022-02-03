import json
import json
import sys
import indeed


# last_page = indeed.find_max_page()

indeed_result = indeed.extract_indeed_jobs(1)

data = {
    "result": indeed_result
}

print(json.dumps(data))
sys.stdout.flush()
