const bcrypt = require('bcryptjs');


const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password);
  const buff = Buffer.from(hashedPassword, 'utf-8');
  return buff.toString('base64');
}

const checkPassword = (password, base64hash) => {
  const buff = Buffer.from(base64hash, 'base64');
  const hash = buff.toString('utf-8');
  return bcrypt.compareSync(password, hash);
}

exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
