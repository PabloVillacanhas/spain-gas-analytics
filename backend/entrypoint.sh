#!/bin/bash

b="app"

if [ "$1" = "app" ]; then 
	cd src 
	flask run
else
	python3 -m src.loader
fi