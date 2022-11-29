import { of, map, switchMap, ObservableInput } from 'rxjs';
import {
  HttpRequestState,
  isLoadedState,
  isLoadingState,
  loadedState,
  loadingState,
  errorState,
} from 'ngx-http-request-state';

export function switchMapState<D, ND>(mapDataOrValue: ((data: D) => ND) | ND) {
  const mapDataResult =
    typeof mapDataOrValue === 'function'
      ? (mapDataOrValue as (data: D) => ND)
      : () => mapDataOrValue;
  return switchMap<HttpRequestState<D>, ObservableInput<HttpRequestState<ND>>>(
    (state: HttpRequestState<D>) => {
      return isLoadedState(state)
        ? of(loadedState(mapDataResult(state.value!)))
        : isLoadingState(state)
        ? of(loadingState<ND>())
        : of(errorState<ND>(state.error!));
    }
  );
}

export function mapState<D, ND>(mapDataOrValue: ((data: D) => ND) | ND) {
  const mapDataResult =
    typeof mapDataOrValue === 'function'
      ? (mapDataOrValue as (data: D) => ND)
      : () => mapDataOrValue;
  return map<HttpRequestState<D>, HttpRequestState<ND>>(
    (state: HttpRequestState<D>) => {
      return isLoadedState(state)
        ? loadedState(mapDataResult(state.value!))
        : isLoadingState(state)
        ? loadingState<ND>()
        : errorState<ND>(state.error!);
    }
  );
}
