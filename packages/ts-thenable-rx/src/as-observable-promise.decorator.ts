import { ObservablePromise } from './observable-promise';

export function AsObservablePromise() {
  return (_targetClass: any, _method: string, methodDescriptor: any) => {
    const originalMethod = methodDescriptor.value;

    return {
      value() {
        // arguments cannot be referenced inside arrow functions when targeting ES3 / ES5
        const args = arguments;
        return new ObservablePromise<any>(() => originalMethod.apply(this, args));
      },
    };
  };
}
