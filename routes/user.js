const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//用户注册
router.post('/reg',function (req,res) {
	var obj=req.body;
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
		if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
		if(!obj.phone){
		res.send({code:403,msg:'phone required'});
		return;
	}
		if(!obj.email){
		res.send({code:404,msg:'email required'});
		return;
	}
	pool.query('INSERT INTO xz_user SET?',[obj],function(err,result){
		res.send({code:200,msg:'reg suc'});
	});
});
module.exports=router;