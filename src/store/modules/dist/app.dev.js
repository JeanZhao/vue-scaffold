'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _newFetch = _interopRequireDefault(require('../../kits/newFetch'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var lock_aj = false;
var edit_cart_lock_aj = false; // initial state

var state = {
    sid: window.localStorage.getItem('client_sid'),
    sname: '',
    uname: window.localStorage.getItem('uname') || '未知',
    email: '',
    tel: '',
    store_data: {},
    cart_data: {
        cart_food_list: [],
        cart_food_dict: {
            random: new Date().getTime()
        },
        total_price: '0.0',
        total_price_vip: '0.0',
        remark: '',
        user_count: 0,
        total_food_count: 0,
        total_price_pickup: 0
    },
    shared_tid: window.localStorage.getItem('shared_tid') || '',
    shared_tstatus: '',
    shared_oid: window.localStorage.getItem('shared_oid') || '',
    shared_cart_id: window.localStorage.getItem('shared_cart_id') || '',
    shared_foods_timer: -1,
    msg: '',
    has_new_order: false,
    show_cart_detail: false,
    show_left_nav: false,
    app_title: '',
    show_menu_nav: false,
    is_vip: 0,
    pay_method_setting: '',
    is_open: 0,
    err_msg: '',
    check_timer: -1,
    tip_method_setting: '',
    delivery_enable: 1,
    delivery_vip_free: 0,
    delivery_area_list: [],
    full_coupon: [],
    first_discount_amount: 0,
    first_discount_limit_amount: 0,
    first_discount_type: 'fixed',
    is_new: false,
    pickup_enable: 1,
    pickup_amount: 0,
    is_vip_new: false,
    merchant_custom_value: 0,
    phone_num: '',
    code: '+1',
    annoucement: '',
    pickup_discount_enable: 0,
    show_food_list: [],
    now_menu: '',
    menu_dict: {},
    menu_list: [],
    food_dict: {},
    menu_timer: -1,
    choose_time_options: '',
    choose_time_ahead_days: 0,
    choose_time: 'ASAP',
    is_loading: false,
    feature_image: '',
    joinin_back_color: '#E90011',
    notice_layer_title_color: '#E90011',
    notice_layer_subtitle: '',
    notice_layer_ps_content: '',
    pickup_setting: {},
    delivery_setting: {},
    type: '',
    state: '',
    city: '',
    street_address1: '',
    street_address2: '',
    zip_code: '',
    zip_code_index: -1,
    is_loading_menu: true
}; // getters

var getters = {
    get_type: function get_type(state) {
        return state.type;
    },
    get_pickup_setting: function get_pickup_setting(state) {
        return state.pickup_setting;
    },
    get_delivery_setting: function get_delivery_setting(state) {
        return state.delivery_setting;
    },
    get_theme_data: function get_theme_data(state) {
        return {
            feature_image: state.feature_image,
            joinin_back_color: state.joinin_back_color,
            notice_layer_title_color: state.notice_layer_title_color,
            notice_layer_subtitle: state.notice_layer_subtitle,
            notice_layer_ps_content: state.notice_layer_ps_content
        };
    },
    get_cart_price_pickup: function get_cart_price_pickup(state) {
        return state.cart_data.total_price_pickup * 1;
    },
    get_pickup_discount_enable: function get_pickup_discount_enable(state) {
        return state.pickup_setting.discount_enable * 1 || 0;
    },
    get_if_loading: function get_if_loading(state) {
        return state.is_loading;
    },
    get_choose_time: function get_choose_time(state) {
        return state.choose_time;
    },
    get_choose_time_ahead_days: function get_choose_time_ahead_days(state) {
        return state.choose_time_ahead_days;
    },
    get_choose_time_options: function get_choose_time_options(state) {
        return state.choose_time_options;
    },
    get_show_food_list: function get_show_food_list(state) {
        return state.show_food_list;
    },
    get_now_menu: function get_now_menu(state) {
        return state.now_menu;
    },
    get_menu_dict: function get_menu_dict(state) {
        return state.menu_dict;
    },
    get_menu_list: function get_menu_list(state) {
        return state.menu_list;
    },
    get_food_dict: function get_food_dict(state) {
        return state.food_dict;
    },
    get_annoucement: function get_annoucement(state) {
        return state.annoucement;
    },
    get_is_vip_new: function get_is_vip_new(state) {
        return state.is_vip_new;
    },
    get_is_open: function get_is_open(state) {
        return state.is_open;
    },
    get_err_msg: function get_err_msg(state) {
        return state.err_msg;
    },
    get_paymethod_setting: function get_paymethod_setting(state) {
        return state.pay_method_setting;
    },
    get_if_is_vip: function get_if_is_vip(state) {
        return state.is_vip;
    },
    get_if_can_place_order: function get_if_can_place_order(state) {
        return state.store_data.can_place_order || 0;
    },
    get_tax: function get_tax(state) {
        return state.store_data.tax || 0;
    },
    get_if_show_menu_nav: function get_if_show_menu_nav(state) {
        return state.show_menu_nav;
    },
    get_app_title: function get_app_title(state) {
        return state.app_title;
    },
    get_if_show_left_nav: function get_if_show_left_nav(state) {
        return state.show_left_nav;
    },
    get_if_has_new_order: function get_if_has_new_order(state) {
        return state.has_new_order;
    },
    get_store_name: function get_store_name(state) {
        return state.sname || '';
    },
    get_store_pic: function get_store_pic(state) {
        return state.store_data.spic || '';
    },
    get_food_count: function get_food_count(state) {
        return state.cart_data.total_food_count;
    },
    get_cart_food_list: function get_cart_food_list(state) {
        return state.cart_data.cart_food_list;
    },
    get_cart_price: function get_cart_price(state) {
        return state.cart_data.total_price * 1;
    },
    get_cart_price_vip: function get_cart_price_vip(state) {
        return state.cart_data.total_price_vip * 1;
    },
    get_cart_food_dict: function get_cart_food_dict(state) {
        return state.cart_data.cart_food_dict;
    },
    get_shared_user_count: function get_shared_user_count(state) {
        return state.cart_data.user_count;
    },
    get_shared_tname: function get_shared_tname(state) {
        return state.shared_tname;
    },
    get_shared_tstatus: function get_shared_tstatus(state) {
        return state.shared_tstatus;
    },
    get_shared_tid: function get_shared_tid(state) {
        return state.shared_tid;
    },
    get_shared_oid: function get_shared_oid(state) {
        return state.shared_oid;
    },
    get_app_msg: function get_app_msg(state) {
        return state.msg;
    },
    get_store_slogo: function get_store_slogo(state) {
        return state.store_data.slogo || '';
    },
    get_language: function get_language(state) {
        return state.store_data.language || 'eng';
    },
    get_processing_fee: function get_processing_fee(state) {
        return state.store_data.processing_fee || 0;
    },
    get_processing_extra: function get_processing_extra(state) {
        return state.store_data.processing_extra || 0;
    },
    get_delivery_data: function get_delivery_data(state) {
        return {
            delivery_enable: state.delivery_enable || 0,
            delivery_area_list: state.delivery_area_list || [],
            delivery_vip_free: state.delivery_vip_free || 0
        };
    },
    get_promotion_data: function get_promotion_data(state) {
        return {
            full_coupon: state.full_coupon,
            first_discount_amount: state.first_discount_amount,
            first_discount_type: state.first_discount_type,
            first_discount_limit_amount: state.first_discount_limit_amount
        };
    },
    get_is_new: function get_is_new(state) {
        return state.is_new;
    },
    get_tip_method_setting: function get_tip_method_setting(state) {
        return state.tip_method_setting;
    },
    get_pickup_data: function get_pickup_data(state) {
        return {
            pickup_enable: state.pickup_enable || 0,
            pickup_amount: state.pickup_amount || 0
        };
    },
    get_merchant_custom_value: function get_merchant_custom_value(state) {
        return state.merchant_custom_value;
    }
}; // actions

