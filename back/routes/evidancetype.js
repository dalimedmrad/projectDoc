const express = require("express");
const router = express.Router();
const EvidanceType = require("../models/EvidanceType");

router.post("/", async (req, res) => {
  const { name, EvidanceId } = req.body;
  try {
    const newEvidanceType = new EvidanceType({ name, EvidanceId });
    newEvidanceType.save();

    res.status(200).send({
      msg: "EvidanceType is saved",
      EvidanceType: newEvidanceType,
    });
  } catch (error) {
    res.status(500).send("can not save");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await EvidanceType.find();
    res.send({ response: result, message: "Geting EvidanceTypes successful" });
  } catch (error) {
    res.status(400).send({ message: "Can not get EvidanceTypes" });
  }
});

module.exports = router;
