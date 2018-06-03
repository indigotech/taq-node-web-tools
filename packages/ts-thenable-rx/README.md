# Typescript Thenable RX extensions

Thenable RXjs extensions


## Contents

- [`ObservablePromise` class](#observable-promise) - [#source](observable-promise.ts)
- [`AsObservablePromise` decorator](#as-observable-promise-decorator) -
[#source](as-observable-promise.decorator.ts)


# Observable Promise

`ObservablePromise` is an extension of `Promise` adding a `asObservable` method which creates
an Observable from a promise.

## General use

```typescript
function returningPromise(): Promise<any> {
  /* ... */
}

const observablePromise = new ObservablePromise(returningPromise);

// can be used as Promise
observablePromise
  .then(/* ... */);

// or as observable
observablePromise
  .asObservable()
  .subscribe(
    /* ... */
  );
```

**!!! Warning !!!**
- `ObservablePromise` defers the creation of a promise. The real promise will be created when
a `then`, `catch` or `subscribe` is invoked.

## Promise generator's context

It's also possible to pass a context to the promise generator function:

```typescript
function returningPromise(): Promise<number> {
  return Pomise.resolve(this.value);
}

const context = { value: 1 };

const observablePromise = new ObservablePromise(returningPromise, context);

observablePromise
  .asObservable()
  .subscribe(console.log); // 1
```

This is specially usefull when you want to invoke a class method:

```typescript
class MyClass {
  constructor(private aMember: number) { }

  public deferMemberValue(): Promise<number> {
    return Promise.resolve(this.aMember);
  }
}

const anInstance = new MyClass(1);

const observablePromise = new ObservablePromise(MyClass.prototype.deferMemberValue, anInstance);

observablePromise
  .asObservable()
  .subscribe(console.log); // 1
```


# As Observable Promise decorator

Intead of manually creating an `ObservablePromise` object you can automatically convert a method returning promise into an observable-promise by decorating a class method:

```typescript
class SomeClass {
  @AsObservablePromise()
  returningObservablePromise(): ObservablePromise<string> {
    return this.returningPromise();
  }

  returningPromise(): Promise<string> {
    return Promise.resolve('some value');
  }
}
```
