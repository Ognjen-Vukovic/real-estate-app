import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  Image,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Axios from "../api/Axios";

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`/users/posts/${id}`);
        if (response.status === 200) {
          console.log(response.data);
          setPost(response.data);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <Card maxW="100%">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Image src={post.photoUrl} borderRadius="lg" w="25%" />
          <Heading size="md">{post.title}</Heading>
          <Text>{post.description}</Text>
          <Text color="blue.600" fontSize="2xl">
            {post.price + " KM"}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default PostView;
