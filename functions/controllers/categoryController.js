const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { _id: 0, name: 1 });
    console.log(categories);
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    return res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required for adding a category' });
  }

  try {
    const category = new Category({ name });
    await category.save();
    return res.status(200).json({ message: 'Category added successfully' });
  } catch (error) {
    console.log(`Failed to add category: ${error}`);
    return res.status(500).json({ message: 'Failed to add category' });
  }
};
