const bcrypt = require('bcrypt');

module.exports.validatePassword = async (password, encryptedPassword) =>{

    let isValidPassword = await bcrypt.compare(password, encryptedPassword);
    return isValidPassword;
}