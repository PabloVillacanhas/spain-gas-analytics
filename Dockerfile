FROM node:14-alpine
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN pip3 install pipenv
COPY ./src/backend /usr/local/gas
WORKDIR /usr/local/gas
RUN pipenv install
EXPOSE 3000:3000
CMD ["sleep", "10000"]