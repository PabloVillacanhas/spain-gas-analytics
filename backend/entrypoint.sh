#!/bin/sh

b="app"
cd src

if [ "$1" = "app" ]; then 
	flask run --host 0.0.0.0
else
	python3 loader.py
fi