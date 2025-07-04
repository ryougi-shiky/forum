#!/bin/bash

mongorestore --host localhost --port 27017 --db ani /docker-entrypoint-initdb.d/dump/ani
