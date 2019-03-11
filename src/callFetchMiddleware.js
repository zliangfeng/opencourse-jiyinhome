/**
 * @version : v2
 * @date    : 20180719
 * @desc    : add callback after callAPI response.
 */
export default ({ dispatch, getState }) => next => action => {
    const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        payload,
        callback = () => void 0
    } = action;

    // const {types, callAPI, shouldCallAPI = () => true, } = payload;

    // Normal action: pass it on
    if (!types) return next(action);

    if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === "string")
    ) {
        throw new Error("Expected an array of three string types.");
    }

    if (typeof callAPI !== "function") {
        throw new Error("Expected callAPI to be a function.");
    }

    if (!shouldCallAPI(getState())) {
        return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({ ...payload, type: requestType });

    return callAPI().then(
        response => {
            const contentType = response.headers.get("content-type");
            if (!contentType.includes("application/json")) {
                dispatch({
                    ...payload,
                    error: `invalid response content type [${contentType}]!`,
                    type: failureType
                });
                return;
            }

            const total_count = response.headers.get("x-total-count") || 0;
            response.json().then(json => {
                const error = callback(json);
                if (!json.error_code && !error) {
                    dispatch({
                        ...payload,
                        payload: json,
                        total_count,
                        type: successType
                    });
                } else if (json.error_code) {
                    dispatch({ ...payload, ...json, type: failureType });
                } else {
                    dispatch({ ...payload, ...error, type: failureType });
                }
            });
        },
        error => dispatch({ ...payload, ...error, type: failureType })
    );
};
