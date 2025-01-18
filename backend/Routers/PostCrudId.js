const { Router } = require("express");
const admin = require("firebase-admin");

const router = Router();

router.get("/user-posts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const userDoc = await admin.firestore().collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }

    const postsRef = admin.firestore().collection("posts");
    const userPostsQuery = postsRef.where("userId", "==", userId);
    const querySnapshot = await userPostsQuery.get();

    if (querySnapshot.empty) {
      return res.status(404).send("No posts found for this user");
    }

    const userPosts = [];
    querySnapshot.forEach((doc) => {
      userPosts.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;
