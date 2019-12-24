// 通用文件
// 创建Vue实例
import Vue from 'vue'
import { createRouter } from './router'
import { createStore } from './store'
import { createAxios } from './utils/http'
import App from './App.vue'

export function createApp(context) {
    const router = createRouter()
    const $http = createAxios(context)
    const store = createStore($http)
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store }
}