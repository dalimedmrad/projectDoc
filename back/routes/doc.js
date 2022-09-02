const express = require("express");
const router = express.Router();
const Doc = require("../models/Doc");

router.post("/", async (req, res) => {
  const { file, text } = req.body;
  console.log(req.body);
  try {
    const newDoc = new Doc({ file, text });
    newDoc.save();

    res.status(200).send({
      msg: "Doc is saved",
      Doc: newDoc,
    }); 
  } catch (error) {
    res.status(500).send("can not save");
    console.log(error);
  }   
});

router.get("/", async (req, res) => {
  try {
    const result = await Doc.find();
    res.send({ response: result, message: "Geting Docs successful" });
  } catch (error) {
    res.status(400).send({ message: "Can not get Docs" });
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Doc.findByIdAndDelete({ _id: req.params.id });
    res.send("Doc deleted");
  } catch (error) {
    res.send({ msg: "cannot delete the Doc" });
  }
});

router.put("/:id", async (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);
  try {
    const result = await Doc.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).send({
      result: result,
      msg: `Votre modification a été sauvgardé`,
    });
  } catch (error) {
    res.status(400).send({ msg: "Un erreur est produit réessayer plus tard" });
  }
});

module.exports = router;
