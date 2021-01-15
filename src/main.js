require('es6-promise').polyfill(); //es6 promise
require('isomorphic-fetch'); //fetch
import { setRemInit } from './rem';

import Vue from 'vue';
import App from './views/App.vue';
import store from './store/index.js';
import router from './router';
import VueLazyload from 'vue-lazyload';

setRemInit();

Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
});

export function createApp() {
    const app = new Vue({
        el: '#application',
        router,
        store,
        render: (h) => h(App)
    });

    return { app, router };
}

window.onload = () => createApp();
