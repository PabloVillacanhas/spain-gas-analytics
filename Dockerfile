FROM node:14-alpine as base
RUN apk add build-base python3-dev gcc musl-dev postgresql-dev geos
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install pipenv
COPY backend backend
WORKDIR /usr/local/app/backend
RUN pipenv install
ENV PYTHONPATH=/usr/local/app/backend/src
COPY ./backend/scalegrid.crt /etc/ssl/certs/scalegrid.crt
EXPOSE 5001

FROM base as scrapper
ENTRYPOINT ["sh", "entrypoint.sh", "scrapper"]

FROM base as app
ENTRYPOINT ["sh", "backend/entrypoint.sh", "app"]