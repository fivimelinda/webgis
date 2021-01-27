module.exports = (app) => {
  const controller = require("../controller/index.js");

  var router = require("express").Router();

  router.get("/point", controller.findAllPoint);
  router.get("/polygon", controller.findAllPolygon);
  router.get("/line", controller.findAllLine);

  router.post("/", controller.create);

  router.put("/:id", controller.update);

  router.delete("/point/:id", controller.deletePoint);
  router.delete("/line/:id", controller.deleteLine);
  router.delete("/polygon/:id", controller.deletePolygon);

  app.use("/api", router);
};
