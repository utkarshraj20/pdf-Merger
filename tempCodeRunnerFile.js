erge')

const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))