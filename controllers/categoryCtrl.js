const Category = require('../models/categoryModel')
const categoryCtrl = {
    createCategory: async (req, res) => {
        try {
            const {category_id, status, images} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const category = await Category.findOne({category_id})

            if(category)
            return res.status(400).json({msg: "This category already exists."})

            const newCategory = new Category({
                category_id,
                status,
                images
            })
            await newCategory.save()
            res.json({msg: "Created."})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl