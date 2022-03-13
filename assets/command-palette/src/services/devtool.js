import {
    registerData,
    devtoolPlugin
} from "../plugins/devtool";

export function registerDevtoolData(key, payload) {
    if (process.env.NODE_ENV === 'dev' || __VUE_PROD_DEVTOOLS__) {
        registerData(key, payload);
    }
}

export function addDevtoolPlugin(app) {
    if (process.env.NODE_ENV === 'dev' || __VUE_PROD_DEVTOOLS__) {
        app.use(devtoolPlugin);
    }
}