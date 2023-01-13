module.exports = (req,res,next) => {
    if (req.session.sessionuser) {
        res.locals.userLogin = req.session.sessionuser
    }
    next()
}