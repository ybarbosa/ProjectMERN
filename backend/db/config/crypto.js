const bcrypt = require('bcryptjs');

const hash = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    }
    catch (err) {
        return err
    }
}


module.exports = hash