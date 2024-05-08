const Router = require("express");
const wrapAsync = require('../middleware/WrapAsync');
const DatabaseImport = require("../controllers/DatabaseImport");

const router = new Router();

router.get("/dataset", DatabaseImport.importDatabase);


module.exports = router;
