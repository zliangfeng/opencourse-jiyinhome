import moment from "moment";

export const formatDate = (date, format = "YYYY-MM-DD") => date && moment(date).format(format);
export const dateNow = (format = "YYYY-MM-DD") => moment().format(format);
export const dateAfter = (time = 0, unit = "day", format = "YYYY-MM-DD") =>
    moment()
        .add(time, unit)
        .format(format);
