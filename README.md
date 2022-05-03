# NestJS: The Complete Developer's Guide

Author: Stephen Grider - Engineering Architect

`NestCLI`

- Tool for generating and running projects

## Packages

`@nestjs/common`: Contains vast majority of functions, classes, etc, that we need from nest  
`@nestjs/core`:  
`@nestjs/platform-express`: Nest can uses espress js for handling HTTP requests. In nest we have 2 options, express or fastify for handling requests and responses for a nest js server. This packages says we want to install an adapter between express and nest. Behind the scenes nest will use express for request handling  
`reflect-metadata`: Helps make decorators work  
`typescript`: Make our javascript typesafe

## Express

`Request-Response-Cycle`: A request gets made to the server, inside the server we have some code that will process that request, validate data, handle request differently depending on the route. Then eventually we will formulate a response and send it back to whoever made the request. This is nearly alwayds the same.

- `Pipe`: Validate data contained in the request
- `Guard`: Make sure the user is authenticated
- `Controller`: Route the request to a particular function
- `Service`: Run some business logic
- `Repository`: Access a database

In Nest js we have tools to help with the above process.

## Parts of Nest

- `Controllers`: Handles incoming requests
- `Services`: Handles data access and business logic
- `Modules`: Groups together code
- `Pipes`: Validates incoming data
- `Filters`: Handles errors that occur during request handling
- `Guards`: Handles authentication
- `Interceptors`: Adds extra logic to incoming requests or outgoing responses
- `Repositories`: Handles data stored in a DB

Note: The bare minimum would be to use a `Module` and a `Controller` which weould allow for a fully functional server

## Entry File src/main.ts

The entry files is `src/main.ts` in every next js application  
We are tring to create a class that is going to serve as a controller inside our application.  
To run `npx ts-node-dev src/main.ts`

```js
import { Controller, Module } from "@nestjs/common";

@Controller()
class AppController {}
```

In the code above you add a new method to handle a new request

```js
import { Controller, Module, Get } from "@nestjs/common";

@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return "Hi There!";
  }
}
```

## File naming conventions

In the scratch example we have all three of the needed pieces in the same file
`main.ts`

- `class AppController`
- `class AppModule`
- `function bootstrap`

#### Convetions

- One class per file (some exceptions)
- Class names should include the kind of thing we are creating
- Name of class and name of file should always match up
- filenme template: `{name}.type_of_thing.ts`

The scratch example should extract the functionality

- `main.ts`: function bootstrap
- `app.controller.ts`: class AppController {}
- `app.module.ts`: class AppModule {}

## Creating a new nest project

- Install the CLI globally `npm install -g @nestjs/cli`
- `nest new project-name-here`

## Creating a new nest module

- `nest generate module messages`

## Unit Testing

Make sure that individual methods on a class are working correctly

## Integration Testing

Test the full flow of a feature
