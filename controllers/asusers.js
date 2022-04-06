const AsUsers = require("../models").AsUsers;
module.exports = {
    create(req, res) {
        return AsUsers.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error))
    }
}