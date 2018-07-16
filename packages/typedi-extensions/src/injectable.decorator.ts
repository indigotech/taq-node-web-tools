import { Container } from 'typedi';

const container = Container.of(undefined);

export interface ConstructorType { new (...args: any[]): {}; }

export function Injectable() {
  return <TargetType extends ConstructorType>(targetClass: TargetType) => {
    return class extends targetClass {
      constructor(...args: any[]) {
        console.assert(
          isReactClassComponent(targetClass),
          `You're using 'Injectable' on a class that is not a React component. This will probably crash on Safari.
          targetClass: ${targetClass}`
        )

        const types: any[] = (Reflect as any).getMetadata('design:paramtypes', targetClass) || [];

        if (types.length > 0) {
          args = (container as any)
                    .initializeParams(targetClass, types)
                    .map((injection, index) => injection === undefined ? args[index] : injection);
        }

        super(...args);
      }
    };
  };
}

/** https://stackoverflow.com/a/41658173/3670829 */
function isReactClassComponent(component) {
  return typeof component === 'function' && component.prototype.isReactComponent;
}