var actions = {
    initData: function initData(_ref, sid) {
        var commit = _ref.commit,
            rootState = _ref.rootState;

        if (!state.sid) {
            return;
        } // let aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';

        var aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';
        fetch(aj_host + '/weapp/takeout/store/get?sid=' + (state.sid || sid), {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    var _store_data = res.data.data.store_data;
                    var _enable = res.data.data.enable;
                    var _err_msg = res.data.data.err_msg;

                    var _first_discount_amount = res.data.data.first_discount_amount || 0;

                    var _first_discount_limit_amount = res.data.data.first_discount_limit_amount || 0;

                    var _first_discount_type = res.data.data.first_discount_type || 'fixed';

                    var _full_coupon = res.data.data.full_coupon || [];

                    var _pickup_enable = res.data.data.pickup_enable || 0;

                    var _pickup_amount = res.data.data.pickup_amount || 0;

                    var _annoucement = res.data.data.annoucement || '';

                    var _delivery_vip_free = res.data.data.delivery_vip_free || 0;

                    var _delivery_enable = res.data.data.delivery_enable || 0;

                    var _delivery_area_list = res.data.data.delivery_area_list || 0; // let _pickup_discount_enable = res.data.data.pickup_discount_enable || 0;

                    var _feature_image = res.data.data.feature_image || '';

                    var _joinin_back_color = res.data.data.joinin_back_color || '#E90011';

                    var _notice_layer_title_color = res.data.data.notice_layer_title_color || '#E90011';

                    var _notice_layer_subtitle = res.data.data.notice_layer_subtitle || '';

                    var _notice_layer_ps_content = res.data.data.notice_layer_ps_content || '';

                    var _paypal_client_id = res.data.data.paypal_client_id || '';

                    var _pickup_setting = res.data.data.pickup_setting || {};

                    var _delivery_setting = res.data.data.delivery_setting || {};

                    if (_paypal_client_id) {
                        var head = document.getElementsByTagName('head')[0];
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.src =
                            'https://www.paypal.com/sdk/js?client-id=' + _paypal_client_id + '&disable-funding=card';
                        head.appendChild(script);
                    }

                    document.title = _store_data.sname;
                    commit('APP_INIT_STORE_DATA', _store_data);
                    commit('APP_INIT_TAKEOUT_ENABLE', {
                        is_open: _enable,
                        err_msg: _err_msg
                    });
                    commit('APP_INIT_OTHER_SETTING', {
                        full_coupon: _full_coupon,
                        first_discount_amount: _first_discount_amount,
                        first_discount_limit_amount: _first_discount_limit_amount,
                        first_discount_type: _first_discount_type,
                        // pickup_enable: _pickup_enable,
                        // pickup_amount: _pickup_amount,
                        annoucement: _annoucement,
                        // delivery_enable: _delivery_enable,
                        delivery_vip_free: _delivery_vip_free,
                        delivery_area_list: _delivery_area_list,
                        // pickup_discount_enable: _pickup_discount_enable,
                        feature_image: _feature_image,
                        joinin_back_color: _joinin_back_color,
                        notice_layer_title_color: _notice_layer_title_color,
                        notice_layer_subtitle: _notice_layer_subtitle,
                        notice_layer_ps_content: _notice_layer_ps_content,
                        pickup_setting: _pickup_setting,
                        delivery_setting: _delivery_setting
                    });
                }
            });
        fetch(aj_host + '/weapp/takeout/sharedcart/check?sid=' + state.sid + '&tid=' + state.shared_tid, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100020) {
                    window.location.replace(
                        '/recepit?sid=' + state.sid + '&tid=' + state.shared_tid + '&oid=' + res.data.data.oid
                    );
                }
            });
    },
    quitTable: function quitTable(_ref2, post_data) {
        var commit = _ref2.commit,
            rootState = _ref2.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        fetch(
            aj_host +
                '/weapp/takeout/sharedcart/quit?tid=' +
                post_data.tid +
                '&cartid=' +
                post_data.cartid +
                '&sid=' +
                post_data.sid,
            {
                method: 'GET'
            }
        )
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    commit('APP_SHARED_CART_CLOSED', {
                        router: post_data.router,
                        sid: post_data.sid
                    });
                }
            });
    },
    joinTable: function joinTable(_ref3, post_data) {
        var dispatch = _ref3.dispatch,
            commit = _ref3.commit,
            rootState = _ref3.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        fetch(aj_host + '/weapp/takeout/sharedcart/join?sid=' + post_data.sid + '&uname=' + post_data.email, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    window.localStorage.setItem('shared_tid', res.data.data.tid);
                    window.localStorage.setItem('shared_cart_id', res.data.data.cartid);
                    window.localStorage.setItem('uname', post_data.email);
                    commit('APP_SET_JOIN_TABLE_INFO', {
                        cartid: res.data.data.cartid,
                        email: post_data.email,
                        tid: res.data.data.tid
                    });
                    post_data.router.replace({
                        path: '/menu'
                    });
                    dispatch('get_shared_cart', {
                        cartid: res.data.data.cartid,
                        router: post_data.router
                    }).then(function () {});
                    dispatch('get_menu', post_data.sid).then(function () {});
                } else if (res.data.code === 100010) {
                    window.location.reload();
                }
            });
    },
    get_shared_cart: function get_shared_cart(_ref4, post_data) {
        var commit = _ref4.commit,
            rootState = _ref4.rootState;
        // let aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        var aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';

        if (!post_data.cartid) {
            console.log('no cartid');
            return;
        }

        if (lock_aj) {
            return;
        }

        lock_aj = true;
        fetch(
            aj_host + '/weapp/takeout/sharedcart/get?cartid=' + post_data.cartid + '&tid=' + rootState.app.shared_tid,
            {
                method: 'GET'
            }
        )
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                lock_aj = false;
                res = JSON.parse(res);
                var _res = res,
                    data = _res.data;

                if (!data) {
                    //TODO SHOW SOME ERROR MESSAGE
                    return;
                }

                if (data.code === 100000) {
                    window.localStorage.setItem('shared_oid', res.data.data.shared_oid);

                    if (res.data.data.shared_oid != rootState.app.shared_oid) {
                        commit('APP_SET_HAS_NEW_ORDER', {});
                    }

                    commit('APP_SET_CART_DATA', {
                        food_list: res.data.data.food_list,
                        food_dict: res.data.data.food_dict,
                        total_price: res.data.data.total_price,
                        total_price_vip: res.data.data.total_price_vip,
                        total_price_pickup: res.data.data.total_price_pickup,
                        user_count: res.data.data.user_count,
                        shared_oid: res.data.data.shared_oid,
                        shared_tstatus: res.data.data.shared_tstatus,
                        shared_tname: res.data.data.shared_tname
                    });
                } else if (data.code === 100010) {
                    // 共享购物车已关闭
                    commit('APP_SHARED_CART_CLOSED', {
                        router: post_data.router,
                        sid: post_data.sid
                    });
                }
            });
    },
    edit_cart_food_count: function edit_cart_food_count(_ref5, post_data) {
        var commit = _ref5.commit,
            rootState = _ref5.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';

        if (edit_cart_lock_aj) {
            return;
        }

        edit_cart_lock_aj = true;

        if (post_data.cartid == '' && post_data.router) {
            post_data.router.replace({
                path: '/check-in'
            });
        }

        var params =
            '' +
            'cartid=' +
            post_data.cartid +
            '&tid=' +
            post_data.tid +
            '&uid=' +
            post_data.uid +
            '&uname=' +
            post_data.uname +
            '&fid=' +
            post_data.fid +
            '&fprice=' +
            post_data.fprice +
            '&fprice_vip=' +
            post_data.fprice_vip +
            '&fprice_pickup=' +
            post_data.fprice_pickup +
            '&is_vip=' +
            post_data.is_vip +
            '&fcount=' +
            post_data.set_count +
            '&type=set' +
            '&feature_name=' +
            encodeURIComponent(post_data.feature_name) +
            '&addon_names=' +
            encodeURIComponent(post_data.addon_names) +
            '&addon_counts=' +
            encodeURIComponent(post_data.addon_counts) +
            '&addon_prices=' +
            post_data.addon_prices +
            '&note=' +
            encodeURIComponent(post_data.note); // 产品要求提交完，马上关闭详情层

        setTimeout(function () {
            commit('APP_TOGGLE_CART_DETAIL', false);
        }, 100);
        fetch(aj_host + '/weapp/takeout/sharedcart/edit?' + params, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                edit_cart_lock_aj = false;
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    commit('APP_SET_MSG', {
                        msg: 'set "' + post_data.fname + '" successfully'
                    });
                    commit('APP_NEW_SET_FOOD', post_data);
                } else if (res.data.code === 100010) {
                    // 共享购物车已关闭
                    commit('APP_SHARED_CART_CLOSED', {
                        router: post_data.router,
                        sid: post_data.sid
                    });
                } else {
                    commit('APP_SET_MSG', {
                        msg: 'set "' + res.data.msg + '" successfully'
                    });
                }
            });
    },
    edit_cart_food: function edit_cart_food(_ref6, post_data) {
        var commit = _ref6.commit,
            rootState = _ref6.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';

        if (edit_cart_lock_aj) {
            return;
        }

        edit_cart_lock_aj = true;
        post_data.food_data.uid = post_data.uid;
        post_data.food_data.uname = post_data.uname;
        post_data.food_data.feature_name = post_data.extra_data.feature_name;
        post_data.food_data.addon_names = post_data.extra_data.addon_names;
        post_data.food_data.addon_prices = post_data.extra_data.addon_prices;
        post_data.food_data.addon_counts = post_data.extra_data.addon_counts;
        post_data.food_data.addon_pickup_discounts = post_data.extra_data.addon_pickup_discounts;
        post_data.food_data.note = post_data.extra_data.note;
        post_data.food_data.add_count = post_data.extra_data.add_count;
        post_data.food_data.addon_total_price = post_data.extra_data.addon_total_price;
        post_data.food_data.addon_total_price_pickup = post_data.extra_data.addon_total_price_pickup;
        post_data.food_data.is_vip = post_data.is_vip;
        post_data.food_data.once_limit = post_data.extra_data.once_limit;
        post_data.food_data.daily_limit = post_data.extra_data.daily_limit;

        if (post_data.cartid == '' && post_data.router) {
            post_data.router.replace({
                path: '/check-in'
            });
        }

        var check_food_data = JSON.parse(JSON.stringify(post_data.food_data));

        var _checkAdd2 = _checkAdd(check_food_data, rootState),
            isAdd = _checkAdd2.isAdd,
            food_data = _checkAdd2.food_data;

        if (!isAdd) {
            post_data.type = 'set';
            post_data.food_data.fcount = food_data.fcount;
            post_data.food_data.set_count = food_data.fcount;
        } // 产品要求提交完，马上关闭详情层

        setTimeout(function () {
            // commit('homepage/HOME_TOGGLE_DETAIL', false, { root: true });
            commit('menu/MENU_TOGGLE_DETAIL', false, {
                root: true
            });
        }, 100);
        var params =
            '' +
            'cartid=' +
            post_data.cartid +
            '&tid=' +
            post_data.tid +
            '&uid=' +
            post_data.uid +
            '&uname=' +
            post_data.uname +
            '&fid=' +
            post_data.food_data.fid +
            '&fprice=' +
            post_data.food_data.fprice +
            '&fprice_vip=' +
            post_data.food_data.fprice_vip +
            '&fprice_pickup=' +
            post_data.food_data.fprice_pickup +
            '&is_vip=' +
            post_data.is_vip +
            '&fcount=' +
            post_data.food_data.fcount +
            '&type=' +
            (isAdd ? 'add' : 'set') +
            '&feature_name=' +
            encodeURIComponent(post_data.extra_data.feature_name) +
            '&addon_names=' +
            encodeURIComponent(post_data.extra_data.addon_names) +
            '&addon_counts=' +
            encodeURIComponent(post_data.extra_data.addon_counts) +
            '&addon_pickup_discounts=' +
            encodeURIComponent(post_data.extra_data.addon_pickup_discounts) +
            '&addon_prices=' +
            post_data.extra_data.addon_prices +
            '&note=' +
            encodeURIComponent(post_data.extra_data.note);
        fetch(aj_host + '/weapp/takeout/sharedcart/edit?' + params, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                edit_cart_lock_aj = false;
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    if (post_data.type == 'add') {
                        commit('APP_SET_MSG', {
                            msg: 'add "' + post_data.food_data.fname + '" successfully'
                        });
                        commit('APP_NEW_ADD_FOOD', post_data.food_data);
                    } else if (post_data.type == 'set') {
                        commit('APP_SET_MSG', {
                            msg: 'add "' + post_data.food_data.fname + '" successfully'
                        });
                        commit('APP_NEW_SET_FOOD', post_data.food_data);
                    } else {
                        commit('APP_DEL_FOOD_INTO_CART', post_data.food_data);
                        commit('APP_SET_MSG', {
                            msg: 'remove "' + post_data.food_data.fname + '" successfully'
                        });
                    }
                } else if (res.data.code === 100010) {
                    // 共享购物车已关闭
                    commit('APP_SHARED_CART_CLOSED', {
                        router: post_data.router,
                        sid: post_data.sid
                    });
                } else {
                    commit('APP_SET_MSG', {
                        msg: 'set "' + res.data.msg + '" successfully'
                    });
                }
            });
    },
    submit_cart: function submit_cart(_ref7, post_data) {
        var commit = _ref7.commit,
            rootState = _ref7.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';
        commit('APP_SET_IF_LOADING', {
            is_loading: true
        });
        (0, _newFetch['default'])(
            {
                commit: commit
            },
            {
                request_name: 'submit_order',
                params: post_data,
                aj_host: aj_host
            }
        )
            .then(function (res) {
                commit('APP_SET_IF_LOADING', {
                    is_loading: false
                });
                commit('APP_CLEAR_CART_DATA', {});
                commit('APP_SET_MSG', {
                    msg: 'Submit successfully'
                });
                commit('APP_SET_SHARED_OID', {
                    shared_oid: res.data.data
                });
                commit('APP_SHARED_CART_CLOSED', {});
                setTimeout(function () {
                    window.location.replace('/recepit?sid=' + post_data.sid + '&tid=' + post_data.tid);
                }, 100);
            })
            ['catch'](function () {
                commit('APP_SET_IF_LOADING', {
                    is_loading: false
                });
            }); // let paramsArr = [];
        // for (var o in post_data) {
        //     paramsArr.push(o + '=' + encodeURIComponent(post_data[o]));
        // }
        // fetch(aj_host + '/weapp/takeout/order/edit?' + paramsArr.join('&'), {
        //     method: 'GET'
        // })
        // .then((res)=>{
        //     return res.text()
        // })
        // .then((res)=>{
        //     res = JSON.parse(res);
        //     if (res.data.code === 100000) {
        //         commit('APP_CLEAR_CART_DATA',{});
        //         commit('APP_SET_MSG',{
        //             msg: 'Submit successfully'
        //         });
        //         commit('APP_SET_SHARED_OID', {
        //             shared_oid: res.data.data
        //         });
        //         // paypal的方式需要再确认一下
        //         if (post_data.opay_type === 'counter' || post_data.opay_type === 'pickup') {
        //             commit('APP_SHARED_CART_CLOSED', {});
        //             setTimeout(function() {
        //                 // window.history.pushState(null, rootState.app.sname, '/#/check-in?sid=' + post_data.sid)
        //                 window.location.replace('/recepit?sid=' + post_data.sid + '&tid=' + post_data.tid);
        //             }, 100);
        //         }
        //     }
        // });
    },
    submit_cart_paypal: function submit_cart_paypal(_ref8, post_data) {
        var commit = _ref8.commit,
            rootState = _ref8.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';
        commit('APP_SET_IF_LOADING', {
            is_loading: true
        });
        (0, _newFetch['default'])(
            {
                commit: commit
            },
            {
                request_name: 'submit_order_by_paypal',
                params: post_data,
                aj_host: aj_host
            }
        )
            .then(function (res) {
                commit('APP_SET_IF_LOADING', {
                    is_loading: false
                });
                commit('APP_CLEAR_CART_DATA', {});
                commit('APP_SET_MSG', {
                    msg: 'Submit successfully'
                });
                commit('APP_SET_SHARED_OID', {
                    shared_oid: res.data.data
                });
                commit('APP_SHARED_CART_CLOSED', {});
                setTimeout(function () {
                    window.location.replace('/recepit?sid=' + post_data.sid + '&tid=' + post_data.tid);
                }, 100);
            })
            ['catch'](function () {
                commit('APP_SET_IF_LOADING', {
                    is_loading: false
                });
            });
    },
    submit_cart_stripe: function submit_cart_stripe(_ref9, post_data) {
        var commit = _ref9.commit,
            rootState = _ref9.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';
        commit('APP_SET_IF_LOADING', {
            is_loading: true
        });
        (0, _newFetch['default'])(
            {
                commit: commit
            },
            {
                request_name: 'submit_order_by_stripe',
                params: post_data,
                aj_host: aj_host
            }
        )
            .then(function (res) {
                commit('APP_SET_IF_LOADING', {
                    is_loading: false
                });
                commit('APP_CLEAR_CART_DATA', {});
                commit('APP_SET_MSG', {
                    msg: 'Submit successfully'
                });
                commit('APP_SET_SHARED_OID', {
                    shared_oid: res.data.data
                });
                commit('APP_SHARED_CART_CLOSED', {});
                setTimeout(function () {
                    window.location.replace('/recepit?sid=' + post_data.sid + '&tid=' + post_data.tid);
                }, 100);
            })
            ['catch'](function () {
                commit('APP_SET_IF_LOADING', {
                    is_loading: false
                });
            });
    },
    doToggleDetail: function doToggleDetail(_ref10, isSHow) {
        var commit = _ref10.commit,
            rootState = _ref10.rootState;
        commit('APP_TOGGLE_CART_DETAIL', isSHow);
    },
    init_paymethod: function init_paymethod(_ref11) {
        var commit = _ref11.commit,
            rootState = _ref11.rootState;
        var aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';
        fetch(aj_host + '/weapp/takeout/paymethod/get?sid=' + rootState.app.sid, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    commit('APP_INIT_PAYMETHOD', {
                        pay_method_setting: res.data.data.pay_method,
                        tip_method_setting: res.data.data.tip_method,
                        merchant_custom_value: res.data.data.merchant_custom_value,
                        choose_time: res.data.data.choose_time,
                        choose_time_ahead_days: res.data.data.choose_time_ahead_days,
                        choose_time_options: res.data.data.choose_time_options
                    });
                }
            });
    },
    do_check: function do_check(_ref12, router) {
        var commit = _ref12.commit,
            rootState = _ref12.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : ''; // let aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';

        fetch(aj_host + '/weapp/takeout/store/check?sid=' + rootState.app.sid + '&tid=' + rootState.app.shared_tid, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    var _enable = res.data.data.enable;
                    var _err_msg = res.data.data.err_msg;
                    commit('APP_INIT_TAKEOUT_ENABLE', {
                        is_open: _enable,
                        err_msg: _err_msg
                    });

                    if (router.history.current.path !== '/check-in' && _enable == 0) {
                        commit('APP_SET_MSG', {
                            msg: _err_msg
                        });
                        commit('APP_SHARED_CART_CLOSED', {
                            router: router,
                            sid: rootState.app.sid
                        });
                    }
                }
            });
    },
    check_new: function check_new(_ref13, tel) {
        var commit = _ref13.commit,
            rootState = _ref13.rootState;
        var aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';
        fetch(aj_host + '/weapp/takeout/user/check_new?sid=' + rootState.app.sid + '&tel=' + encodeURIComponent(tel), {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    var _is_new = res.data.data.is_new || false;

                    commit('APP_SET_USER_IS_NEW', {
                        is_new: _is_new
                    });
                }
            });
    },
    check_vip: function check_vip(_ref14, tel) {
        var commit = _ref14.commit,
            rootState = _ref14.rootState;
        var aj_host = rootState.debug ? 'http://127.0.0.1:5757' : '';
        fetch(aj_host + '/weapp/takeout/user/check_vip?sid=' + rootState.app.sid + '&tel=' + encodeURIComponent(tel), {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                res = JSON.parse(res);

                if (res.data.code === 100000) {
                    var _is_vip = res.data.data.is_vip || false;

                    commit('APP_SET_USER_IS_VIP', {
                        is_vip_new: _is_vip
                    });
                }
            });
    },
    get_menu: function get_menu(_ref15, sid) {
        var commit = _ref15.commit,
            rootState = _ref15.rootState;
        var aj_host = rootState.debug ? 'http://127.0.0.1:5757' : ''; // let aj_host = rootState.debug ? 'https://takeout.minitable.link' : '';

        fetch(aj_host + '/weapp/takeout/menu/get?sid=' + sid, {
            method: 'GET'
        })
            .then(function (res) {
                return res.text();
            })
            .then(function (res) {
                var res_data = JSON.parse(res).data;

                if (res_data.code === 100000) {
                    commit('APP_INIT_MENU_DATA', {
                        show_food_list: res_data.data.menu[res_data.data.first_menu].list,
                        now_menu: res_data.data.first_menu,
                        menu_dict: res_data.data.menu,
                        menu_list: res_data.data.menu_list,
                        food_dict: res_data.data.foods
                    });
                    commit('APP_UPDATE_CART_DATA', {
                        food_dict: res_data.data.foods
                    });
                }
            });
    }
}; // mutations

