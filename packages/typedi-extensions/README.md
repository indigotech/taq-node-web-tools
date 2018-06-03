# Typedi Extension 

Typedi's extensions.


## Contents

- [`Injectable` decorator](#injectable-decorator) - [#source](src/injectable.decorator.ts)


# Injectable decorator

`Injectable` is a decorator that makes a class dependency injectable outside of Typedi's ecosystem.

It's specially useful when you want DI in classes with their own life-cycles (i.e React components).

```typescript
import { Container, Service } from 'typedi';
import { Injectable } from '@taqtile/typedi-extensions';

@Service()
class AService {
  doSomething() {
    /* ... */
  }
}

Container.set('namedValue', 'some value')

@Injectable()
export class Template extends Component<any, any> {
  constructor(
    props?: any, // passed by React's engine
    context?: any, // passed by React's engine
    aService?: AService, // injected using Typedi
    @Inject('namedValue') strValue: string, // Typedi's named injection
  ) {
    super(props, context);
    aService.doSomething();
    console.log(strValue) // 'some value'
  }
}
```


**!!! Warning !!!**
- Currently `Injectable` does not support member injection using `Inject` (though you can use
it in class constructor)

```typescript
@Injectable()
class SomeClass {

  @Inject('notInjected') failsToInject;

  constructor(@Inject('injected') injected) { }
}
```

