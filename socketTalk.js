//Testing For Socket Server
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', (req,res)=>{
  res.render('chat');
});
var count = 1;
io.on('connection',function(socket){
  //#1 : connection
  console.log('user connected : ', socket.id);
  var name  = "익명" + count++;
  socket.name = name;
  io.to(socket.id).emit('create name',name);
  console.log('created name : ', name);

  var welcome = name + ' 님이 입장했습니다.';
  io.emit('receive message', welcome);

  socket.on('disconnect', function(){
      //#2 : disconnection
      var name = socket.name;
      var msg = name+ ' 님이 나갔습니다.'
      console.log('user disconnected : '+socket.id+' '+socket.name);
      io.emit('receive message', msg);
  });
  socket.on('send message', function(name,text){
     //#3 : sending & receiving message
     if(text!=''){
          var msg = name+ ' : ' +text;
          socket.name = name;
          console.log(msg);
          io.emit('receive message', msg);
     }
     else{
         console.log('null is not printed');
     }
  });
});
http.listen(3000, function(){
  console.log('server is working ');
});
