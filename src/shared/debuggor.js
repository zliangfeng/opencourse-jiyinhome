const DEVELOPMENT_MODE = process.env.NODE_ENV === "development";

console.log("[DEBUG_MODE] ", DEVELOPMENT_MODE ? "ON" : "OFF");

export const debuggor = (...args) => {
    if (DEVELOPMENT_MODE) console.log(...args);
}