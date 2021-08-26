const User = require("../models/User.model");
const Book = require("../models/Book.model");

module.exports.usersController = {
  createUsers: async (req, res) => {
    const { name, isBlocked } = req.body;
    try {
      await User.create({
        name,
        isBlocked,
      });
      res.json("Пользователь успешно добавлен");
    } catch (e) {
      res.json(e.message);
    }
  },
  rentBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId).lean();
      const user = await User.findByIdAndUpdate(req.params.userId).lean();

      if (book.rented) {
        res.json("Книга уже арендована");
      }

     else if (user.isBlocked) {
        res.json("Вы заблокированы");
      }
      else if (user.rentBook.length > 2) {
        res.json("Нельзя арендовать больше 3-х книг одновременно");
      } else {
       const arr = await User.findByIdAndUpdate(req.params.userId, {
          $push: {
            rentBook: req.params.bookId,
          },
        }).lean();
        await Book.findByIdAndUpdate(req.params.bookId, {
          rented: req.params.bookId,
        });
        res.json("Книга успешно арендована")
        //res.redirect(`/users/${req.params.userId}/books`);
      }


    } catch (e) {
      res.json(e.message);
    }
  },
  returnBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);
      const user = await User.findByIdAndUpdate(req.params.userId);

      await Book.findByIdAndUpdate(req.params.bookId, {
        rented: null,
      });
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          rentBook: req.params.bookId,
        },
      });
      res.redirect(`/users/${req.params.userId}`)
    } catch (e) {
      res.json(e.message);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.find({}).lean()
      res.json(user)
      res.render("user", {
        user,
      })
    } catch (e) {
      res.json(e.message)
    }
  },

  getProfile: async (req, res) => {
    try {
      const profile = await User.findById(req.params.userId).populate('rentBook').lean()
      res.json(profile)
      res.render("profiles", {
        profile
      })

    } catch (e) {
      res.json(e.message)
    }
  },
  getUserByAdmin: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('rentBook').lean()
      const users = await User.find({}).lean()
      res.json(user, users)
      res.render("admin", {
        user,
        users
      })
     // console.log(user)
    } catch (e) {
      res.json(e.message)
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('rentBook').lean()
      res.json(user)
      res.render("admin-profile", {
        user,
      })
      // console.log(user)
    } catch (e) {
      res.json(e.message)
    }
  },

};
