#!/bin/bash
npm run create-db-test
npm run sync-db-test
npm run seed-db-test
mocha --recursive \"./src/**/*.test.js\"
npm run drop-db-test
