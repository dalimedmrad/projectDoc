const express = require("express");
const router = express.Router();
const Evidance = require("../models/Evidance");

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newEvidance = new Evidance({ name });
    newEvidance.save();

    res.status(200).send({
      msg: "Evidance is saved",
      Evidance: newEvidance,
    });
  } catch (error) {
    res.status(500).send("can not save");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Evidance.find();
    res.send({ response: result, message: "Geting Evidances successful" });
  } catch (error) {
    res.status(400).send({ message: "Can not get Evidances" });
  }
});

module.exports = router;
