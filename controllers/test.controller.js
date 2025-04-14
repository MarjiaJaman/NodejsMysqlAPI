const models = require("../models");

async function test(req, res) {
  //One to One
  // const user = await models.User.findByPk(2, {
  //   include: [models.Address],
  // });
  // const address = await models.Address.findByPk(1, {
  //   include: [models.User],
  // });

  //One to Many
  // const user = await models.User.findByPk(1, {
  //   include: [models.Post],
  // });
  // const post = await models.Post.findByPk(1, {
  //   include: [models.User],
  // });

  //Many to Many
  const post = await models.Post.findByPk(1, {
    include: [models.Category],
  });
  const category = await models.Category.findByPk(1, {
    include: [models.Post],
  });

  res.status(200).json({
    data: category,
  });
}

module.exports = {
  test: test,
};
