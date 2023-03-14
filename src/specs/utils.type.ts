import { Observable } from 'rxjs';

export type Primitive = number | string | boolean | object;

export type Spied<T> = jasmine.SpyObj<T> & {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Primitive | Observable<any>;
};
