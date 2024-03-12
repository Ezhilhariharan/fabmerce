import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { createWrapper,HYDRATE } from "next-redux-wrapper";
import authSlice from './authSlice';
import brandSlice from "./brandSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage
};
const combinedReducer = combineReducers({
    authSlice,
    brandSlice,
    cartSlice,
    orderSlice
 });


const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            authSlice: {
                authToken:  action.payload.authSlice.authToken,
            },
            // brandSlice: {
            //     brandList: [...action.payload.brandSlice.brandList, ...state.brandSlice.brandList] 
            // }
        }
        return nextState;
    } else {
    return combinedReducer(state, action)
  }
}
 
const persistedReducer = persistReducer(persistConfig, masterReducer);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }),
   
});



const setupStore = () => store;
const makeStore = (context) => setupStore(context);
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);

