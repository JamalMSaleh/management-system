import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export type ActionCreatorType<T extends string> = ActionCreator<
  T,
  () => TypedAction<T>
>;

export type ActionCreatorPropsType<T1 extends string, T2> = ActionCreator<
  T1,
  (props: T2) => T2 & TypedAction<T1>
>;

export type TypedActionProps<T1 extends string, T2> = TypedAction<T1> & T2;
