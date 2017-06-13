var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profilepic_raw')
  },
  filename: function (req, file, cb) {
    cb(null, req.file_name)
  }
})

var upload = multer({ storage: storage }).single('profilepic')

// Verify file before accepting
module.exports = function(req,res){
	console.log("Upload initiating")
	upload(req,res, function(err){
		if(err){
			res.status(500).end()
		}
		else if (req.file){
			res.status(200).end()
		}else{
			res.status(400).end()
		}
	})
}