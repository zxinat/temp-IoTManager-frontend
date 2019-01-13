const express=require('express');
const app=express();
// work with server
const server=require('http').Server(app);
const io=require('socket.io')(server);
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


//模拟数据
value=300

io.on('connection',(socket)=>{
  socket.on('open',function (data) {
    console.log('receive data');
    setInterval(()=>{
      socket.emit('updateData',{
        deviceID: 'TOO1',
        time:new Date().Format('hh:mm:ss'),
        value:Math.random()*800
      })
    },1000)
  })
});
// app.get('/',(req,res)=>{
//   res.json({1:1,2:3});
// });
server.listen(3000,function () {
  console.log('app start at 3000')
})
