var path = require('path');
var express = require('express');
var formidable = require('formidable')
var fs = require('fs')

var router = express();

router.use(express.static(path.resolve(__dirname, 'fileMetadata')));

router.post('/formAction', function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files){
        if (err) throw err
        var path = files['file']['path']
        fs.unlink(path, function(err) {
            if (err) throw err
            console.log('File',path,'deleted')
        })
        var result = {
            firstName: fields['fname'],
            lastName: fields['lname'],
            size: files['file']['size']
        }
        res.end(JSON.stringify(result))
    })
})

router.listen(process.env.PORT || 3000);
