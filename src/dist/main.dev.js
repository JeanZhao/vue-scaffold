'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createApp = createApp;

var _vue = _interopRequireDefault(require('vue'));

var _App = _interopRequireDefault(require('./views/App.vue'));

var _index = _interopRequireDefault(require('./store/index.js'));

var _router = require('./router');

var _vueLazyload = _interopRequireDefault(require('vue-lazyload'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

require('es6-promise').polyfill(); //es6 promise

require('isomorphic-fetch'); //fetch

_vue['default'].use(_vueLazyload['default'], {
    preLoad: 1.3,
    attempt: 1
});

function createApp() {
    var router = (0, _router.createRouter)();
    var app = new _vue['default']({
        el: '#application',
        router: router,
        store: _index['default'],
        render: function render(h) {
            return h(_App['default']);
        },
        components: {
            app: app
        }
    });
    return {
        app: app,
        router: router
    };
}

window.onload = function () {
    return createApp();
};
