import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'roberto',
    email: 'email@mail.com',
    password_hash: '22222222',
  });
  return res.json(user);
});

export default routes;
