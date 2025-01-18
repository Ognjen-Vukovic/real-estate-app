const { Router } = require("express");
const admin = require("firebase-admin");

const router = Router();

router.get("/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const postSnapshot = await admin.firestore().collection("posts").doc(id).get();
  
      if (!postSnapshot.exists) {
        return res.status(404).send("Post not found");
      }
  
      const postData = {
        id: postSnapshot.id,
        ...postSnapshot.data(),
      };
  
      res.status(200).json(postData);
    } catch (error) {
      console.error(error);
    }
  });
  

module.exports = router;
