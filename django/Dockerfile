FROM python:3.8

COPY ./ ./django
WORKDIR ./django

RUN pip3 install -r requirements.txt

EXPOSE 8080

RUN chmod 755 ./run.sh

ENTRYPOINT ["./run.sh"]