const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); 

router.post('/', async (req, res) => {
  const { userId, godine, mjestoPrebivalista, pol, adresa } = req.body;

  if (!userId || !godine || !mjestoPrebivalista || !pol || !adresa) {
    return res.status(400).json({ message: 'Svi podaci su obavezni.' });
  }

  try {
    const newUserDetails = {
      userId,
      godine,
      mjestoPrebivalista,
      pol,
      adresa,
      createdAt: new Date(),
    };

    const docRef = await db.collection('userDetails').add(newUserDetails);
    res.status(201).json({ id: docRef.id, ...newUserDetails });
  } catch (error) {
    console.error('Greška pri čuvanju korisničkih podataka:', error);
    res.status(500).json({ message: 'Došlo je do greške pri čuvanju podataka.' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const detailsSnapshot = await db.collection('userDetails').where('userId', '==', userId).get();
    if (detailsSnapshot.empty) {
      return res.status(404).json({ message: 'Nema podataka za ovog korisnika' });
    }

    const userDetails = [];
    detailsSnapshot.forEach((doc) => {
      userDetails.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
  }
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('userDetails').doc(id).delete();
  } catch (error) {
    console.error(error);
  }
});




module.exports = router;
