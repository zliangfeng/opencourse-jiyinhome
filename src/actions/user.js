import { createAction } from "redux-act";
export function validate(user,  callback) {
    return {
        type: "VALIDATE",
        types: ["VALIDATE__REQUEST", "VALIDATE__APPROVED", "VALIDATE__REJECTED"],
        callAPI: () => fetch("/production_api/v1/user/validate", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }),
        payload: { email: user.email },
        callback
    };
}

export const logout = createAction("LOGOUT");

export const validate_success = createAction("VALIDATE__APPROVED");
export const validate_failure = createAction("VALIDATE__REJECTED");