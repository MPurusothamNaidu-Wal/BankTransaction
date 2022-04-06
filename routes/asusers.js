const express = require('express');
const router = express.Router();
var userController = require('../controllers/asusers');
var balanceController = require('../controllers/balance');
const User = require('../models').AsUser;
const Balance = require('../models').Balance;
const TransactionModel = require('../models').Transaction;
const { sequelize } = require('../models');
router.get('/', (req, res) => {
    User.findAll().then(
        (users) => {
            res.json(users);
        },
        (error) => {
            res.json(error);
        }
    );
});
router.post('/', userController.create);
router.get('/balances', (req, res) => {
    Balance.findAll({ include: User }).then(
        (balances) => {
            res.json(balances);
        },
        (error) => {
            res.json(error);
        }
    );
});
router.post('/balances', balanceController.create);

router.post("/transaction", async (req, res) => {
    const { from, to, transaction_amount } = req.body;
    let transaction;
    try {
        transaction = await sequelize.transaction();
        const fromUser = await Balance.findOne({ where: { userId: from } });
        const toUser = await Balance.findOne({ where: { userId: to } });
        await Balance.update(
            { balance: fromUser.balance - parseFloat(transaction_amount) },
            {
                where: {
                    userId: from,
                },
            },
            { transaction }
        );
        await Balance.update(
            { balance: toUser.balance + parseFloat(transaction_amount) },
            {
                where: {
                    userId: to,
                },
            },
            { transaction }
        );
        TransactionModel.create({
            transaction_date: new Date().toISOString(),
            transaction_amount,
            userId: req.body.from,
        });
        await transaction.commit();
        res.json({ status: 1, msg: "transaction is success" });
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        res.json({ status: 0, error });
    }
});
module.exports = router;