import { createStore,applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { langReducer } from "./language/langReducer";
import { tokenReducer } from "./token/tokenReducer";

const rootReducer = combineReducers({
token: tokenReducer,
lang: langReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))