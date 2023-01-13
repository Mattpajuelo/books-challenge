module.exports = (req,res,next) => {
    if (req.cookies.session) {
        req.session.sessionuser = req.cookies.session
    }
    next()
}