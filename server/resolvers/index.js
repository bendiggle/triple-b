const resolvers = {
  Query: {
    async user (root, { id }, { models }) {
      return models.Users.findByPk(id);
    },
    async allUsers (root, args, { models }) {
      return models.Users.findAll();
    },
    async allSelections (root, args, { models }) {
      return models.Selections.findAll();
    },
    async selection (root, { id }, { models }) {
      return models.Selections.findById(id);
    },
    async selectionsByUser (root, { userId }, { models }) {
      return models.Selections.findAll({ where: { userId }})
    }
  },
  Mutation: {
    async createUser (root, { name, nickName }, { models }) {
      return models.Users.create({ name, nickName });
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