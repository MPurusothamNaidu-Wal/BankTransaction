var express = require('express');
var router = express.Router();
const companyController = require('../controllers').company;
const employeeController = require('../controllers/employee');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Company Table' });
});
router.post('/api/company', companyController.create);
router.get('/api/company', companyController.read);
router.post('/api/employee', employeeController.create);

module.exports = router;
