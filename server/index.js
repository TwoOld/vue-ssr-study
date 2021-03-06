const fs = require('fs')
const express = require('express')

const app = express()

// 创建vue实例
// const vm = new Vue({
//   data: { count: 1 },
//   template: `
//         <div>{{count}}</div>
//     `,
// })

// 创建渲染器
// const renderer = require('vue-server-renderer').createRenderer()

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../dist/server/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync('./src/index.temp.html', 'utf-8'),
  clientManifest,
})

function render2String(ctx) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(ctx, (err, html) => {
      if (err) {
        reject(err)
        return
      }
      resolve(html)
    })
  })
}

const proxy = require('http-proxy-middleware')

app.use(express.static('./dist/client', { index: false }))

app.use('/api', proxy({ target: 'http://localhost:8080', changeOrigin: true }))
// 服务端路由声明
app.get('*', async function (req, res) {
  console.log('req', req.url)

  try {
    const context = {
      title: 'ssr test',
      url: req.url,
    }
    const html = await render2String(context)
    res.send(html)
  } catch (error) {
    if (error.code === 404) {
      res.status(404).end('Page not found')
    } else {
      res.status(500).end('Internal Server Error')
    }
  }
})

app.listen(3000, () => console.log('app started at 3000'))
