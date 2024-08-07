const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

const create = catchError(async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).json(user);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id)
  return res.json(user)
});

const destroy = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.destroy({ where: { id } });
  if (!user) return res.status(404).json(`User ${id} not found 🤔`);

  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json(`User ${id} not found 🤔`);

  const updatedUser = await user.update(req.body);
  return res.status(200).json(updatedUser);
});

module.exports = {
  getAll,
  create,
  getOne,
  destroy,
  update
}