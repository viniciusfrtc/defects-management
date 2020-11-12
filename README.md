# Coding challenge: defects-management

### Challenge description
Implement the described functionality in defect.js and example-db.sql (in challenge-description/). Deadline was 72h, worked around 15h on it.

### Database assumptions

- Skipped table **workplace** since it was missing on SQL example;
- Assumed defect.status has a NOT NULL constraint;
- Used tables IDs as foreign keys since it's a best practice;
- Thought about setting also defect.status as enum but wasn't sure if I could conclude it from the code example;
- Used defect_time as id on setDefectStatus as the code example used, although I wouldn't do that since there is a unique ID in the table already.

### Running the project

I used in this project postgres and Sequelize, and I created a simple express app to make it easier for testing. I also setted up 2 different environments: dev and test, basically dev env is to run locally, and test env to perform tests.
In both cases, it is required to have postgres installed and running locally. The default connection data can be defined in src/config/database.json:

```
{
	"dev": {
		"username": "postgres",
		"password": "postgres",
		"database": "defect_management_dev",
		"host": "localhost",
		"dialect": "postgres"
	},
	"test": {
		"username": "postgres",
		"password": "postgres",
		"database": "defect_management_test",
		"host": "localhost",
		"dialect": "postgres"
	}
}
```

As you have postgres properly able to connect, you can execute these commands:

```
npm ci
NODE_ENV=dev npm run create-db
NODE_ENV=dev npm run sync-db
NODE_ENV=dev npm run seed-db
npm run start
```
This will create the database, sync relatinos and add some rows in order to make testing easier.

In order to run the tests, you only need to run:

```
npm run integration-tests
```

### Endpoints

I created 5 endpoints matching the 5 functions in the example:
- GET /machines/:machineId/defects

List all defects for a machine, by the path parameter machineId.

- POST /defect

Create a new defect, and it gets { personalNumber, description, machineId } from req.body.

- GET /machines/:machineId/defect/last

Gets the most recent defect, by the path parameter machineId.

- PUT /machines/:machineId/defect

Updates defect status (and machine status through the MachineInfo connector mock), using machineId from path parameters and { defectTime, status } from req.body.

- GET /defects

List all defects with status 1, 2 or 3.

### Final considerations

Unfortunately I didn't manage to have enough time to prepare unit tests, so I created integration tests (since unit tests would require some refactoring in terms of setting up some mock-friendly structure) which cover the same functionalities.

The things that come in my mind to implement if I would work on this for more time:
- adding winston on logger helper, so I could have a more flexible and powerful logging tool;
- adding unit tests and making integration tests more idempotent;
- setting up dockers for postgres and the app itself;
- adding endpoint validation in order to ensure data integrity.
