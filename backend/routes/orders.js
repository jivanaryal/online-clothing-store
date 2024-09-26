const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

router.post('/', orderController.createOrder);
router.get('/all', orderController.getAllOrderDetails);
router.get('/:orderId', orderController.getOrderDetails);
router.get('/single/:customerId', orderController.getOrderDetailsByCustomer);

router.patch('/update/:id', orderController.updateOrderStatus);



module.exports = router;
