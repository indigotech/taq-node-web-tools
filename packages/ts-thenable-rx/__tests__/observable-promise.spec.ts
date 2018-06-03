import 'reflect-metadata';
import 'jest';

import { AsObservablePromise, ObservablePromise } from '../src';
import { Subscription } from 'rxjs';

class AsObservablePromiseTest {
  @AsObservablePromise()
  resolveWith(aFunction: () => any): ObservablePromise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(aFunction());
      } catch (e) {
        reject(e);
      }
    });
  }
}

describe('Observable Promise', () => {

  const subscriptions: Subscription[] = [];

  afterEach(() => {
    subscriptions.forEach(s => s.unsubscribe());
    subscriptions.splice(subscriptions.length);
  });

  describe('AsObservablePromise Decorator', () => {

    let asObservablePromiseTest: AsObservablePromiseTest = null;

    beforeEach(() => {
      asObservablePromiseTest = new AsObservablePromiseTest();
    });

    it('fires next event when promise resolves', done => {

      const result = 'test';
      subscriptions.push(asObservablePromiseTest.resolveWith(() => result)
        .asObservable()
        .subscribe(
        next => {
          expect(next).toBe(result);
          done();
        },
      ));

    });

    it('fires error event when promise is rejected', done => {

      const errorResult = new Error();
      subscriptions.push(asObservablePromiseTest.resolveWith(() => { throw errorResult; })
        .asObservable()
        .subscribe(
        () => expect(true).toBe(false), // this should never be called
        error => {
          expect(error).toBe(errorResult);
          done();
        },
        () => expect(true).toBe(false), // this should never be called
      ));

    });

    it('fires complete event when promise is resolved', done => {

      const result = 'test';
      subscriptions.push(asObservablePromiseTest.resolveWith(() => result)
        .asObservable()
        .subscribe(
        next => {
          expect(next).toBe(result);
        },
        () => expect(true).toBe(false), // this should never be called
        () => done(),
      ));

    });

  });

  describe('ObservablePromise', () => {

    it('creates observable from resolved promise', done => {
      const result = 'test';
      const op = new ObservablePromise(() => Promise.resolve(result));
      subscriptions.push(op
        .asObservable()
        .subscribe(
        next => {
          expect(next).toBe(result);
          done();
        },
      ));
    });

    it('creates observable from resolved promise and call completed', done => {
      const result = 'test';
      const op = new ObservablePromise(() => Promise.resolve(result));
      subscriptions.push(op
        .asObservable()
        .subscribe(
        next => {
          expect(next).toBe(result);
        },
        () => expect(true).toBe(false), // this should never be called
        () => done(),
      ));
    });

    it('creates observable from rejected promise', done => {
      const errorResult = new Error();
      const op = new ObservablePromise(() => Promise.reject(errorResult));
      subscriptions.push(op
        .asObservable()
        .subscribe(
        () => expect(true).toBe(false), // this should never be called
        error => {
          expect(error).toBe(errorResult);
          done();
        },
        () => expect(true).toBe(false), // this should never be called
      ));
    });

    it('creates observable with provided context', done => {
      const context = { key : 'context'};
      const op = new ObservablePromise(function() { return Promise.resolve(this); }, context);
      subscriptions.push(op
        .asObservable()
        .subscribe(
        next => {
          expect(next).toBe(context);
          done();
        },
      ));
    });

    it('calls then with resolved value', done => {
      const result = 'test';
      const op = new ObservablePromise(() => Promise.resolve(result));
      op.then(value => {
        expect(value).toBe(result);
        done();
      });
    });

    it('calls then with rejected error', done => {
      const errorResult = new Error();
      const op = new ObservablePromise(() => Promise.reject(errorResult));
      op.then(
        () => expect(true).toBe(false), // this should never be called
        error => {
          expect(error).toBe(errorResult);
          done();
        },
      );
    });

    it('calls catch with rejected error', done => {
      const errorResult = new Error();
      const op = new ObservablePromise(() => Promise.reject(errorResult));
      op.catch(error => {
        expect(error).toBe(errorResult);
        done();
      });
    });

  });

});
