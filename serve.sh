#!/bin/sh

docker build -t bolt .
docker run -d --rm -p 80:3000 bolt
