FROM ubuntu:20.04
RUN apt update && apt install -y python3
WORKDIR /var/www/html
# RUN echo "Hello, <strong>Docker</strong>" > index.html
COPY ["index.html", "."]
CMD ["python3", "-u", "-m", "http.server"]