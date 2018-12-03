const express = require('express');

const app = express();

app.post('/login',(req,res)=>{
  res.json({
    code:1
  })
});

app.post('/signup',(req,res)=>{
  res.json({
    code:1
  })
});


app.listen(9093,function(){
  console.log('Node app start at port 9093')
});
