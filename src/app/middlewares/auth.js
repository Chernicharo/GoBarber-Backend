import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // get the token
  const authHeader = req.headers.authorization;

  // simple erro if token is missing
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not Provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // uses promisify to make a promise from jwt.verify old callback function
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
