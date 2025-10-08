#!/bin/sh
FILE=./.env
if test -f "$FILE"; then
  echo "Exists"
else
  cp ./.env.example ./.env
fi
