const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')

router.route('/category')
    .post(categoryCtrl.createCategory)

module.exports = router