const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    res.json(
      await new Sub({
        name,
        slug: slugify(name),
      }).save()
    );
  } catch (error) {
    res.status(400).send("Create sub-category failed!");
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  res.json(await Sub.findOne({ slug: req.params.slug }).exec());
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("sub-category update failed!");
  }
};
exports.remove = async (req, res) => {
  try {
    const deletedSubCategory = await Sub.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedSubCategory);
  } catch (error) {
    res.status(400).send("Failed to delete sub-category");
  }
};
