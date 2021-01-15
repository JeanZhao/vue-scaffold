<template lang="html">
    <div id="app">
        <router-view></router-view>
        <div v-if="msg" class="msg-box"><span class="msg-type">Error!</span> {{msg}}</div>
    </div>
</template>
<style>
    html {
        font-family: Arial;
    }

    .msg-box {
        z-index: 9999;
        position: fixed;
        top: 30px;
        left: 80px;
        right: 80px;
        width: 215px;
        height: auto;
        font-size: 14px;
        display: flex;
        justify-content: center;
        padding: 10px;
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .msg-type {
        font-weight: bold;
        margin-right: 10px;
    }

    .pc {
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        transform: translateX(-50%);
        width: 385px;
        max-width: 385px;
    }
</style>

<script>
    import Vue from 'vue';
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
    import { OS } from '../kits/tools.js';

    export default {
        name: 'v-home',
        components: {},
        data() {
            return {
            }
        },
        created() {
        },
        mounted() {
            if (OS().isPc) {
                document.querySelector('#app').classList.add("pc");
            } else {
                document.querySelector('#app').classList.remove("pc");
            }
        },
        computed: {
            ...mapGetters({
                user: 'app/getUser',
                msg: 'app/getMsg'
            }),
        },
        methods: {
        }
    };
</script>