import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const brandIcon = icon => <FontAwesomeIcon icon={["fab", icon]} size="1x"/>;
export default {
    get: function(obj, prop) {
        if (prop === "brand") return brandIcon;
        return prop in obj ? obj[prop] : <FontAwesomeIcon icon={prop} />;
    },
};
