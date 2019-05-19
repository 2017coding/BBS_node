// import * as socketio from 'socket.io'

export default class SocketServer {
  constructor(io) {
    io.on('connection', socket => {
      console.log(socket)
    })
  }
}
