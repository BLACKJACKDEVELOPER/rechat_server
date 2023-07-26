const app = require('./middleware')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  maxHttpBufferSize: 1e8,
  cors: {
    origin: "http://192.168.0.211:3000"
  }
});

require('dotenv').config()
const PORT = process.env.PORT || 4040
const JWT = require('jsonwebtoken')
const db = require('./db.js')
const fs = require('fs')

// external routes
const register = require('./routes/register')
const login = require('./routes/login')
const auth = require('./routes/auth')
const createRoom = require('./routes/createRoom')
const user = require('./routes/user')
const rooms = require('./routes/rooms')
const msgs = require('./routes/msg')


// mapping router
app.post('/register',register.post)
app.post('/login',login.post)
app.post('/auth',auth.post)
app.post('/createRoom',createRoom.post)
app.post('/user',user.post)
app.get('/rooms',rooms.get)
app.get('/msgs',msgs.get)


io.on('connection', (socket) => {
  console.log('a user connected SOCKET ID : '+socket.id);
  socket.on('joinRoom',async (data)=> {
  	// Notify to Room
  	console.log(data)
  	const user = await db('SELECT * FROM users WHERE id=?;',[data.uid])
  	io.emit('newUserRoom'+data.id,user)
  })

  // new Msg
  socket.on('sendMsg',async (data)=> {
  	console.log(data)
  	const user = await db('SELECT * FROM users WHERE id=?;',[data.uid])
  	if (data.type == 'text') {
  		await db('INSERT INTO msgs(user_id,msg,room,type) VALUES (?,?,?,?);',
  		[data.uid,data.msg,data.id,data.type]);
  		io.emit('msg'+data.id,{ msg:data.msg ,type:data.type, user })
  	}else if (data.type == 'image') {
  		const name = Math.floor(Math.random() * 1000000)
  		await fs.writeFileSync(__dirname+'/public/images/'+name+'.jpg',data.msg,{ encoding:"base64" })
  		data.msg = name+'.jpg'
  		await db('INSERT INTO msgs(user_id,msg,room,type) VALUES (?,?,?,?);',
  		[data.uid,data.msg,data.id,data.type]);
  		io.emit('msg'+data.id,{ msg:data.msg , type:data.type , user })
  	}else if (data.type == 'video') {

  		const name = Math.floor(Math.random() * 1000000)
  		await fs.writeFileSync(__dirname+'/public/videos/'+name+'.mp4',data.msg,{ encoding:"base64" })
  		data.msg = name+'.mp4'
  		await db('INSERT INTO msgs(user_id,msg,room,type) VALUES (?,?,?,?);',
  		[data.uid,data.msg,data.id,data.type]);
  		io.emit('msg'+data.id,{ msg:data.msg , type:data.type , user })
  	}
  })
});

server.listen(PORT,()=> {
    console.log('SERVER START AT PORT '+PORT)
})