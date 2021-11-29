## Installation
Request for the necessary environment variables

```bash
$ npm install

# Install Prisma globally
$ npm i prisma -g 

# Setup the database with an already created migration
$ prisma db push

# After you make changes to the db schema, create a new migration 
$ prisma migrate dev --name "the name you want to give to the migration"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docs
PRISMA: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch

NESTJS: https://docs.nestjs.com/first-steps