import { createReducer } from "redux-act";
import * as actions from "../actions/user";
import update from "react-addons-update";
import moment from "moment";
import { cookies } from "../shared/cookies";
import { MessageCreator } from "../shared/message-creator";

const reducer = createReducer(
    {
        [actions.validate_success]: (state, { payload, email }) => {
            const user = payload.data;
            user.grants = user.grants
                ? user.grants
                      .replace(/\s/g, "")
                      .split(",")
                      .map(foo => `/${foo}`)
                : [];
            user.email = email;
            cookies.set("account", user, {
                expires: moment()
                    .add(12, "h")
                    .toDate(),
                path: "/"
            });
            return update(state, { item: { $set: user } });
        },
        [actions.validate_failure]: (state, { error_code }) => {
            cookies.remove("account");
            return update(state, {
                item: { $set: undefined },
                _message: { $set: MessageCreator.create(error_code) }
            });
        },
        [actions.logout]: state => {
            cookies.remove("account");
            return update(state, { item: { $set: undefined } });
        }
    },
    {}
);
reducer.options({ payload: false });

export default reducer;
