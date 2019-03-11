export const formatPhone = value => {
    if (!value) return value;

    value = value.replace(/[^\d]/g, "").slice(0, 11);

    if (value.length >= 4) value = [value.slice(0, 3), " ", value.slice(3)].join("");
    if (value.length >= 9) value = [value.slice(0, 8), " ", value.slice(8)].join("");

    return value;
};
