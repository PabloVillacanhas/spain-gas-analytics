#!/bin/sh

b="app"
cd src

if [ "$1" = "app" ]; then 
	if [[ -z "${PORT}" ]]; then 
		gunicorn --bind 0.0.0.0:$PORT wsgi
	else
		gunicorn --bind 0.0.0.0:5001 wsgi
else
	python3 loader.py
fi