FROM python:3-alpine3.18
WORKDIR /app
COPY . /app
RUN apk update
RUN apk add g++ libpq-dev libc-dev geos-dev
RUN pip install -r requirements.txt
EXPOSE 5000
CMD flask run --debug --host=0.0.0.0
