import { createReducer } from "redux-act";
import * as actions from "../actions/layer";
import update from "react-addons-update";

const reducer = createReducer(
    {
        [actions.toggleSideSheet]: (state) => {
            const { show_side_sheet = false } = state;
            return update(state, { show_side_sheet: {$set: !show_side_sheet} });
        }
    },
    {}
);
reducer.options({ payload: false });

export default reducer;