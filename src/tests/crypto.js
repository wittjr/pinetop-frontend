const crypto = require('../utils/crypto');

const pass = 'MyTestPassword';

const hashedPassword = crypto.hashPassword(pass);
const compare = crypto.checkPassword(pass, hashedPassword);
