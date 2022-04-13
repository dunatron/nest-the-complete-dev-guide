## DI(Dependency Injection)

This mini project is all about dependency injection

## Init project

Initialize new nest project

- `nest new dependency-injection`

Generate the modules

- `nest g module computer`
- `nest g module cpu`
- `nest g module disk`
- `nest g module power`

Generate the Services

- `nest g service cpu`
- `nest g service power`
- `nest g service disk`

Generate the controller

- `nest g controller computer`

## DI Between modules

How to get DI between different modules in nest

By default services are private and can only be used inside of its module.  
To change that behaviour we need to explicity export it

1. Add PowerService to the PowerModule's list of exports
2. Import the PowerModule into the CpuModule
3. Define the constructor method on CpuService and add 'PowerService' to it

Step 1

```ts
import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}
```

Step 2

```ts
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '../power/power.module';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
})
export class CpuModule {}
```

Step 3

```ts
import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}
}
```
