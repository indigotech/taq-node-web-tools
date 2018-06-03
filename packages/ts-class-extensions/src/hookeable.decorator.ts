/* tslint:disable:ban-types */
export interface HookeableOptions {
  pre?: Function;
  pos?: Function;
}
/* tslint:enable:ban-types */

export function Hookeable(options?: HookeableOptions) {
  return (_targetClass: any, _method: string, methodDescriptor: any) => {
    const originalMethod = methodDescriptor.value;

    methodDescriptor.value = function() {

      if (options.pre) {
        options.pre.apply(this, arguments);
      }

      const result = originalMethod.apply(this, arguments);

      if (options.pos) {
        options.pos.apply(this, [result, ...Array.prototype.slice.call((arguments))]);
      }

      return result;
    };

    return methodDescriptor;
  };
}
