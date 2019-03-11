import update from "react-addons-update";

export const handleChange = (entity, target) => {
    const { name, type } = target;
    let value;
    if (type === "checkbox") {
        value = target.checked;
    } else if (type === "text") {
        if (!target.validity || (target.validity && target.validity.valid)) {
            value = target.value;
        } else {
            value = entity[name];
        }
    } else if (type === "number") {
        if (!target.validity || (target.validity && target.validity.valid)) {
            value = target.value.match(".") ? parseFloat(target.value) : parseInt(target.value, 10);
            if (isNaN(value)) value = "";
        } else {
            value = entity[name];
        }
    }
    return update(entity, { [name]: { $set: value } });
};

