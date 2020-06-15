/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
//Redux
import rootReducer from "../reducers/index";
import rootSaga from "../sagas/index";
import initStates from "../reducers/initStates";

const sagaMiddleware = createSagaMiddleware();
const storeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const store = createStore(
  rootReducer,
  initStates,
  storeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
