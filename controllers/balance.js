const Balance = require('../models').Balance;
module.exports = {
    create(req, res) {
        return Balance.create({
            userId: req.body.userId,
            balance: req.body.balance,
        })
            .then((balance) => res.status(201).send(balance))
            .catch((error) => res.status(400).send(error));
    },
};