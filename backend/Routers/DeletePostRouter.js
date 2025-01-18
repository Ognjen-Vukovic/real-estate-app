const { Router } = require("express");
const admin = require("firebase-admin");

const router = Router();

router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Post ID is required");
    }

    const postRef = admin.firestore().collection("posts").doc(id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return res.status(404).send("Post not found");
    }

    await postRef.delete();

    res.status(200).send("Post successfully deleted");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
