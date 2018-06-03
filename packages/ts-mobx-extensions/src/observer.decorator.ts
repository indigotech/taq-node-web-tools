import { IReactComponent, observer as mobxObserver } from 'mobx-react';
import { Component, ComponentState } from 'react';

export interface MyComponentClass<P = {}> {
  new(props: P, context: any, ...injectionFields): Component<P, ComponentState>;
}

export function mobxObserverTransformer<P>(clazz: IReactComponent<P>): any {
  return mobxObserver(clazz);
}

export function Observer() {
  return <TargetType extends MyComponentClass>(targetClass: TargetType) => {
    return mobxObserverTransformer(targetClass);
  };
}
