import {
  ModalOverlay,
  ModalBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Axios from "../api/Axios";

const PostDelete = ({ isOpen, onClose, post, setPosts }) => {
  const [loading, setLoading] = useState(false);

  const handleClickYes = async () => {
    try {
      setLoading(true);

      await Axios.delete(`/users/posts/${post.id}`);

      setPosts((prevState) => prevState.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Obrisi post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Da li ste sigurni da zelite izbrisati ovu objavu?</Text>
        </ModalBody>
        <ModalFooter>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Button colorScheme="red" onClick={handleClickYes}>
                Delete
              </Button>
              <Button ml={3} onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostDelete;
