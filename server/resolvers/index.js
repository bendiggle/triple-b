const resolvers = {
  Query: {
    async user (root, { id }, { models }) {
      return models.Users.findByPk(id)
    },
    async allUsers (root, args, { models }) {
      return models.Users.findAll()
    },
    async allSelections (root, args, { models }) {
      return models.Selections.findAll()
    },
    async selection (root, { id }, { models }) {
      return models.Selections.findById(id)
    }
  },
  Mutation: {
    async createUser (root, { name, email, password }, { models }) {
      return models.Users.create({ name })
    },
    async createSelection (root, { userId, selectionDate, totalSelections, winningSelections, totalBets, winningBets, selectionCostWin }, { models }) {
      return models.Selections.create({ userId, selectionDate, totalSelections, winningSelections, totalBets, winningBets, selectionCostWin })
    }
  },
  User: {
    async selection (user) {
      return user.getSelection()
    }
  },
  Selection: {
    async user (selection) {
      return selection.getUser()
    }
  }
};

module.exports = resolvers