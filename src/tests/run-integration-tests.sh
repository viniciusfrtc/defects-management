#!/bin/bash
npm run create-db
npm run sync-db
npm run seed-db
mocha --recursive \"./src/**/*.test.js\"
npm run drop-db
