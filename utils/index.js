const Messages = require('../constants').LANGS
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
module.exports = {
    /*
    Response Functions
    */
    response: async (res, status, message, data, lang) => {
        if (status != 200) {
            return await res.status(status).send({ status: status, message: await Messages[lang][message] });
        }
        return await res.status(status).send({ status: status, message: await Messages[lang][message], result: data });
    },
    getMillinseconds: (time) => {
        return (Math.abs((new Date().getTime() - time) / 1000)) * 1000;
    },
    /*
    Bcrypt Functions
    */
    hashUsingBcrypt: async (password) => { return bcrypt.hashSync(password, 10); },
    compareUsingBcrypt: async (pass, hash) => { return bcrypt.compareSync(pass, hash) },
    /*
    JWT Functions
    */
    jwtSign: async (payload) => {
        try {
            return jwt.sign(
                { _id: payload._id },
                config.get("JWT_OPTIONS").SECRET_KEY,
                {
                    expiresIn: config.get("JWT_OPTIONS").EXPIRES_IN
                }
            );
        } catch (error) {
            throw error;
        }
    },
    jwtVerify: async (token) => {
        try {
            return jwt.verify(token, config.get("JWT_OPTIONS").SECRET_KEY);
        } catch (error) {
            throw error;
        }
    },

}