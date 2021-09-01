const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket: any) => {
  console.log(`socket_id: ${socket.id} is connected.`)

  socket.on('join', (roomId: string) => {
    socket.join(roomId)
    console.log(`socket_id: ${socket.id} joined in room ${roomId}`)
  })

  // send-msgイベントを受け取ったらブロードキャストする
  socket.on('send-msg', (msg: string, roomId: string) => {
    socket.to(roomId).emit('new-msg', msg)
    console.log(`receive message: ${JSON.stringify(msg)}`)
  })
})

server.listen(3001)
