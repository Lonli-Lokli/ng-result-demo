import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Either, left, right } from '@sweet-monads/either';
import {
  catchError,
  map,
  Observable,
  ObservableInput,
  of,
  switchMap,
  tap,
} from 'rxjs';

export type ApiError = string;
export function eitherify<T>(): (
  source: Observable<T>
) => Observable<Either<ApiError, T>> {
  return (source: Observable<T>) =>
    source.pipe(
      map((r) => right<ApiError, T>(r)),
      catchError((err) => of(left<ApiError, T>(extractErr(err))))
    );
}

const extractErr = (err: any) => {
  console.log(err, err instanceof HttpErrorResponse);
  return err instanceof HttpErrorResponse ? err.message : 'Cannot load data.';
};
export function mapEither<E, D, ND>(mapDataOrValue: ((data: D) => ND) | ND) {
  const mapDataResult =
    typeof mapDataOrValue === 'function'
      ? (mapDataOrValue as (data: D) => ND)
      : () => mapDataOrValue;
  return map<Either<E, D>, Either<E, ND>>((either: Either<E, D>) =>
    either.map(mapDataResult)
  );
}

export function switchMapEither<E, D, ND>(
  mapDataOrValue: ((data: D) => ND) | ND
) {
  const mapDataResult =
    typeof mapDataOrValue === 'function'
      ? (mapDataOrValue as (data: D) => ND)
      : () => mapDataOrValue;
  return switchMap<Either<E, D>, ObservableInput<Either<E, ND>>>(
    (either: Either<E, D>) => of(either.map(mapDataResult))
  );
}

export function tapEither<E, D>(tapData: (data: D) => void) {
  return tap<Either<E, D>>((either: Either<E, D>) => {
    either.mapRight(tapData);
  });
}
