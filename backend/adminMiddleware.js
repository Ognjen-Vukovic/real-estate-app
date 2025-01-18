const admin = require("firebase-admin");

const adminMiddleware = async (req, res, next) => {
  const userId = req.headers["user-id"]; 

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const userDoc = await admin.firestore().collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();

    if (userData.isAdmin) {
      next(); 
    } else {
      return res.status(403).json({ message: "Unauthorized: Admin access only" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = adminMiddleware;
