## Used Car Pricing

## Requirements

- Users sign up with email/password
- Users get an estimate for how much their car is worth based on the make/model/year/mileage
- Users can report what they sold their vehicles for
- Admins have to approve reported sales

## Routes based on requirements

- POST /auth/signup
  - body {email, password}
  - Create a new user and signin
- POST /auth/signin
  - body {email, password}
  - Signin as an existing user
- GET /reports
  - QS - make, model, year, mileage, longitude, latitude
  - Get an estimate for the car value
- POST /reports
  - Body - {make, model, year, mileage, longitude, latitude, price}
  - Report how much a vehicle sold for
- PATCH /reports/:id
  - Body - {approved}
  - Admin will approve or reject a report submitted by a user

## Module design

Think about the different controllers, services and repositories we will probably need to create

#### Controllers

- UsersController
- ReportsController

#### Services

- UsersService
- ReportsService

#### Repositories

- Usersrepository
- ReportsRepository

The above things actually get grouped into there own module

`UsersModule`

- UsersController
- UsersService
- Usersrepository

`ReportsModule`

- ReportsController
- ReportsService
- ReportsRepository

## Create some sekelton code

Use the nest CLI to generate the controllers and services,

- run `nest g module users`
- run `nest g module reports`
- run `nest g controller users`
- run `nest g controller reports`
- run `nest g service users`
- run `nest g service reports`

## Type orm

Type orm interfaces nicely with nest, typeorm can be a bit of a pain to setup but with nest tools its a treat/match made in heavan

TypeORM can interface with a variety of sql databases and a non sql database(MongoDB)

- SQLite
- Postgres
- MySQL
- MongoDB

We will be first setting up a connection to sqlite as it is the easiest to setup

- run `yarn add @nestjs/typeorm typeorm sqlite3`

Using nest js and TypeORM is straight forward but even then, we have to write a decent amount of code to get nest and typeORm to cooperate, the issue isnt the amount of code, but that we need to put code in a lot of different locations and it can be confusing what the different pieces of code are doing for us

## Connecting to a DB

Connection to the DDatabase is done inside the AppModule, which is automatically shared down to the Users and Reports Modules

Inside both our Users and reports Module we are going to create two very special files, which are reffered to as `EntityFiles`

- UserEnitity: Lists the different properties that a user has (no functionality)
- ReportEnitity: Lists the different properties that a user has (no functionality)

## Entity Files

An Entity file defines a type of resource or a single kind of thing we want to store inside our application

## Creating an Entity

- Create an entity file, and create a class in it that lists all the properties that your entity will have
- Connect the entity to its parent module. This creates a repository
- Connect the entity to the root connection (in app module)

### UsersModule

- `UsersEntity`: Lists the different properties that A User has (no functionality)
- `UsersRepository`: Methods to find, update, delete, create a user

### ReportsModule

- `ReportEntity`: Lists the different properties that a report has (no functionality)
- `ReportsRepository`: Methods to find, update, delete, create a report

## Repository API TypeORM

`create()` Makes a new instance of an entity, but does not persist it to the DB
`Save()` Adds or updates a record to the DB
`find()` Runs a query and returns a list of entities
`findOne()` Run a query, returning the first record matching the search criteria
`remove()` Remove a record from the DB
