#!/bin/sh

b="app"
cd src

if [ "$1" = "app" ]; then 
	gunicorn --bind 0.0.0.0:$PORT wsgi
else
	python3 loader.py
fi