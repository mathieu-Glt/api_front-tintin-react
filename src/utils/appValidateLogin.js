const isEmail = require("validator/lib/isEmail").default;
const isStrongPassword = require("validator/lib/isStrongPassword").default;


 
function validateLogin(fields) {


    const { email, password } = fields
    const errors = {};
    Object.keys(fields).forEach(key => errors[key] = '')
    let success = true;

    if (email.length === 0) {
        errors.email = 'Ce champ ne doit pas être vide';
        success = false;

    } else if (!isEmail(email)) {
        errors.email = 'Ce type de format  n\'est pas accepté';
        success = false;

    }

    if (password.length === 0) {
        errors.password = 'Ce champ ne doit pas être vide';
        success = false;

    } else if (!isStrongPassword(password)) {
        errors.password = 'Ce type de format  n\'est pas accepté';
        success = false;
    }

    return { success, errors };

}
module.exports = { validateLogin }