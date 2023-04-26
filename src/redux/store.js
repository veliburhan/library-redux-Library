import booksReducer from "./reducers/booksReduser";
import categoriesReducer from "./reducers/categoriesReducer";

import {createStore,combineReducers} from "redux";


const rootReducer=combineReducers({
    booksState:booksReducer,
    categoriesState:categoriesReducer
})


const store=createStore(rootReducer)

export default store