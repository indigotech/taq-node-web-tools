import { create } from 'mobx-persist';

interface ConstructorType { new (...args: any[]); }

const storeKeyPrefix = 'PersistStore';

export interface  PersistentStore {
  readonly onFinishHydrating: Promise<any>;
}

export function PersistStore(): any {
  return <TargetType extends ConstructorType>(targetClass: TargetType) => {
    return class extends targetClass implements PersistentStore {
      onFinishHydrating: Promise<any>;

      constructor(...args: any[]) {
        super(...args);

        const storageKey = `${storeKeyPrefix}-${targetClass.name}`;
        const hydrate = create();

        this.onFinishHydrating = hydrate(storageKey, this);
      }
    };
  };
}
