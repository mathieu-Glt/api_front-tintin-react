const { default: isStrongPassword } = require("validator/lib/isStrongPassword");

const isEmail = require("validator/lib/isEmail").default;
const isAlpha = require("validator/lib/isAlpha").default;


function validateRegister(fields) {


    const { firstname, lastname, email, password } = fields
    const errors = {};
    Object.keys(fields).forEach(key => errors[key] = '')
    let success = true;


    if (firstname.length === 0) {
        errors.firstName = 'Ce champ ne doit pas être vide';
        success = false;

    } else if (!isAlpha(firstname, 'fr-FR', { ignore: ' -' })) {
        errors.firstName = 'Ce type de format  n\'est pas accepté';
        success = false;

    }



    if (lastname.length === 0) {
        errors.lastName = 'Ce champ ne doit pas être vide';
        success = false;

    } else if (!isAlpha(lastname, 'fr-FR', { ignore: ' -' })) {
        errors.lastName = 'Ce type de format  n\'est pas accepté';
        success = false;

    }

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
module.exports = { validateRegister }