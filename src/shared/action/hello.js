// @flow

import "isomorphic-fetch";
import { createAction } from "redux-actions";
import { helloEndpointRoute } from "../routes";

export const SAY_HELLO = "SAY_HELLO";
export const SAY_HELLO_ASYNC_REQUEST = "SAY_HELLO_ASYNC_REQUEST";
export const SAY_HELLO_ASYNC_SUCCESS = "SAY_HELLO_ASYNC_SUCCESS";
export const SAY_HELLO_ASYNC_FAILURE = "SAY_HELLO_ASYNC_FAILURE";

export const sayHello = createAction(SAY_HELLO);
export const sayHelloAsyncRequest = createAction(SAY_HELLO_ASYNC_REQUEST);
export const sayHelloAsyncSuccess = createAction(SAY_HELLO_ASYNC_SUCCESS);
export const sayHelloAsyncFailure = createAction(SAY_HELLO_ASYNC_FAILURE);

export const sayHelloAsync = (num: number) => async (dispatch: Function) => {
  try {
    dispatch(sayHelloAsyncRequest());
    const res = await fetch(helloEndpointRoute(num), { method: "GET" });

    if (!res.ok) {
      throw Error(res.statusText);
    }

    const data = await res.json();

    if (!data.serverMessage) {
      throw Error("No message received");
    }

    dispatch(sayHelloAsyncSuccess(data.serverMessage));
  } catch {
    dispatch(sayHelloAsyncFailure());
  }
};
