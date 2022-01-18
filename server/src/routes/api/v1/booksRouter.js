import express from "express"
import objection from 'objection'
const { ValidationError } = objection

import { Book } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const booksRouter = new express.Router()

booksRouter.get("/:id", async (req, res) => {
  const bookIndex = req.params.id
  // debugger
  try {
    const book = await Book.query().findById(bookIndex)
    // debugger
    return res.status(200).json({ book: book })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

booksRouter.get("/", async (req, res) => {
  // your code here
  try {
    const books = await Book.query()
    debugger
    return res.status(200).json({ books: books })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

booksRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  // debugger
  try {
    const newBook = await Book.query().insertAndFetch(formInput)
    return res.status(201).json({ book: newBook })
  } catch(error) {
    if (error instanceof ValidationError) {
      debugger
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default booksRouter