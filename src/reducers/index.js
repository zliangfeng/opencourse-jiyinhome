import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import user from "./user";
import layer from "./layer";

export default history =>
    combineReducers({
        router: connectRouter(history),
        user,
        layer,
    });
