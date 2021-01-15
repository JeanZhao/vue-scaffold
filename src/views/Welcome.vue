<template>
    <div>
        <div class="title">{{info.title || 'Welcome vue.'}}</div>
    </div>
</template>
<style>
    .title {
        width: 100%;
        height: 100px;
        font-size: 28px;
        font-weight: 500;
        background-color: mediumseagreen;
        color: #fff;
        text-align: center;
        padding-top: 30px;
    }
</style>

<script>
    import Vue from 'vue';
    import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

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
        },
        computed: {
            ...mapGetters({
                info: 'app/getInfo',
            }),
        },
        methods: {
        }
    };
</script>