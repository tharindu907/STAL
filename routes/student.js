const router = require('express').Router();
const controller = require('../userFunctions/student')

router.get('/', controller.getStudent);
router.post('/add', controller.addStudent);
router.get('/get/studentdetails/:id', controller.getStudent);
router.get('/get/malefemalecount', controller.countMaleandFemale);
router.get('/get/studentdetails', controller.getStudentDetails);

module.exports = router;