# Enable OpenClaw Feishu Lark

本项目能够激活飞书的长连接功能，通过 WebSocket 与飞书开放平台建立持久连接，实时接收事件消息。

## 功能特点

- 🚀 **快速接入** - 5分钟即可完成配置
- 🔒 **安全传输** - 内置加密和鉴权，无需额外配置
- 📡 **实时通信** - 基于 WebSocket 的全双工通道
- 🔧 **简单易用** - 无需公网IP或域名，本地环境即可运行

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置应用凭证

编辑 `src/ws-client.js`，填入你的应用凭证：

```javascript
const baseConfig = {
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET'
};
```

### 3. 启动长连接客户端

```bash
npm run ws
```

### 4. 配置飞书开发者后台

1. 登录 [飞书开发者后台](https://open.feishu.cn/app)
2. 进入应用 → **事件与回调** → **事件配置**
3. 订阅方式选择：**使用长连接接收事件**
4. 添加事件订阅（如 `im.message.receive_v1`）

## 项目结构

```
├── src/
│   └── ws-client.js    # 长连接客户端主程序
├── package.json
└── README.md
```

## 注意事项

- 仅支持企业自建应用
- 收到消息后需在 3 秒内处理完成
- 每个应用最多建立 50 个连接
- 多客户端部署时，只有随机一个客户端会收到消息

## 许可证

MIT
