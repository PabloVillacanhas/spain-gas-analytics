#!/bin/bash

b="app"

if [ "$1" = "app" ]; then 
	flask run
else
	python3 loader
fi