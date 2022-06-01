from locust import HttpUser, task, between
import random


class WebSiteUser(HttpUser):
    wait_time = between(3, 4)

    @task
    def index(self):
        index = [1, 2, 3]
        self.client.get(f"polls/{random.choice(index)}")
