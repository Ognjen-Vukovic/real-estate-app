import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Spinner, Center } from "@chakra-ui/react";
import PrivateRoute from "../components/PrivateRoute";
import Axios from "../api/Axios";

const Nekretnine = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);

        const response = await Axios.get(`/users/user-posts/${userId}`);

        if (response.status === 200) {
          setPosts(response.data);
        } else {
          alert("Ne mogu se dohvatiti postovi");
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          setPosts([]);
        } else {
          console.error("Error fetching posts: ", e);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserPosts();
  }, [userId]);

  return (
    <PrivateRoute>
      <div className="grid grid-cols-4 gap-4">
        {loading ? (
          <Center w="100%" h="100vh">
            <Spinner size="xl" />
          </Center>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <ArticleCard key={post.id} post={post} setPosts={setPosts} />
          ))
        ) : (
          <Center w="100%">
            <span>Posts are not found</span>
          </Center>
        )}
      </div>
    </PrivateRoute>
  );
};

export default Nekretnine;
