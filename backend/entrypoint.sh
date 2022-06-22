#!/bin/sh

cd src

echo $PORT
if [ "$1" = "app" ]; then 
	if [[ -z "${PORT}" ]]; then 
		gunicorn --bind 0.0.0.0:5001 wsgi
	else
		gunicorn --bind 0.0.0.0:$PORT wsgi
	fi
else
	python3 loader.py
fi