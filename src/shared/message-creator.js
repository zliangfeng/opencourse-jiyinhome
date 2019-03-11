import errorType from "../i18n/error-type";

export const MessageCreator = {
    create: error_code => ({ timestamp: new Date().getTime(), content: errorType(error_code) })
};
