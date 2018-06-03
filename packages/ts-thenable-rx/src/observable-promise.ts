import { defer, Observable } from 'rxjs';

export type PromiseGenerator<T> = () => Promise<T>;
export type FulfillCallback<T, TResult> = ((value: T) => TResult | PromiseLike<TResult>) | undefined | null;
export type RejectCallback<TResult> = ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null;

export class ObservablePromise<T> implements Promise<T> {

  [Symbol.toStringTag]: 'Promise'; // need to comply with ES6 Promise interface

  private promiseGenerator?: PromiseGenerator<T>;
  private generatorContext?: any;

  constructor(
    promiseGenerator?: PromiseGenerator<T>,
    generatorContext?: any,
  ) {
    this.promiseGenerator = promiseGenerator;
    this.generatorContext = generatorContext;
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: FulfillCallback<T, TResult1>,
    onrejected?: RejectCallback<TResult2>,
  ): Promise<TResult1 | TResult2> {
    return this.generatePromise().then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?: RejectCallback<TResult>,
  ): Promise<T | TResult> {
    return this.generatePromise().catch(onrejected);
  }

  finally(onfinally?: () => void): Promise<T> {
    return this.generatePromise().finally(onfinally);
  }

  asObservable?(): Observable<T> {
    return defer(() => this.generatePromise());
  }

  private generatePromise?(): Promise<T> {
    if (this.generatorContext) {
      return this.promiseGenerator.bind(this.generatorContext)();
    } else {
      return this.promiseGenerator();
    }
  }
}
