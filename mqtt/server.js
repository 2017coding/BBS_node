import mosca from 'mosca'

function mqttServer() {
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
  server.on("clientConnected", (client) => {
    console.log("client connected",client.id)
  })
}

export default mqttServer
