/* tslint:disable:ban-types */
export interface GuardOptions {
  condition: Function;
  onFalse?: Function;
}
/* tslint:enable:ban-types */

export function Guard(options: GuardOptions) {
  return (_targetClass: any, _method: string, methodDescriptor: any) => {
    const originalMethod = methodDescriptor.value;

    methodDescriptor.value = function() {
      if (options.condition.apply(this, arguments)) {
        return originalMethod.apply(this, arguments);
      } else if (options.onFalse) {
        return options.onFalse.apply(this, arguments);
      }
    };

    return methodDescriptor;
  };
}
