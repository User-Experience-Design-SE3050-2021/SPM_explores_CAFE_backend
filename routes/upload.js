const router = require ('express').Router()
const cloudinary = require ('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', (req, res) => {
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send({msg : 'No Files were uploaded.'})

        const file = req.files.file;
        if(file.size > 1024*1024) return res.status(400)

        res.json('Test Upload')
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

module.exports = router 