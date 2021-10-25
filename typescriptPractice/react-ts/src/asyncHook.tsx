import { useReducer, useEffect } from 'react';

interface State<D, E> {
    loading?: boolean;
    data?: D | null;
    error?: E | null;
}

interface Action<D, E> extends State<D, E>{
    type: string;
}

type PromiseFn<T> = (...args: any) => Promise<T>;

function reducer<D, E>(state: State<D, E>, action: Action<D, E>):State<D, E> {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync<D, E, F extends PromiseFn<D>>(callback: F, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: null,
    error: null,
  } as State<D, E>);

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const result = await callback();
      dispatch({ type: 'SUCCESS', data: result });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData] as const;
}

export default useAsync;
