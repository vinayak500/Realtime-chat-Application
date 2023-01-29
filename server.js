const express = require('express');
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

http.listen(PORT , () => {
    console.log(`listening on port ${PORT}`)
})


app.get('/', (req ,res) => {
    // res.send('Hello World')
    res.sendFile(__dirname + '/index.html')
})

//pass the server into the function , here server is http
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    //listen to the event (here the event is message and inside msg is a message object  )
    socket.on('message', (msg) => {

        // now send the message object to all the clients except the one which sent it 
         socket.broadcast.emit('message', msg)
      //  console.log(msg)
    })

})
