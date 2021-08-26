const Genre = require("../models/Genre.model");

module.exports.genresController = {
  createGenre: async (req, res) => {
    const { name } = req.body;
    try {
      await Genre.create({ name });
      res.json("Жанр добавлен успешно");
    } catch (e) {
      res.json(e.message);
    }
  },
  getGenre: async (req, res) => {
    try {
      const genres = await Genre.find({}).lean();
      res.json(genres);
    } catch (e) {
      res.json(e.message);
    }
  },
  editGenre: async (req, res) => {
    const {name} = req.body;
    try {
     await Genre.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true}
      )
      res.json("Жанр успешно изменен")
    } catch (e) {
      res.json(e.message)
    }
  },
  removeGenre: async (req, res) => {
    try {
      await Genre.findByIdAndDelete(req.params.id)
      res.json("Жанр успешно удален")
    } catch (e) {
      res.json(e.message)
    }
  }
};
