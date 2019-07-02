const express=require('express');
const pool=require('../pool.js')
var router=express.Router();
//1.商品列表
router.get('/list',function(req,res){
	var obj=req.query;
	console.log(obj);
	var count=parseInt(obj.count);
	var pno=parseInt(obj.pno);
	var start=(pno-1)*count;
	pool.query('SELECT lid,title,price,sold_count,is_onsale FROM xz_laptop LIMIT ?,?',[start,count],function(err,result)
		{
			if(err)  throw err;
			res.send(result);
		});
});
//2.商品详情
router.get('/detail',function(req,res){
	var obj=req.query;
	if(!obj.lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	pool.query('SELECT * FROM xz_laptop WHERE lid=?',[obj.lid],
		function(err,result){
			if(err) throw err;
			res.send(result);
		})
});
//3.商品删除
router.get('/delete',function(req,res){
	var obj=req.query;
	if(!obj.lid){
		res.send({code:401,msg:'lid required'});
		return;
	}
	pool.query('DELETE FROM xz_laptop WHERE lid=?',[obj.lid],
		function(err,result){
			res.send({code:200,msg:"del suc"});
		});
})
//4.商品添加
router.post('/add',function(req,res){
	var obj=req.body;	
	var i=400;
	for(var key in obj){
		if(!obj[key]){
			i++;
			res.send({code:i,msg:key+" required"});
			return;
		}
	}
	console.log(obj);
	pool.query('INSERT INTO xz_laptop SET?',[obj],
		function(err,result){
			if(err) throw err;
			console.log(result);
			res.send({code:200,msg:'add suc'});
		});
});
module.exports=router;