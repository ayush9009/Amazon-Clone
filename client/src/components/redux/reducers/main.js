import { getProductsreducer } from "./Productsreducer";
// yaha hume ek hi reducer use kara lakin kahi bar ek se jada reducer function ki bhi jarort pad ja uske liye vo karenge jo hum kar rai yaha

import {combineReducers} from "redux";

const rootreducers=combineReducers({
    getproductsdata:getProductsreducer
});

export default rootreducers;

// reducers they take the state in an immutable manner and return the new state
// hooks allow function components to have access to state and other react features
//useState allows us to tract state in a functino
// props are used to pass data from one functional to another