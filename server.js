
const express = require('express')
const path = require('path')
const app = express()
const PDFMerger = require('pdf-merger-js');
var mer2 = new PDFMerger();

// const fs = require('fs')
// const { promisify } = require('util')

// const unlinkAsync = promisify(fs.unlink)


const multer  = require('multer')
const {mergePdfs}  = require('./merge')


const upload = multer({ dest: 'uploads/' })
app.use('/static',express.static('public')) 
app.use(express.static(path.join(__dirname,'public'))) 
const PORT = 3000 || process.env.PORT


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})



app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
  console.log(req.files)
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
  
})


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
