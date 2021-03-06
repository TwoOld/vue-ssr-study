import { createServerApp } from './app'

export default ctx => {
  // 返回一个Promise
  // 确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    // 创建vue实例
    const { app, router, store } = createServerApp(ctx)
    // 跳转首屏地址
    router.push(ctx.url)
    // 路由就绪，完成Promise
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      // resolve(app)
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        // console.log(Component)

        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        console.log('async data server:', store.state)

        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        ctx.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
