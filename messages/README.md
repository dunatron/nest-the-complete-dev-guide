## Messages

## App Goal

Store and retrieve messages stored in a plain JSON file  
A message is just a string, so we will be storing and retrieving strings

Our app will need the following routes

- A route to retrieve all messages we have ever saved
- A route to retrieve a message by its id
- A route to create a message

We will think about how to apply the tools nest gives us when handling these routes

- `Pipe`: Validate data contained in the request
- `Guard`: Make sure the user is authenticated
- `Controller`: Route the request to a particular function
- `Service`: Run some business logic
- `Repository`: Access a database

### `/messages`

Retrieve a list of all messages

- `Pipe`: No data inside request to validate, so no pipe is needed
- `Guard`: Nothing is said about Auth so we dont need a guard
- `Controller`: We do want to route a request so we will need a controller
- `Service`: We will need some logic which will try reach into the DB/file
- `Repository`: We are treating a local file as our database of messages

### GET `/messages`

Retrieve a list of all messages

- `Pipe`: No data inside request to validate, so no pipe is needed
- `Guard`: Nothing is said about Auth so we dont need a guard
- `Controller`: We do want to route a request so we will need a controller
- `Service`: We will need some logic which will try reach into the DB/file
- `Repository`: We are treating a local file as our database of messages

### POST `/messages`

Retrieve a list of all messages

```json
{ "content": "hi there" }
```

- `Pipe`: We have some incoming data, validate we have the "content" property and that it is a string, ensure not too long
- `Guard`: No Auth so no guard
- `Controller`: We do want to route a request so we will need a controller
- `Service`: We will need some logic which will try reach into the DB/file
- `Repository`: We are treating a local file as our database of messages

## Module

A module is created to wrap sets of functionality

Module: MessagesModule

- Pipe:
- Controller: MessagesController
- Service: MessagesService
- Repository: MessagesRepository

- `nest generate module messages`: creates a new module
- `nest generate controller messages/messages --flat`: creates a new controller for messages --flat means do not create an extra directory for the controllers

## Setting up Automatic validation

The code written to do this is actually quite small.  
Nest will basically handle this stuff automagically.

1. Tell nest to use gobal validation
2. Create a class that describes the different properties that the request body should have. this class is referred to as a DTO(data transfer object)
3. Add validation rules to the class
4. Apply that class to the request handler

## DTO(Data Transfer Object)

Carries data between two places, a dto is a very clear description of what some form of data looks like as it is being sent along with the request

## Services vs Repositories

One of the biggest challenges you will run into in the world of nest is understanding why services exist and how they are different from a repository.  
We will always write a service class whenever we run some business logic. We also create a service whenever we need to fetch some data from a repository.  
Reposiroes is where we write the storage logic, like directly interacting with the database, write info to a file, or anything like that, it goes into a repository.  
They both frquently end up having very similar method names!

## Services

- Its a class
- #1 place to put business logic
- uses one or more repositories to find or store data

## Respositories

- Its a class
- #1 place to put storage-related logic
- Usually ends up being a TypeORM entity, a Mongoose schema, or similar

## Exception handling

Nest has some prebuilt wrapers to help with exceptions, such as not found, timeouts etc.  
These Wrappers will formulate a nice response for the end user  
Most common exceptions include

- NotFoundException
- BadRequestException
- GatewayTimeoutException
- UnauthorizedException
- UnprocessableEntityException

## Dependency Injection

Everything in nest revolves around dependency injection so it is important that you understand it. Dependency injection is a little bit complicated, and challenging to understand why it exists.
How to do it is not so important, understanding the why is

### Inversion of control pricipal

Classes should not create instances of its dependencies on its own. If you follow this rule you will have an easier time writing reusable code

currently we are doing the following, which means the class creates its own dependency manually

`Bad` MessagesService creates its own copy of MessagesRepository

```ts
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    this.messagesRepo = new MessagesRepository();
  }
}
```

`Better` MessagesService creates its own copy of MessagesRepository

```ts
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor(repo: MessagesRepository) {
    this.messagesRepo = repo;
  }
}
```

`Best` MessagesService receives its dependency, and it doesn't specifically require MessagesRepository

```ts
interface Repository {
  findOne(id: string);
  findAll();
  create(content: string);
}

export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor(repo: MessagesRepository) {
    this.messagesRepo = repo;
  }
}
```

## Dependency Injection maintaining Inverion of control pricipal

Dependency injection is all about making use of inverion of control withoit having to create a ton of different classes and instances everytime we want to use a controller.

We can use a Nest DI Container(Dependency Injection Container)  
Sometimes referred to as Injector so DI Container/Injector  
It is an object with some properties in it

## DI COntainer

is an object with a couple of different properties in it, simplified, it store two sets of information

1. store a list of all the different classes and there dependencies
2. secondly it will store a list of all the different instances this container has created

#### DI Container flow

- At startup, register all classes with the container
- Container will figure out what each dependency each class has
- We then ask the container to create am instance of a class for us
- Container creates all required dependencies and gives us the instance
- Container will hold onto the created dependency instances and reuse them if needed

#### CLass dependency injection

```ts
// this can be written in a more condensed way
messagesRepo: MessagesRepository;
constructor(messagesRepo: MessagesRepository) {
  this.messagesRepo = messagesRepo;
}

// like this
// Which means the properties are automatically assigned to the class
constructor(public messagesRepo: MessagesRepository) {

}
```
