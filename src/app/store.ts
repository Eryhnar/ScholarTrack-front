import { configureStore, ThunkMiddleware, Action } from "@reduxjs/toolkit";
import { combineReducers, Reducer } from "redux";
import { persistReducer } from "redux-persist";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import thunk from "redux-thunk";

import storage from "redux-persist/lib/storage";

import userReducer, { UserState } from "./slices/userSlice";
import groupReducer, { GroupDetailState } from "./slices/groupDetailSlice";

export interface RootState {
    user: UserState;
    groupDetail: GroupDetailState;
}

const reducers: Reducer<RootState, Action> = combineReducers({
    user: userReducer,
    groupDetail: groupReducer
});

// const secretKey = process.env.REACT_APP_SECRET_KEY;
const secretKey = "Nala"; //TODO change to process.env.REACT_APP_SECRET

if (!secretKey) {
    throw new Error('REACT_APP_SECRET_KEY is not defined');
}

const persistConfig = {
    key: 'ST',
    storage,
    transforms: [
        encryptTransform({
            secretKey: secretKey,
            onError: function (error) {
                console.error(error);
            }
        })
    ]
};

const persistedReducer = persistReducer<RootState, Action>(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});