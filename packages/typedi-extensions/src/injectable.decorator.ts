import { Container } from 'typedi';

const container = Container.of(undefined);

export interface ConstructorType { new (...args: any[]): {}; }

export function Injectable() {
  return <TargetType extends ConstructorType>(targetClass: TargetType) => {
    return class extends targetClass {
      constructor(...args: any[]) {
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
