#!/bin/sh

b="app"
cd src

if [ "$1" = "app" ]; then 
	gunicorn --bind 0.0.0.0:5000 wsgi
else
	python3 loader.py
fi