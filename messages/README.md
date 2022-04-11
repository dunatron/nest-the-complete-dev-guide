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
- `nest generate module controller messages --flat`: creates a new controller for messages --flat means do not create an extra directory for the controllers
