import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback,InitialLogin } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            ...createForms({
                feedback: InitialFeedback,
                logins: InitialLogin
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}