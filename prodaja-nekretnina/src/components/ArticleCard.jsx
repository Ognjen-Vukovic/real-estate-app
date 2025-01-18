import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import PostDelete from "./PostDelete";
import PostUpdate from "./PostUpdate";
import RatingStars from "./RatingStars";
import CalendarBuy from "./CalendarBuy";

const ArticleCard = ({ post, setPosts }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isPostUpdateModal, setPostUpdateModal] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isBuyModalOpen, setBuyModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home-page";

  const openDeleteModal = () => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPost(null);
  };

  const openUpdateModal = () => {
    setSelectedPost(post);
    setPostUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setPostUpdateModal(false);
    setSelectedPost(null);
  };

  const openBuyModal = () => {
    setSelectedPost(post);
    setBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setBuyModalOpen(false);
    setSelectedPost(null);
  };

  const handleViewPost = () => {
    navigate(ROUTES.POST_VIEW.replace(":id", post.id));
  };

  return (
    <div>
      <Card maxW="100%" key={post.id}>
        <CardBody>
          <Image src={post.photoUrl} alt={post.title} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{post.title}</Heading>
            <Text>{post.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              {post.price + " KM"}
            </Text>
          </Stack>
        </CardBody>
        <Divider />

        <RatingStars postId={post.id} />

        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={openBuyModal}>
              Buy
            </Button>

            <Button variant="ghost" colorScheme="blue" onClick={handleViewPost}>
              View
            </Button>
            {!isHomeRoute && (
              <>
                <Button
                  variant="ghost"
                  colorScheme="red"
                  onClick={openDeleteModal}
                >
                  Delete
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={openUpdateModal}
                >
                  Edit
                </Button>
              </>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>

      {isDeleteModalOpen && selectedPost && (
        <PostDelete
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          post={selectedPost}
          setPosts={setPosts}
        />
      )}

      {isPostUpdateModal && selectedPost && (
        <PostUpdate
          isOpen={isPostUpdateModal}
          onClose={closeUpdateModal}
          post={selectedPost}
          setPosts={setPosts}
        />
      )}

      {isBuyModalOpen && selectedPost && (
        <CalendarBuy
          isOpen={isBuyModalOpen}
          onClose={closeBuyModal}
          postId={selectedPost.id}
        />
      )}
    </div>
  );
};

export default ArticleCard;
