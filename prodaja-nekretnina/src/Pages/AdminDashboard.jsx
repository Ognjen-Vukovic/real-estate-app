import React, { useEffect, useState } from "react";
import Axios from "../api/Axios";
import { Box, Heading, Button, List, ListItem, Text } from "@chakra-ui/react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/admin/users", {
          headers: {
            "user-id": localStorage.getItem("userId"),
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError("Samo admin može pristupiti admin dashboardu.");
        } else {
          setError("Greška prilikom učitavanja korisnika.");
        }
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await Axios.get("/admin/posts", {
          headers: {
            "user-id": localStorage.getItem("userId"),
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError("Samo admin može pristupiti admin dashboardu.");
        } else {
          setError("Greška prilikom učitavanja postova.");
        }
      }
    };

    fetchUsers();
    fetchPosts();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await Axios.delete(`/admin/users/${userId}`, {
        headers: {
          "user-id": localStorage.getItem("userId"),
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.response || error);
      setError("Samo admin može koristiti ovu rutu");
    }
  };

  const deletePost = async (postId) => {
    try {
      await Axios.delete(`/admin/posts/${postId}`, {
        headers: {
          "user-id": localStorage.getItem("userId"),
        },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.response || error);
      setError("Samo admin može koristiti ovu rutu");
    }
  };

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box>
      <Heading>Admin Dashboard</Heading>

      <Heading size="md" mt={4}>
        Users
      </Heading>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Text>{user.username}</Text>
            <Button onClick={() => deleteUser(user.id)}>Delete User</Button>
          </ListItem>
        ))}
      </List>

      <Heading size="md" mt={4}>
        Posts
      </Heading>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <Text>{post.title}</Text>
            <Button onClick={() => deletePost(post.id)}>Delete Post</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminDashboard;
