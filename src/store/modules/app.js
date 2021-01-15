import fetchApi from '../../kits/newFetch';

const debugHost = 'http://127.0.0.1:6161';

// initial state
const state = {
    info: {},
    user: JSON.parse(window.localStorage.getItem('user') || '{}'),
    is_loading: false,
    errMsg: null
};

// getters
const getters = {
    getInfo(state) {
        return state.info;
    },
    getUser(state) {
        return state.user;
    },
    getLoading(state) {
        return state.is_loading;
    },
    getMsg(state) {
        return state.errMsg;
    }
};

// actions
const actions = {
    initsInfo({ commit, rootState, rootGetters }, postBody) {
        let aj_host = rootState.debug ? debugHost : '';
        fetchApi(
            { commit },
            {
                request_name: 'get_info',
                params: postBody.data,
                aj_host
            }
        )
            .then((res) => {
                if (res && res.data && res.data.data) {
                    if (postBody.success) postBody.success();
                    let vo = res.data.data;
                    commit('SET_INFO', {
                        info:
                        {
                            name: vo.sname || '',
                        }
                    });
                } else {
                    if (postBody.fail) postBody.fail(e);
                }
            }).catch((e) => {
                if (postBody.fail) postBody.fail(e);
            });
    },
};

// mutations
const mutations = {
    APP_SET_IF_LOADING(state, _data) {
        state.is_loading = _data.is_loading;
    },
    APP_SET_MSG(state, _data) {
        state.errMsg = _data.msg;
    },
    SET_INFO(state, _data) {
        state.info = _data.info;
    },
    SET_USER(state, _data) { // 更新用户登录状态
        let newData = _data.user ? _data.user : { ...state.user };
        state.user = newData;
        window.localStorage.setItem('user', JSON.stringify(newData));
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
