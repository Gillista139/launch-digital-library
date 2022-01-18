const Model = require('./Model')

class Book extends Model {
  static get tableName() {
    return 'books'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'author', 'pageCount'],
      properties: {
        title: {type: 'string', minLength: 1, maxLength: 255},
        author: {type: 'string', minLength: 1, maxLength: 255},
        pageCount: {type: 'integer', minimum: 1, maximum: 100000},
        description: {type: 'string', minLength: 20, maxLength: 255},
        fiction: {type: 'boolean'}
      }
    }
  }

}

module.exports = Book