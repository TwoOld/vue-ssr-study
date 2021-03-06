const express = require('express')
const app = new express()

app.get('/api/user/info', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Content-Type', 'application/json;charse=utf-8')
  res.json({
    code: 0,
    data: {
      id: 1,
      name: 'chiu',
      age: 29,
    }
  })
})

app.get('/api/user/menu', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Content-Type', 'application/json;charse=utf-8')
  res.json({
    code: 0,
    list: [
      {
        path: '/',
        component: 'index',
      },
      {
        path: '/detail',
        component: 'detail',
      },
    ]
  })
})

app.listen(8080)
