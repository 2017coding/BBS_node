import mqtt from 'mqtt'
import mosca from 'mosca'

const settings = {
  port: 1883,
  http: {
    port: 1212,
    bundle: true,
    static: './'
  },
  backend: {}
};
const server = new mosca.Server(settings)


//监听链接
server.on("clientConnected",function(client) {
  console.log("client connected",client.id)
})

// // const localhost = 'mqtt://www.faradems.com:8083/mqtt'
// // const username = 'mqtt01'
// // const password = 'frd!@#$%12345'
// // const topic = '/prj/point/1/1/#'
// const localhost = 'mqtt://120.78.178.195:1883'
// const username = 'zwrt_device'
// const password = 'zwrtDevice123'
// const topic = 'uooz/server/yun/callback/1'
// const client = mqtt.connect(localhost, {username, password})
// const client1 = mqtt.connect('mqtt://www.lyh.red:1883') // 客户端1，用来做转发
// // 连接
// client.on('connect', function () {
//   console.log('连接' + new Date())
//   client.subscribe(topic, function (err) {
//     if (!err) {
//       console.log(err)
//     }
//     console.log('订阅成功:' + topic)
//   })
// })
// // 连接
// client1.on('connect', function () {
//   console.log('连接' + new Date())
//   client1.subscribe(topic, function (err) {
//     if (!err) {
//       console.log(err)
//     }
//     console.log('订阅成功:' + topic)
//   })
// })
// // 获取到消息
// client.on('message', function (topic, message) {
//   // message is Buffer
//   // 将数据转发到当前mqtt服务
//   client1.publish(topic, message.toString())
// })
// client.on('close', function () {
//   console.log('close重新连接' + new Date())
// })