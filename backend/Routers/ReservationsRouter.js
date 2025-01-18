const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); 

router.post('/', async (req, res) => {
  const { date, userId, postId } = req.body;

  if (!date || !userId || !postId) {
    return res.status(400).json({ message: 'Datum rezervacije, userId i postId su obavezni' });
  }

  try {
    const newReservation = {
      date,
      userId, 
      postId, 
      createdAt: new Date(),
    };

    const docRef = await db.collection('reservations').add(newReservation);
    const savedReservation = await docRef.get();

    res.status(201).json({
      date: savedReservation.data().date,
      userId: savedReservation.data().userId,
      postId: savedReservation.data().postId
    });
  } catch (error) {
    console.error('Greška pri čuvanju rezervacije:', error);
    res.status(500).json({ message: 'Došlo je do greške pri čuvanju rezervacije' });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const postsSnapshot = await db.collection('posts').where('userId', '==', userId).get();
    if (postsSnapshot.empty) {
      return res.status(404).json({ message: 'Nema postova za ovog korisnika' });
    }

    const postIds = postsSnapshot.docs.map(doc => doc.id);

    const reservationsSnapshot = await db.collection('reservations').where('postId', 'in', postIds).get();

    const reservations = [];
    reservationsSnapshot.forEach(doc => {
      reservations.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Greška pri preuzimanju rezervacija:', error);
    res.status(500).json({ message: 'Došlo je do greške pri preuzimanju rezervacija' });
  }
});


router.delete('/:reservationId', async (req, res) => {
  const { reservationId } = req.params;

  try {
    await db.collection('reservations').doc(reservationId).delete();
    res.status(200).json({ message: 'Rezervacija je uspešno obrisana' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Došlo je do greške pri brisanju rezervacije' });
  }
});


module.exports = router;
