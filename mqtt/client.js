import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://127.0.0.1:1883') // 客户端，用来做转发

// 连接
client.on('connect', () => {
  console.log('连接' + new Date())
})

client.on('close', () => {
  console.log('close重新连接' + new Date())
})

// 将数据转发到当前mqtt服务
// client.publish('/11123', '111111')

export default client
