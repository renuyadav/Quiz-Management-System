import 'regenerator-runtime/runtime';
import {createStore, applyMiddleware} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

const saga = createSagaMiddleware();
const store = createStore(rootReducer, devToolsEnhancer() , applyMiddleware(saga));
//const store = createStore(rootReducer, devToolsEnhancer() );
export default store;
saga.run(rootSaga);