var mutations = {
    APP_SET_CART_DATA: function APP_SET_CART_DATA(state, _data) {
        var food_count = 0;

        for (var i = 0; i < _data.food_list.length; i++) {
            food_count = food_count + _data.food_list[i].fcount;
        }

        state.cart_data.cart_food_list = _data.food_list;
        state.cart_data.cart_food_dict = _data.food_dict;
        state.cart_data.total_price = _data.total_price;
        state.cart_data.total_price_vip = _data.total_price_vip;
        state.cart_data.total_price_pickup = _data.total_price_pickup;
        state.cart_data.user_count = _data.user_count;
        state.shared_oid = _data.shared_oid;

        if (_data.shared_tname) {
            state.shared_tname = _data.shared_tname;
        }

        state.shared_tstatus = _data.shared_tstatus;
        state.is_vip = _data.is_vip;
        state.cart_data.total_food_count = food_count;
    },
    APP_INIT_STORE_DATA: function APP_INIT_STORE_DATA(state, _data) {
        state.app_title = _data.sname;
        state.sname = _data.sname;
        _data.language = window.localStorage.getItem('language') || _data.language;
        state.store_data = _data;
    },
    APP_NEW_SET_FOOD: function APP_NEW_SET_FOOD(state, food_data) {
        var res = [];

        var _ori_food_list = JSON.parse(JSON.stringify(state.cart_data.cart_food_list));

        var food_count = 0;
        var plus_count = 0;
        var total_price = 0;
        var total_price_vip = 0;
        var total_price_pickup = 0;

        for (var i = 0, len = _ori_food_list.length; i < len; i++) {
            var extra_price = 0;
            var extra_price_pickup = 0;

            if (_ori_food_list[i].addon_prices != '') {
                var _addon_items = _ori_food_list[i].addon_prices.split('@@');

                var _addon_counts = _ori_food_list[i].addon_counts.split('@@');

                var _addon_pickup_discounts = _ori_food_list[i].addon_pickup_discounts.split('@@');

                for (var m = 0, mLen = _addon_items.length; m < mLen; m++) {
                    var _addon_prices = _addon_items[m].split('|');

                    var _counts_arr = _addon_counts[m].split('|');

                    var _pickup_discounts = _addon_pickup_discounts[m].split('|');

                    for (var j = 0, jLen = _addon_prices.length; j < jLen; j++) {
                        extra_price = parseFloat(extra_price) + parseFloat(_addon_prices[j] * _counts_arr[j]);
                        extra_price_pickup =
                            parseFloat(extra_price_pickup) +
                            parseFloat(_addon_prices[j] * _pickup_discounts[j] * _counts_arr[j]);
                    }
                }
            }

            var _price =
                food_data.is_vip && _ori_food_list[i].fprice_vip
                    ? _ori_food_list[i].fprice_vip
                    : _ori_food_list[i].fprice;

            var _pickup_price = _ori_food_list[i].fprice_pickup
                ? _ori_food_list[i].fprice_pickup
                : _ori_food_list[i].fprice;

            if (food_data.fid == _ori_food_list[i].fid) {
                if (
                    _ori_food_list[i].feature_name == food_data.feature_name &&
                    _ori_food_list[i].uname == food_data.uname &&
                    _ori_food_list[i].note == food_data.note &&
                    _ori_food_list[i].addon_names == food_data.addon_names
                ) {
                    plus_count = food_data.set_count - _ori_food_list[i].fcount;
                    _ori_food_list[i].fcount = food_data.set_count;

                    if (_ori_food_list[i].fcount > 0) {
                        res.push(_ori_food_list[i]);
                        total_price += _ori_food_list[i].fcount * (parseFloat(_ori_food_list[i].fprice) + extra_price);
                        total_price_vip += _ori_food_list[i].fcount * (parseFloat(_price) + extra_price);
                        total_price_pickup +=
                            _ori_food_list[i].fcount * (parseFloat(_pickup_price) + extra_price_pickup);
                    }
                } else {
                    res.push(_ori_food_list[i]);
                    total_price += _ori_food_list[i].fcount * (parseFloat(_ori_food_list[i].fprice) + extra_price);
                    total_price_vip += _ori_food_list[i].fcount * (parseFloat(_price) + extra_price);
                    total_price_pickup += _ori_food_list[i].fcount * (parseFloat(_pickup_price) + extra_price_pickup);
                }

                food_count = food_count + _ori_food_list[i].fcount;
            } else {
                res.push(_ori_food_list[i]);
                food_count = food_count + _ori_food_list[i].fcount;
                total_price += _ori_food_list[i].fcount * (parseFloat(_ori_food_list[i].fprice) + extra_price);
                total_price_vip += _ori_food_list[i].fcount * (parseFloat(_price) + extra_price);
                total_price_pickup += _ori_food_list[i].fcount * (parseFloat(_pickup_price) + extra_price_pickup);
            }
        }

        state.cart_data.cart_food_dict[food_data.fid].mix_fcount =
            state.cart_data.cart_food_dict[food_data.fid].mix_fcount + plus_count;
        state.cart_data.total_food_count = food_count;
        state.cart_data.cart_food_list = res;
        state.cart_data.total_price = parseFloat(total_price).toFixed(2);
        state.cart_data.total_price_vip = parseFloat(total_price_vip).toFixed(2);
        state.cart_data.total_price_pickup = parseFloat(total_price_pickup).toFixed(2);
        state.cart_data.cart_food_dict.random = new Date().getTime();
    },
    APP_NEW_ADD_FOOD: function APP_NEW_ADD_FOOD(state, food_data) {
        var res = [];

        var _ori_food_list = JSON.parse(JSON.stringify(state.cart_data.cart_food_list));

        var add_flag = false;
        var food_count = 0;

        for (var i = 0, len = _ori_food_list.length; i < len; i++) {
            if (food_data.fid == _ori_food_list[i].fid) {
                if (
                    _ori_food_list[i].feature_name == food_data.feature_name &&
                    _ori_food_list[i].uname == food_data.uname &&
                    _ori_food_list[i].note == food_data.note &&
                    _ori_food_list[i].addon_names == food_data.addon_names
                ) {
                    _ori_food_list[i].fcount = _ori_food_list[i].fcount + food_data.add_count;
                    res.push(_ori_food_list[i]);
                } else {
                    res.push(_ori_food_list[i]);

                    if (!add_flag) {
                        res.push(food_data);
                        food_count = food_count + food_data.add_count;
                    }
                }

                add_flag = true;
                food_count = food_count + _ori_food_list[i].fcount;
            } else {
                res.push(_ori_food_list[i]);
                food_count = food_count + _ori_food_list[i].fcount;
            }
        }

        if (!add_flag) {
            res.push(food_data);
            food_count = food_count + food_data.add_count;
        }

        if (!state.cart_data.cart_food_dict[food_data.fid]) {
            state.cart_data.cart_food_dict[food_data.fid] = {
                mix_fcount: food_data.add_count,
                price: food_data.fprice,
                price_vip: food_data.fprice_vip,
                price_pickup: food_data.fprice_pickup
            };
        } else {
            state.cart_data.cart_food_dict[food_data.fid].mix_fcount =
                state.cart_data.cart_food_dict[food_data.fid].mix_fcount + food_data.add_count;
        }

        var _price = food_data.is_vip && food_data.fprice_vip ? food_data.fprice_vip : food_data.fprice;

        var _pickup_price = food_data.fprice_pickup ? food_data.fprice_pickup : food_data.fprice;

        state.cart_data.total_food_count = food_count;
        state.cart_data.cart_food_list = res;
        state.cart_data.total_price = (
            parseFloat(state.cart_data.total_price) +
            (parseFloat(food_data.fprice) + parseFloat(food_data.addon_total_price)) * food_data.add_count
        ).toFixed(2);
        state.cart_data.total_price_vip = (
            parseFloat(state.cart_data.total_price_vip) +
            (parseFloat(_price) + parseFloat(food_data.addon_total_price)) * food_data.add_count
        ).toFixed(2);
        state.cart_data.total_price_pickup = (
            parseFloat(state.cart_data.total_price_pickup) +
            (parseFloat(_pickup_price) + parseFloat(food_data.addon_total_price_pickup)) * food_data.add_count
        ).toFixed(2);
        state.cart_data.cart_food_dict.random = new Date().getTime();
    },
    APP_DEL_FOOD_INTO_CART: function APP_DEL_FOOD_INTO_CART(state, food_data) {
        var now_count = food_data.fcount;
        var res = [];

        var _ori_food_list = JSON.parse(JSON.stringify(state.cart_data.cart_food_list));

        var food_count = 0;

        for (var i = 0, len = _ori_food_list.length; i < len; i++) {
            if (food_data.fid == _ori_food_list[i].fid) {
                if (
                    _ori_food_list[i].feature_default_value == food_data.default_value &&
                    _ori_food_list[i].uname == food_data.uname
                ) {
                    if (now_count == 1) {
                        continue;
                    } else {
                        food_count = food_count + food_data.fcount;
                        res.push(food_data);
                    }
                } else {
                    food_count = food_count + _ori_food_list[i].fcount;
                    res.push(_ori_food_list[i]);
                }
            } else {
                food_count = food_count + _ori_food_list[i].fcount;
                res.push(_ori_food_list[i]);
            }
        }

        if (state.cart_data.cart_food_dict[food_data.fid]) {
            if (state.cart_data.cart_food_dict[food_data.fid].mix_fcount == 1) {
                state.cart_data.cart_food_dict[food_data.fid] = null;
            } else {
                state.cart_data.cart_food_dict[food_data.fid].mix_fcount--;
            }
        }

        var _price = food_data.is_vip && food_data.fprice_vip ? food_data.fprice_vip : food_data.fprice;

        var _pickup_price = food_data.fprice_pickup ? food_data.fprice_pickup : food_data.fprice;

        state.cart_data.cart_food_list = res;
        state.cart_data.total_food_count = food_count;
        state.cart_data.total_price = (parseFloat(state.cart_data.total_price) - parseFloat(food_data.fprice)).toFixed(
            2
        );
        state.cart_data.total_price_vip = (parseFloat(state.cart_data.total_price_vip) - parseFloat(_price)).toFixed(2);
        state.cart_data.total_price_pickup = (
            parseFloat(state.cart_data.total_price_pickup) - parseFloat(_pickup_price)
        ).toFixed(2);
        state.cart_data.cart_food_dict.random = new Date().getTime();
    },
    APP_CLEAR_CART_DATA: function APP_CLEAR_CART_DATA(state) {
        state.cart_data = {
            cart_food_list: [],
            cart_food_dict: {
                random: new Date().getTime()
            },
            total_price: '0.00',
            total_price_vip: '0.00',
            total_price_pickup: '0.00',
            remark: '',
            user_count: state.cart_data.user_count,
            total_food_count: 0
        };
    },
    APP_SET_JOIN_TABLE_INFO: function APP_SET_JOIN_TABLE_INFO(state, _data) {
        state.email = _data.email;
        state.uname = _data.email;
        state.shared_cart_id = _data.cartid;
        state.shared_tid = _data.tid;
    },
    APP_SET_SHARED_TIMER: function APP_SET_SHARED_TIMER(state, _timer) {
        state.shared_foods_timer = _timer;
    },
    APP_SHARED_CART_CLOSED: function APP_SHARED_CART_CLOSED(state, _data) {
        state.cart_data = {
            cart_food_list: [],
            cart_food_dict: {
                random: new Date().getTime()
            },
            total_price: '0.00',
            total_price_vip: '0.00',
            total_price_pickup: '0.00',
            remark: '',
            user_count: 0,
            total_food_count: 0
        };
        state.shared_oid = '';
        state.shared_tid = '';
        state.shared_tname = '';
        state.shared_cart_id = '';
        state.shared_table_pswd = '';
        window.localStorage.removeItem('shared_tid');
        window.localStorage.removeItem('shared_tname');
        window.localStorage.removeItem('shared_cart_id');
        window.localStorage.removeItem('shared_oid');
        window.localStorage.removeItem('shared_table_pswd');

        if (_data.router && _data.sid) {
            _data.router.replace({
                path: '/check-in?sid=' + _data.sid
            });
        } else {
            window.localStorage.removeItem('client_sid');
        }
    },
    APP_SET_SHARED_OID: function APP_SET_SHARED_OID(state, _data) {
        state.shared_oid = _data.shared_oid;
        state.has_new_order = true;
        window.localStorage.setItem('shared_oid', _data.shared_oid);
    },
    APP_SET_HAS_NEW_ORDER: function APP_SET_HAS_NEW_ORDER(state, _data) {
        state.has_new_order = true;
    },
    APP_SET_MSG: function APP_SET_MSG(state, _data) {
        state.msg = _data.msg;
    },
    APP_SET_SID: function APP_SET_SID(state, _data) {
        if (_data.sid == window.localStorage.getItem('client_sid')) {
            if (_data.tid != '') {
                if (_data.tid == window.localStorage.getItem('shared_tid')) {
                    return;
                }
            } else {
                return;
            }
        }

        window.localStorage.setItem('client_sid', _data.sid);
        state.sid = _data.sid;
        state.cart_data = {
            cart_food_list: [],
            cart_food_dict: {
                random: new Date().getTime()
            },
            total_price: '0.00',
            total_price_vip: '0.00',
            total_price_pickup: '0.00',
            remark: '',
            user_count: 0,
            total_food_count: 0
        };
        state.shared_oid = '';
        state.shared_tid = '';
        state.shared_tname = '';
        state.shared_cart_id = '';
        state.shared_table_pswd = '';
        window.localStorage.removeItem('shared_tid');
        window.localStorage.removeItem('shared_tname');
        window.localStorage.removeItem('shared_cart_id');
        window.localStorage.removeItem('shared_oid');
        window.localStorage.removeItem('shared_table_pswd');
    },
    APP_HAVE_READ_NEW_ORDER: function APP_HAVE_READ_NEW_ORDER(state) {
        state.has_new_order = false;
    },
    APP_TOGGLE_CART_DETAIL: function APP_TOGGLE_CART_DETAIL(state, show) {
        state.show_cart_detail = show;
    },
    APP_TOGGLE_LEFT_NAV: function APP_TOGGLE_LEFT_NAV(state, _show) {
        state.show_left_nav = _show;
    },
    APP_SET_APP_TITLE: function APP_SET_APP_TITLE(state, _title) {
        state.app_title = _title;
    },
    APP_SHOW_MENU_NAV: function APP_SHOW_MENU_NAV(state, _show_menu_nav) {
        state.show_menu_nav = _show_menu_nav;
    },
    APP_INIT_PAYMETHOD: function APP_INIT_PAYMETHOD(state, _data) {
        state.pay_method_setting = _data.pay_method_setting;
        state.tip_method_setting = _data.tip_method_setting;
        state.merchant_custom_value = _data.merchant_custom_value;
        state.choose_time = _data.choose_time;
        state.choose_time_ahead_days = _data.choose_time_ahead_days;
        state.choose_time_options = _data.choose_time_options;
    },
    APP_INIT_TAKEOUT_ENABLE: function APP_INIT_TAKEOUT_ENABLE(state, _data) {
        state.is_open = _data.is_open;
        state.err_msg = _data.err_msg;
    },
    APP_SET_CHECK_TIMER: function APP_SET_CHECK_TIMER(state, timer) {
        state.check_timer = timer;
    },
    APP_SET_USER_IS_NEW: function APP_SET_USER_IS_NEW(state, _data) {
        state.is_new = _data.is_new;
    },
    APP_INIT_OTHER_SETTING: function APP_INIT_OTHER_SETTING(state, _data) {
        state.full_coupon = _data.full_coupon || [];
        state.first_discount_amount = _data.first_discount_amount || 0;
        state.first_discount_type = _data.first_discount_type || 0;
        state.first_discount_limit_amount = _data.first_discount_limit_amount || 0; // state.pickup_amount = _data.pickup_amount || 0;
        // state.pickup_enable = _data.pickup_enable || 0;

        state.annoucement = _data.annoucement || '';
        state.delivery_vip_free = _data.delivery_vip_free || 0; // state.delivery_enable = _data.delivery_enable || 0;

        state.delivery_area_list = _data.delivery_area_list || []; // state.pickup_discount_enable = _data.pickup_discount_enable || 0;

        state.feature_image = _data.feature_image;
        state.joinin_back_color = _data.joinin_back_color;
        state.notice_layer_title_color = _data.notice_layer_title_color;
        state.notice_layer_subtitle = _data.notice_layer_subtitle;
        state.notice_layer_ps_content = _data.notice_layer_ps_content;
        state.pickup_setting = _data.pickup_setting;
        state.delivery_setting = _data.delivery_setting;
    },
    APP_SET_USER_IS_VIP: function APP_SET_USER_IS_VIP(state, _data) {
        state.is_vip_new = _data.is_vip_new;
    },
    APP_SET_PHONE_NUM: function APP_SET_PHONE_NUM(state, _data) {
        state.phone_num = _data.phone_num;
        state.code = _data.code;
    },
    APP_INIT_MENU_DATA: function APP_INIT_MENU_DATA(state, res_data) {
        state.show_food_list = res_data.show_food_list;
        state.now_menu = res_data.now_menu;
        state.menu_dict = res_data.menu_dict;
        state.menu_list = res_data.menu_list;
        state.food_dict = res_data.food_dict;
        state.is_loading_menu = false;
    },
    APP_SET_MENU_TIMER: function APP_SET_MENU_TIMER(state, timer) {
        state.menu_timer = timer;
    },
    APP_UPDATE_CART_DATA: function APP_UPDATE_CART_DATA(state, _data) {
        var ori_cart_data = JSON.parse(JSON.stringify(state.cart_data));
        var cart_food_list = ori_cart_data.cart_food_list,
            cart_food_dict = ori_cart_data.cart_food_dict,
            total_price = ori_cart_data.total_price,
            total_price_vip = ori_cart_data.total_price_vip,
            total_food_count = ori_cart_data.total_food_count;
        var food_dict = _data.food_dict;
        var new_list = [];
        var changed = false;

        for (var i = 0; i < cart_food_list.length; i++) {
            var temp_data = JSON.parse(JSON.stringify(cart_food_list[i]));
            var fid = temp_data.fid,
                fprice = temp_data.fprice,
                addon_names = temp_data.addon_names,
                addon_prices = temp_data.addon_prices,
                addon_counts = temp_data.addon_counts,
                fprice_pickup = temp_data.fprice_pickup,
                addon_pickup_discounts = temp_data.addon_pickup_discounts,
                fcount = temp_data.fcount;

            if (!food_dict[fid] || food_dict[fid].is_out_of_stock == 1) {
                changed = true;
                continue;
            }

            if (addon_names) {
                var ori_addon_names_arr = addon_names.split('@@');
                var ori_addon_prices_arr = addon_prices.split('@@');
                var ori_addon_counts_arr = addon_counts.split('@@');
                var ori_addon_pickup_discounts_arr = addon_pickup_discounts.split('@@');
                var now_addon_list = food_dict[fid].addon_data;
                var now_addon_dict = {};

                for (var j = 0; j < now_addon_list.length; j++) {
                    var _now_addon_list$j = now_addon_list[j],
                        addon_values_name = _now_addon_list$j.addon_values_name,
                        addon_values_price = _now_addon_list$j.addon_values_price,
                        addon_values_availability = _now_addon_list$j.addon_values_availability,
                        pickup_discount = _now_addon_list$j.pickup_discount;
                    var addon_values_name_arr = addon_values_name.split('|');
                    var addon_values_price_arr = addon_values_price.split('|');
                    var addon_values_availability_arr = addon_values_availability.split('|');

                    for (var m = 0; m < addon_values_name_arr.length; m++) {
                        now_addon_dict[addon_values_name_arr[m]] = {
                            price: addon_values_price_arr[m] || 0,
                            pickup_discount: pickup_discount,
                            availability: addon_values_availability_arr[m] == 1 ? true : false
                        };
                    }
                }

                var new_addon_name = [];
                var new_addon_price = [];
                var new_addon_count = [];
                var new_addon_pickup_discount = [];
                var new_addon_total_price = 0;
                var new_addon_total_price_pickup = 0;

                for (var n = 0; n < ori_addon_names_arr.length; n++) {
                    var temp_name = ori_addon_names_arr[n];
                    var temp_price = ori_addon_prices_arr[n];
                    var temp_count = ori_addon_counts_arr[n];
                    var temp_pickup_discounts = ori_addon_pickup_discounts_arr[n];
                    var item_temp_names = temp_name.split('|');
                    var item_temp_counts = temp_count.split('|');
                    var item_temp_pickup_discounts = temp_pickup_discounts.split('|');
                    var child_addon_price_arr = [];
                    var child_addon_name_arr = [];
                    var child_addon_count_arr = [];
                    var child_addon_pickup_discounts_arr = [];

                    for (var l = 0, jLen = item_temp_names.length; l < jLen; l++) {
                        var child_addon_name = item_temp_names[l];
                        var child_addon_count = item_temp_counts[l];
                        var child_addon_pickup_discount = item_temp_pickup_discounts[l];

                        if (!now_addon_dict[child_addon_name] || !now_addon_dict[child_addon_name].availability) {
                            changed = true;
                            continue;
                        }

                        child_addon_name_arr.push(child_addon_name);
                        child_addon_count_arr.push(child_addon_count);
                        var now_pickup_discount = 1;

                        if (child_addon_pickup_discount != now_addon_dict[child_addon_name].pickup_discount) {
                            changed = true;
                            child_addon_pickup_discounts_arr.push(now_addon_dict[child_addon_name].pickup_discount);
                            now_pickup_discount = now_addon_dict[child_addon_name].pickup_discount;
                        } else {
                            child_addon_pickup_discounts_arr.push(child_addon_pickup_discount);
                            now_pickup_discount = child_addon_pickup_discount;
                        }

                        if (temp_price != now_addon_dict[child_addon_name].price) {
                            changed = true;
                            child_addon_price_arr.push(now_addon_dict[child_addon_name].price);
                            new_addon_total_price =
                                new_addon_total_price + now_addon_dict[child_addon_name].price * child_addon_count;
                            new_addon_total_price_pickup =
                                new_addon_total_price +
                                now_addon_dict[child_addon_name].price * child_addon_count * now_pickup_discount;
                        } else {
                            child_addon_price_arr.push(temp_price);
                            new_addon_total_price = new_addon_total_price + temp_price * child_addon_count;
                            new_addon_total_price_pickup =
                                new_addon_total_price + temp_price * child_addon_count * now_pickup_discount;
                        }
                    }

                    new_addon_name.push(child_addon_name_arr.join('|'));
                    new_addon_price.push(child_addon_price_arr.join('|'));
                    new_addon_count.push(child_addon_count_arr.join('|'));
                    new_addon_pickup_discount.push(child_addon_pickup_discounts_arr.join('|'));
                }

                temp_data.addon_total_price = new_addon_total_price.toFixed(2);
                temp_data.addon_names = new_addon_name.join('@@');
                temp_data.addon_prices = new_addon_price.join('@@');
                temp_data.addon_counts = new_addon_count.join('@@');
                temp_data.addon_pickup_discounts = new_addon_pickup_discount.join('@@');
            }

            if (fprice != food_dict[fid].fprice) {
                temp_data.fprice = food_dict[fid].fprice;
                changed = true;
            }

            if (fprice_pickup != food_dict[fid].fprice_pickup) {
                temp_data.fprice_pickup = food_dict[fid].fprice_pickup;
                changed = true;
            }

            if (food_dict[fid].once_limit > 0 && fcount > food_dict[fid].once_limit) {
                temp_data.fcount = food_dict[fid].once_limit;
                changed = true;
            }

            new_list.push(temp_data);
        }

        var new_cart_dict = {};

        for (var _fid in cart_food_dict) {
            var _temp_data = JSON.parse(JSON.stringify(cart_food_dict[_fid]));

            if (_fid != 'random') {
                if (!food_dict[_fid] || food_dict[_fid].is_out_of_stock == 1) {
                    changed = true;
                    continue;
                }

                if (_temp_data.price != food_dict[_fid].fprice) {
                    _temp_data.price = food_dict[_fid].fprice;
                    changed = true;
                }

                if (_temp_data.price_vip != food_dict[_fid].fprice_vip) {
                    _temp_data.price_vip = food_dict[_fid].fprice_vip;
                    changed = true;
                }

                if (_temp_data.price_pickup != food_dict[_fid].fprice_pickup) {
                    _temp_data.price_pickup = food_dict[_fid].fprice_pickup;
                    changed = true;
                }

                new_cart_dict[_fid] = _temp_data;
            } else {
                new_cart_dict.random = new Date().getTime();
            }
        }

        if (changed) {
            var food_count = 0;
            var _total_price = 0;
            var _total_price_vip = 0;
            var total_price_pickup = 0;

            for (var k = 0; k < new_list.length; k++) {
                var temp_food_data = new_list[k];
                var extra_price = 0;
                var extra_price_pickup = 0;

                if (temp_food_data.addon_prices != '') {
                    var _addon_items = temp_food_data.addon_prices.split('@@');

                    var _addon_counts = temp_food_data.addon_counts.split('@@');

                    var _addon_pickup_discounts = temp_food_data.addon_pickup_discounts.split('@@');

                    for (var _m = 0, mLen = _addon_items.length; _m < mLen; _m++) {
                        var _addon_prices = _addon_items[_m].split('|');

                        var _counts_arr = _addon_counts[_m].split('|');

                        var _pickup_discounts_arr = _addon_pickup_discounts[_m].split('|');

                        for (var _j = 0, _jLen = _addon_prices.length; _j < _jLen; _j++) {
                            extra_price = parseFloat(extra_price) + parseFloat(_addon_prices[_j] * _counts_arr[_j]);
                            extra_price_pickup =
                                parseFloat(extra_price_pickup) +
                                parseFloat(_addon_prices[_j] * _counts_arr[_j] * _pickup_discounts_arr[_j]);
                        }
                    }
                }

                var _price =
                    temp_food_data.is_vip && temp_food_data.fprice_vip
                        ? temp_food_data.fprice_vip
                        : temp_food_data.fprice;

                var _pickup_price = temp_food_data.fprice_pickup ? temp_food_data.fprice_pickup : temp_food_data.fprice;

                food_count = food_count + temp_food_data.fcount;
                _total_price += temp_food_data.fcount * (parseFloat(temp_food_data.fprice) + extra_price);
                _total_price_vip += temp_food_data.fcount * (parseFloat(_price) + extra_price);
                total_price_pickup += temp_food_data.fcount * (parseFloat(_pickup_price) + extra_price_pickup);
            }

            state.cart_data.cart_food_list = new_list;
            state.cart_data.total_food_count = food_count;
            state.cart_data.total_price = _total_price.toFixed(2);
            state.cart_data.total_price_vip = _total_price_vip.toFixed(2);
            state.cart_data.total_price_pickup = total_price_pickup.toFixed(2);
            state.cart_data.cart_food_dict = new_cart_dict;
        }
    },
    APP_SET_UNAME: function APP_SET_UNAME(state, _data) {
        state.uname = _data.name;
        window.localStorage.setItem('uname', _data.name);
    },
    APP_SET_IF_LOADING: function APP_SET_IF_LOADING(state, _data) {
        state.is_loading = _data.is_loading;
    },
    APP_SET_ORDER_TYPE: function APP_SET_ORDER_TYPE(state, _data) {
        state.type = _data.type;
    },
    APP_SET_ADDRESS: function APP_SET_ADDRESS(state, _data) {
        state.state = _data.state;
        state.city = _data.city;
        state.street_address1 = _data.street_address1;
        state.street_address2 = _data.street_address2;
        state.zip_code = _data.zip_code;
        state.zip_code_index = _data.zip_code_index;
    },
    APP_SET_LANGUAGE: function APP_SET_LANGUAGE(state, _data) {
        state.store_data = Object.assign(state.store_data, _data);
    }
};

function _checkAdd(food_data, rootState) {
    var cart_food_list = rootState.app.cart_data.cart_food_list || [];
    var isAdd = true;

    for (var i = 0; i < cart_food_list.length; i++) {
        if (food_data.fid == cart_food_list[i].fid) {
            if (
                cart_food_list[i].feature_name == food_data.feature_name &&
                cart_food_list[i].uname == food_data.uname &&
                cart_food_list[i].note == food_data.note &&
                cart_food_list[i].addon_names == food_data.addon_names
            ) {
                food_data.fcount = cart_food_list[i].fcount + food_data.add_count;
                isAdd = false;
            }
        }
    }

    return {
        isAdd: isAdd,
        food_data: food_data
    };
}

var _default = {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};
exports['default'] = _default;
