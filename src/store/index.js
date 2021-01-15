import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import app from './modules/app';

Vue.use(Vuex);

const state = {
    debug:
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === 'localhost' ||
        window.location.href.indexOf('http://1') === 0
};

const getters = {
    serverRoot(state) {
        const localServerPort = '6161';
        const { hostname, protocol } = window.location;
        return `${protocol}//${hostname}${state.debug ? ':' + localServerPort : ''}`;
    }
};

state.is_development = state.debug;

export default new Vuex.Store({
    modules: {
        app,
    },
    state,
    getters,
    strict: state.debug,
    plugins: state.debug ? [createLogger()] : []
});
