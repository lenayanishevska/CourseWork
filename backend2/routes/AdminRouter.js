const Router = require("express");
const adminController = require("../controllers/AdminController");
const authMiddleware = require("../middleware/AuthMiddleware");
const wrapAsync = require('../middleware/WrapAsync');

const router = new Router();

router.get("/monthInfo"/*, authMiddleware*/, wrapAsync(adminController.monthInfo));
router.get("/saleChart"/*, authMiddleware*/, wrapAsync(adminController.saleChart));
router.get("/orders"/*, authMiddleware*/, wrapAsync(adminController.orders));
router.get("/users"/*, authMiddleware*/, wrapAsync(adminController.users));
router.post("/updateOrder"/*, authMiddleware*/, wrapAsync(adminController.updateOrder));
router.get("/export"/*, authMiddleware*/, wrapAsync(adminController.getOrdersWithUsers));
router.get("/exportCSV"/*, authMiddleware*/, adminController.exportOrdersWithUsers);
router.get("/orderChart"/*, authMiddleware*/, wrapAsync(adminController.orderChart));
router.get("/brandChart"/*, authMiddleware*/, wrapAsync(adminController.brandChart));

module.exports = router;
