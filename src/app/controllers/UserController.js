import User from '../models/User';

class UserController {
  async store(req, res) {
    // check for unique email
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // error return
    if (userExist) {
      return res.status(400).json({ error: 'user already exist' });
    }

    // user create with all req.body data
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        return res.status(400).json({ error: 'user already exist' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password does not match' });
    }
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
