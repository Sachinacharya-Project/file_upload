//Server generated
const express = require('express');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(upload())

app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.post('/upload', (req, res)=>{
    // console.log(req.files.file[0])
    if(req.files){
        const fileArray = req.files.file;
        if(fileArray.length > 0){
            for(let i=0;i<fileArray.length;i++){
                fileArray[i].mv(`${__dirname}/uploads/${fileArray[i].name}`, function(err){
                    if(!err){
                        res.sendFile(`${__dirname}/views/index.html`)
                    }
                })
            }
        }else{
            fileArray.mv(`${__dirname}/uploads/${fileArray.name}`, function(err){
                if(!err){
                    res.sendFile(`${__dirname}/views/index.html`)
                }
            })
        }

    }
    res.sendFile(`${__dirname}/views/index.html`)
});

const Port = process.env.PORT || 3000;
app.listen(Port, (err) => {
    if (err) {
       console.log(err)
   } else {
       console.log(`Server Listening at http://localhost:${Port}`);
    }
});
