const MODELS = require('../../models')
const { MESSAGES, CODES } = require('../../constants')
const universal = require('../../utils')
module.exports = {
    createUrl: async (req, res, next) => {
        try {
            req.body.shortUrl = await universal.hashUsingBcrypt(req.body.url)
            await MODELS.Utm(req.body).save();
            return await universal.response(res, CODES.OK, MESSAGES.URL_HASHED_SUCCESSFULLY, { shortUrl: req.body.shortUrl }, req.lang);
        } catch (error) {
            next(error);
        }
    },
    getUrl: async (req, res, next) => {
        try {
            let data = await MODELS.Utm.findOne({ shortUrl: req.query.code }).lean()
            if (data) return await res.redirect(data.url);
            return await universal.response(res, CODES.BAD_REQUEST, MESSAGES.INVALID_CODE, { }, req.lang);
        } catch (error) {
            next(error);
        }
    },
}

