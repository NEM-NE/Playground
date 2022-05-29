#!/bin/bash
python ./test/manage.py makemigrations
python ./test/manage.py migrate

python ./test/manage.py runserver 0.0.0.0:8080