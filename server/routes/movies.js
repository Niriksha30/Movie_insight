// backend/routes/movies.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Fetch all saved movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new movie
router.post('/', async (req, res) => {
  const { Title, Year, imdbID, Type, Poster } = req.body;
  const newMovie = new Movie({ Title, Year, imdbID, Type, Poster });

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie by IMDb ID
router.delete('/:imdbID', async (req, res) => {
  try {
    const result = await Movie.deleteOne({ imdbID: req.params.imdbID });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    console.error('Error deleting movie:', err); // Detailed logging
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
