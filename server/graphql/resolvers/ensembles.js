const Ensemble = require("../../models/Ensemble");
const Person = require("../../models/Student");
const { authMiddleware } = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getEnsembles(_, args, context) {
      const user = context.user;;
      try {
        const ensembles = await Ensemble.find({ userId: user.id }).sort({
          createdAt: -1,
        });
        return ensembles;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEnsemble(_, { ensembleId }) {
      try {
        const ensemble = await Ensemble.findById(ensembleId);
        if (ensemble) {
          return ensemble;
        } else {
          throw new Error("Ensemble not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addEnsemble(_, { name }, context) {
      const user = context.user;
      const newEnsemble = new Ensemble({
        name,
        userId: user._id,
        createdAt: new Date().toISOString(),
      });
      const ensemble = await newEnsemble.save();
      return ensemble;
    },
    async deleteEnsemble(_, { ensembleId }, context) {
      const ensemble = await Ensemble.findByIdAndDelete({ ensembleId });
      return ensemble;
    },
    async updateEnsemble(_, { ensembleId, name }, context) {
      try {
        const ensemble = await Ensemble.findOneAndUpdate(
          { _id: ensembleId },
          { $set: { name: name } },
          { new: true }
        );
        return ensemble;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
