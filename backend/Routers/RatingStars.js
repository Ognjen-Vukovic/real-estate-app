const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); 

router.post('/', async (req, res) => { 
  const { rating, userId, postId } = req.body;

  try {
    console.log("Primljeni podaci za ocenjivanje:", req.body);

    if (!rating || !userId || !postId) {
      console.error("Nedostaju obavezna polja: rating, userId ili postId.");
      return res.status(400).json({ message: "Missing required fields: rating, userId, or postId" });
    }

    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      console.error("Korisnik nije pronađen:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const postDoc = await db.collection('posts').doc(postId).get();
    if (!postDoc.exists) {
      console.error("Post nije pronađen:", postId);
      return res.status(404).json({ message: "Post not found" });
    }

    const newRating = {
      rating,
      userId,
      postId,
      createdAt: new Date(),
    };

    const docRef = await db.collection('ratings').add(newRating);
    console.log("Ocena je uspešno sačuvana sa ID-jem:", docRef.id);

    res.status(201).json({ message: 'Ocena je uspešno sačuvana', id: docRef.id });
  } catch (error) {
    console.error(error);
  }
});



router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  console.log('Primljen zahtev za GET /ratings sa postId:', postId);

  try {
    const ratingsSnapshot = await db.collection('ratings').where('postId', '==', postId).get();

    if (ratingsSnapshot.empty) {
      console.log('Nema ocena za ovaj postId:', postId);
    }

    const ratings = [];
    ratingsSnapshot.forEach(doc => {
      ratings.push(doc.data().rating);
    });

    console.log('Pronađene ocene:', ratings);
    res.status(200).json({ ratings });
  } catch (error) {
    console.error(error);
  }
});





module.exports = router;
