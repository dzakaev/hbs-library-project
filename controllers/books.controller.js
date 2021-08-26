const Book = require("../models/Book.model");
const User = require("../models/User.model");
const Genres = require("../models/Genre.model")

module.exports.booksController = {
  createBook: async (req, res) => {
    const { name, genre, rented, img } = req.body;
    try {
      await Book.create({
        name,
        genre,
        rented,
        img,
      });
      res.json("Книга успешно добавлена");
    } catch (e) {
      res.json(e.message);
    }
  },
  getBooks: async (req, res) => {
    try {
      const book = await Book.find({}).lean();
      const genre = await Genres.find({}).lean();
      const userId = req.params.userId
      res.json(book, genre, userId)
      res.render("books", {
        book,
        genre,
        userId
      });
    } catch (e) {
      res.json(e.message);
    }
  },

  getBookById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      const genre = await Genres.find({}).lean()
      const userId = (req.params.userId)

      res.json(book, genre, userId)

      res.render("single-book", {
        book,
        genre,
        userId
      });
    } catch (e) {
      res.json(e.message);
    }
  },
  editBooks: async (req, res) => {
    const { name, genre, rented, img } = req.body;
    try {
      await Book.findByIdAndUpdate(
        req.params.id,
        { name, genre, rented, img },
        { new: true }
      );
      res.json("книга успешно изменена");
    } catch (e) {
      res.json(e.message);
    }
  },
  removeBooks: async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json("Книга успешно удалена");
    } catch (e) {
      res.json(e.message);
    }
  },
  getBooksByGenres: async (req, res) => {
    try {
      const book = await Book.find({ genre: req.params.id }).lean();
      const genre = await Genres.find({}).lean();
      const { userId } = req.params;
      res.json(book, genre, userId)
      res.render("books", {
        genre,
        book,
        userId
      });
    } catch (e) {
      res.json(e.message);
    }
  },
  takeBook: async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.bookId, {
        rented: null,
      });
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: { rentBook: req.params.bookId },
      });
      res.redirect(`/admin/users/${req.params.userId}`)
    } catch (e) {
      res.json(e.message);
    }
  },
  blockProfile: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId,{
        isBlocked: true,
      })
      res.redirect(`/admin/users/${req.params.userId}`)
    } catch (e) {
      res.json(e.message)
    }
  },
  unblockProfile: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId,{
        isBlocked: false,
      })
      res.redirect(`/admin/users/${req.params.userId}`)
    } catch (e) {
      res.json(e.message)
    }
  }
};
