import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Spinner, Center } from "@chakra-ui/react";
import PrivateRoute from "../components/PrivateRoute";
import Axios from "../api/Axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("/users/posts");

        if (response.status === 200) {
          setPosts(response.data);
        } else {
          alert("Ne mogu se dohvatiti postovi");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  return (
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
  );
};

export default HomePage;
