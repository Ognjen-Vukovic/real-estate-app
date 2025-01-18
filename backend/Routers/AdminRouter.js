const { Router } = require("express");
const adminMiddleware = require("../adminMiddleware");
const admin = require("firebase-admin");

const router = Router();

router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const usersSnapshot = await admin.firestore().collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/posts", adminMiddleware, async (req, res) => {
  try {
    const postsSnapshot = await admin.firestore().collection("posts").get();
    const posts = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

router.delete("/users/:userId", adminMiddleware, async (req, res) => {
  const { userId } = req.params;
  console.log("Deleting user with ID:", userId);
  try {
    await admin.firestore().collection("users").doc(userId).delete();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});


router.delete("/posts/:postId", adminMiddleware, async (req, res) => {
  const { postId } = req.params;
  try {
    await admin.firestore().collection("posts").doc(postId).delete();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;
