var multer  = require('multer')
var request = require('request')
var conf = require('../config/conf')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './videos_mp4')
  },
  filename: function (req, file, cb) {
    cb(null, req.file_name)
  }
})

// Verify file before accepting

var upload = multer({ storage: storage }).single('video')

module.exports = function(req,res){
	console.log("Upload initiating")
	upload(req,res, function(err){
		if(err){
			res.status(500).end()
		}
		else if (req.file){
			var file_name = req.file_name
			console.log(file_name + ' yolo')
			var options = {
				method: 'GET',
				url: conf.apiUrl,
				headers:{
					'serverToken': conf.serverToken,
					'vid':file_name
				},
				json: true
			}
			request(options,function(err,response,body){
				if(!err&&response.statusCode==200){
					res.status(200).json({
						success: true
					})
				}else{
					res.status(500).end()
				}
			})
		}else{
			res.status(400).end()
		}
	})
}