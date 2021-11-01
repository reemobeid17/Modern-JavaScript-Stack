// @flow

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import Immutable from "immutable";
import $ from "jquery";
import Tether from "tether";
import App from "../shared/app";
import helloReducer from "../shared/reducer/hello";
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from "../shared/config";
import { isProd } from "../shared/util";
import setUpSocket from "./socket";

window.jQuery = $;
window.Tether = Tether;
require("bootstrap");

/* eslint no-underscore-dangle: "off" */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept("../shared/app", () => {
    // eslint-disable-next-line global-require
    const NextApp = require("../shared/app").default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR);
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide);

setUpSocket(store);
