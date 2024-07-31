FROM python:3.9-alpine

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt
RUN apk add --no-cache busybox-extras
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/bin/sh", "/app/docker-entrypoint.sh"]
