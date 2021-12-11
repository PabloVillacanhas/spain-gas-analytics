FROM node:14-alpine as base
RUN apk add build-base python3-dev gcc musl-dev postgresql-dev geos
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install pipenv
WORKDIR /usr/local/backend
COPY ./src/backend .
RUN pipenv install --system
EXPOSE 5000:5000

FROM base as scrapper
ENTRYPOINT ["sh", "entrypoint.sh", "loader"]

FROM base as app
ENTRYPOINT ["sh", "entrypoint.sh", "app"]