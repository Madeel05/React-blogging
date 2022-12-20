const jwt = require('jsonwebtoken');

const verificationToken = (req, res, next) => {
    const authTokenHeader = req.headers.token;
    if (authTokenHeader) {
        const token = authTokenHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Your Token is not valid!");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

const verificationTokenAndAuthorization = (req, res, next) => {
    verificationToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json("You are not alowed to update!");
        }
    });
}


module.exports = { verificationToken, verificationTokenAndAuthorization};
