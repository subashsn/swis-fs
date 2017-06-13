var express = require('express');
var jwt = require('json-web-token')
var videoUploader = require('../core/videoUploader.js')
var profilepicUploader = require('../core/profilepicUploader.js')
var jwtSecret = require('../config/jwtSecret.js')

var router = express.Router();

var authcheck = function(req,res,next){
	if(req.headers['uploadtoken']){
		console.log(req.originalUrl)
		jwt.decode(jwtSecret, req.headers['uploadtoken'], function(err,uploadjson){
			if(err){
				res.status(401).end()
			}else{
				if(uploadjson.expiry>=Date.now()&&(req.originalUrl==uploadjson.url)){
					req.file_name = uploadjson.file_name
					next()
				}
				else{
					res.status(401).end()
				}
			}
		})
	}else{
		res.status(401).end()
	}
}

router.post('/video',authcheck,videoUploader)
router.post('/profilepic',authcheck,profilepicUploader)

module.exports = router;