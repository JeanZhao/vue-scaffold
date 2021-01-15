import querystring from 'querystring';

const interface_list = {
    get_info: { url: '/test', method: 'get' },
    update_info: { url: '/test', method: 'post', postjson: true },
};

function fetchApi({ request_name, params, customHeaders = {}, aj_host = '' }) {
    const conf = JSON.parse(JSON.stringify(interface_list[request_name]));
    const token = window.localStorage.getItem('token') || '';

    if (!conf) {
        return Promise.reject({
            code: 0,
            msg: '',
            data: {
                code: 100010,
                msg: 'no ajax register',
                data: {}
            }
        });
    }

    let headerSettings = {
        'Content-Type': conf.postjson ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Bearer ' + token,
    };

    Object.keys(customHeaders).forEach((k) => {
        headerSettings[k] = customHeaders[k];
    });
    const headers = new Headers(headerSettings);

    const fetch_optins = {
        method: conf.method,
        headers,
        credentials: 'omit'
    };

    if (conf.method == 'get') {
        conf.url = `${conf.url}${querystring.stringify(params) ? '?' + querystring.stringify(params) : ''}`;
    } else if (conf.method == 'post') {
        let tmp = Object.keys(params).length > 0 ? Object.keys(params).map((key) =>
            conf.postjson ? `"${encodeURIComponent(key)}":"${encodeURIComponent(params[key])}"`
                : `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`) : [],

            searchParams = tmp.length > 0 ? (conf.postjson ? `{${tmp.join(',')}}` : tmp.join('&')) : '';

        fetch_optins.body = searchParams;
    }

    return fetch(aj_host + conf.url, fetch_optins)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then((data) => {
            if (data.data.code === 100000) { // 正常登录接口处理
                if (data.data.data.Authorization) {
                    let token = data.data.data.Authorization.split(' ')[1];
                    if (token) {
                        window.localStorage.setItem('token', token);
                    }
                }
                return Promise.resolve(data);
            } else if (data.data.code === 100002) { // 登录失效
                window.localStorage.removeItem('token');
                window.location.replace(`#/login`);
                return Promise.reject(data);
            } else {
                return Promise.reject(data);
            }
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        });
}

let msgResetTimer;
const handleMsgReset = (commit) => {
    if (msgResetTimer) {
        clearTimeout(msgResetTimer);
    }
    msgResetTimer = setTimeout(() => {
        commit && commit('app/APP_SET_MSG', { msg: undefined, type: 'error' }, { root: true });
        msgResetTimer && clearTimeout(msgResetTimer);
    }, 3000);
};
export default ({ commit }, opts) => {
    return fetchApi(opts)
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch((res) => {
            const defaultMsg = 'Unknown error occurs.', msg = !res ? defaultMsg : (res.data && res.data.msg ? res.data.msg : (res.error || res || defaultMsg));
            commit && commit('app/APP_SET_MSG', { msg, type: 'error' }, { root: true });
            handleMsgReset(commit);
            return Promise.reject(res);
        });
};
