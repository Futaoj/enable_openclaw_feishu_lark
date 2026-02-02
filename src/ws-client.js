/**
 * 飞书长连接客户端
 * 使用 WebSocket 与飞书开放平台建立长连接，接收事件推送
 */

import * as Lark from '@larksuiteoapi/node-sdk';

// 应用凭证配置
const baseConfig = {
    appId: 'cli_a9f63a5b6d3adbc7',
    appSecret: 'bPAPjlq56b7H5GsD7bDOme2ObjV8NBAD'
};

// 创建 API Client（用于调用 API）
const client = new Lark.Client(baseConfig);

// 创建 WebSocket 长连接客户端
const wsClient = new Lark.WSClient({
    ...baseConfig,
    loggerLevel: Lark.LoggerLevel.debug  // 设置日志级别为 debug，方便调试
});

console.log('正在启动飞书长连接客户端...');
console.log(`App ID: ${baseConfig.appId}`);

// 启动长连接
wsClient.start({
    // 注册事件处理器
    eventDispatcher: new Lark.EventDispatcher({}).register({
        // 处理「接收消息」事件 (im.message.receive_v1)
        'im.message.receive_v1': async (data) => {
            console.log('========== 收到新消息 ==========');
            console.log('事件数据:', JSON.stringify(data, null, 2));

            const {
                message: { chat_id, content, message_id, message_type }
            } = data;

            console.log(`Chat ID: ${chat_id}`);
            console.log(`Message ID: ${message_id}`);
            console.log(`Message Type: ${message_type}`);
            console.log(`Content: ${content}`);

            // 如果是文本消息，可以进行自动回复
            if (message_type === 'text') {
                try {
                    const textContent = JSON.parse(content);
                    console.log(`收到文本消息: ${textContent.text}`);

                    // 发送回复消息
                    const response = await client.im.v1.message.create({
                        params: {
                            receive_id_type: 'chat_id'
                        },
                        data: {
                            receive_id: chat_id,
                            content: JSON.stringify({
                                text: `收到您的消息: "${textContent.text}"`
                            }),
                            msg_type: 'text'
                        }
                    });

                    console.log('回复发送成功:', response);
                } catch (error) {
                    console.error('处理消息或发送回复时出错:', error);
                }
            }

            console.log('================================');
        },

        // 可以添加更多事件处理器，例如：
        // 'im.chat.member.user.added_v1': async (data) => {
        //   console.log('有新成员加入群聊:', data);
        // }
    })
});

console.log('长连接客户端已启动，等待事件...');
console.log('提示: 在飞书开发者后台 > 事件与回调 > 事件配置 中选择「使用长连接接收事件」');
