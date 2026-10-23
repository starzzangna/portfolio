import nextVitals from "eslint-config-next/core-web-vitals";

const config = [{ ignores: ["beforeProject/**"] }, ...nextVitals];

export default config;

