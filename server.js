const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const users = [];

app.use(express.static('public'));
app.use(express.json());

// 注册
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.send("用户名已存在");
  }
  users.push({ username, password });
  res.send("注册成功");
});

// 登录
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send("登录成功");
  } else {
    res.send("用户名或密码错误");
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
