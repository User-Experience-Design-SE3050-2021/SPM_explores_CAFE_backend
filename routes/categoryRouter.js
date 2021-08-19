const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authManager = require('../middleware/authManager')

router.route('/category')
    .get(categoryCtrl.getCategory)
    .post(auth, authManager ,categoryCtrl.createCategory)

router.route('/category/:id')
    .delete(auth, authManager, categoryCtrl.deleteCategory)
    .put(auth, authManager, categoryCtrl.updateCategory)

module.exports = router