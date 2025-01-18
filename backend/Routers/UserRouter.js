const {Router} = require("express");
const { loginUser } = require("../utils/User");
const admin = require("firebase-admin");

const router = Router();


router.post("/register", async ({ body }, res) => {
  try {
    const { name, surname, username, email, password, isAdmin = false } = body;

    const newUser = await admin.firestore().collection("users").add({
      name,
      surname,
      username,
      email,
      password,
      isAdmin, 
    });

    res.send(newUser.id); 
  } catch (error) {
    console.log(error.message);
  }
});




router.post("/login", async ({body}, res) => {
    try {
        const {id} = await loginUser(body);
        res.send(id);
    } catch (error) {
        res.status(400).send(error?.message || "Something went wrong");
    }
});

router.post("/posts", async (req, res) => {
  try {
      const { title, description, photoUrl, price, userId } = req.body;

      if (!title || !description || !price || !userId) {
          return res.status(400).send("Missing required fields");
      }

      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      if (!userDoc.exists) {
          return res.status(400).send("User not found");
      }

      const newPost = {
          title,
          description,
          photoUrl,
          price,
          userId,
          createdAt: new Date(),
      };

      const createdPost = await admin.firestore().collection("posts").add(newPost);

      res.status(201).send({ id: createdPost.id }); 
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});




  
  router.put("/posts/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { title, description, photoUrl, price } = req.body;
    
        if (!id || !title || !description || !price) {
          return res.status(400).send("Missing required fields");
        }
    
        const postRef = admin.firestore().collection("posts").doc(id);
        const postDoc = await postRef.get();
    
        if (!postDoc.exists) {
          return res.status(404).send("Post not found");
        }
    
        await postRef.update({
          title,
          description,
          photoUrl,
          price,
        });
    
        res.status(200).send("Post successfully updated");
      } catch (error) {
        console.error(error);
      }
    });

    router.get("/posts", async (req, res) => {
        try {
          const postsSnapshot = await admin.firestore().collection("posts").get();
          const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          res.status(200).json(posts);
        } catch (error) {
          console.error(error);
        }
      });
      
      

module.exports = router;