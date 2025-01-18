import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { submitRating } from "../api/Users";
import Axios from "../api/Axios";

const RatingStars = ({ postId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const userId = localStorage.getItem("userId");

  const fetchRatings = async () => {
    try {
      const response = await Axios.get(`/ratings/${postId}`);

      setRatings(response.data.ratings);

      if (response.data.ratings && response.data.ratings.length > 0) {
        const total = response.data.ratings.reduce(
          (acc, rate) => acc + rate,
          0
        );
        const avg = total / response.data.ratings.length;
        setAverageRating(avg.toFixed(1));
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      setMessage("Došlo je do greške pri preuzimanju ocjena.");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [postId]);

  const handleRatingSubmit = async () => {
    try {
      await submitRating({
        rating,
        userId,
        postId,
      });

      setMessage("Tvoja ocjena je uspešno sačuvana.");
      fetchRatings();
    } catch (error) {
      setMessage("Došlo je do greške pri čuvanju ocjene.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <FaStar
              key={index}
              size={30}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              className="cursor-pointer"
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(currentRating)}
            />
          );
        })}
      </div>
      <button
        onClick={handleRatingSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Sacuvaj ocjenu
      </button>
      <p>
        Prosjecna ocjena: {averageRating} ({ratings.length} ocjena)
      </p>
    </div>
  );
};

export default RatingStars;
