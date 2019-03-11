import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle, faPlus, faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import handler from "./handler";
library.add(fab, faBars, faUserCircle, faPlus, faAngleRight, faTimes);

const icon = {
    bars: <FontAwesomeIcon icon="bars" />,
    ofName: name => <FontAwesomeIcon icon={name} />
};

export default new Proxy(icon, handler);
