
const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdfs}  = require('./merge')

const upload = multer({ dest: 'uploads/' })
app.use('/static',express.static('public'))
const PORT = 3000 || process.env.PORT

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

 

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
  console.log(req.files)
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect("http://google.com")
})


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})