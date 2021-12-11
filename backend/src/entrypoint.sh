#!/bin/bash

b="app"

if [ "$1" = "app" ]; then 
	pipenv run flask run 
else
	pipenv run python3 -m backend.loader
fi