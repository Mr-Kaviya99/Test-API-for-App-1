const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = (req, resp) => {

    bcrypt.hash(req.body.password, 18, function (err, hash) {
        const user = new UserSchema({
            email: req.body.email,
            password: hash,
            name: req.body.name
        });
        user.save().then(result => {

            const token = jwt.sign({
                email: req.body.email,
                name: req.body.name
            }, process.env.SECRET_KEY);

            resp.status(201).json({result: token, message: 'saved!'});

        }).catch(error => {
            resp.status(500).json({error: error, message: 'Internal Server Error!'})
        });
    });

}
const login = (req, resp) => {

    UserSchema.findOne({email: req.body.email}).then(existUser => {
        if (existUser != null) {
            bcrypt.compare(req.body.password, existUser.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: req.body.email,
                        name: existUser.name
                    }, process.env.SECRET_KEY);
                    resp.status(200).json({result: token});
                } else {
                    resp.status(401).json({message: 'UnAuthorized Attempt!'});
                }
            });
        } else {
            resp.status(404).json({message: 'User Not Found!'})
        }
    })
}

module.exports = {
    signUp, login
}