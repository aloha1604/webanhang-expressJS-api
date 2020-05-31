const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/Auth.Middleware");
const AuthController = require("../controller/Auth.controller");
const FriendController = require("../controller/FriendController")

// router.post("/login", AuthController.login);
// router.post("/refresh-token", AuthController.refreshToken);

router.post("/admindangnhap", AuthController.loginAdmin);
router.post("/refresh-token-admin", AuthController.refreshTokenAdmin);

// Sử dụng authMiddleware.isAuth trước những api cần xác thực
router.use(AuthMiddleWare.isAuth);
// List Protect APIs:
router.get("/friends", FriendController.friendLists);
// router.get("/example-protect-api", ExampleController.someAction);


module.exports = router;