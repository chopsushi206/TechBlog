const User = require("./User");
const Post = require("./Post");

User.hasMany(posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Pokemon.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Pokemon };
