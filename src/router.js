import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Home from './views/App.vue';
Vue.use(Router);

// 解决路由两次点击报错
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to)
}
// 懒加载路由
const welcome = () => import("./views/Welcome.vue");

const router = new Router({
    mode: 'hash',
    linkExactActiveClass: 'is-active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '/welcome', component: welcome },
        { path: '/home', component: Home },
        { path: '*', redirect: '/welcome' }
    ]
});

router.beforeEach(async (to, from, next) => {
    //to prevent loading animation keeps running when switching router
    store.commit('app/APP_SET_IF_LOADING', { is_loading: false });
    next();
});

export default router;
