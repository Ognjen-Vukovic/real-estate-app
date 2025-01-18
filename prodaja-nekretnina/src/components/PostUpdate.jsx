import {
  ModalOverlay,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Axios from "../api/Axios";

const PostUpdate = ({ isOpen, onClose, post, setPosts }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [price, setPrice] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
      setPhotoUrl(post.photoUrl || "");
      setPrice(post.price || "");
    }
  }, [post]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setTitleError("");
    setDescriptionError("");
    setPriceError("");

    let hasError = false;

    if (!title) {
      setTitleError("Naslov je obavezan");
      hasError = true;
    }
    if (!description) {
      setDescriptionError("Opis je obavezan");
      hasError = true;
    }
    if (!price || price <= 0) {
      setPriceError("Cijena je obavezna i mora biti veća od 0");
      hasError = true;
    }

    if (hasError) return;

    try {
      await Axios.put(`/users/posts/${post.id}`, {
        title,
        photoUrl,
        description,
        price,
      });

      setTitle("");
      setPhotoUrl("");
      setDescription("");
      setPrice("");

      alert("Oglas je uspješno azuriran");

      onClose();
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, title, description, photoUrl, price } : p
        )
      );
    } catch (error) {
      console.error(error);
      alert("Doslo je do greske prilikom azuriranja oglasa");
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            w="100%"
            h="80vh"
            rounded="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="gray.50"
          >
            <Box
              as="form"
              onSubmit={onFormSubmit}
              w="100%"
              p="8"
              bg="white"
              boxShadow="md"
              rounded="md"
            >
              <Heading>Dodaj Oglas</Heading>
              <Text mb="6">Upišite podatke da biste objavili svoj oglas</Text>

              <FormControl isInvalid={!!titleError} mb="4">
                <FormLabel>Naslov</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rounded="none"
                  variant="filled"
                />
                {titleError && (
                  <FormErrorMessage>{titleError}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!descriptionError} mb="4">
                <FormLabel>Opis</FormLabel>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rounded="none"
                  variant="filled"
                />
                {descriptionError && (
                  <FormErrorMessage>{descriptionError}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb="4">
                <FormLabel>Photo URL</FormLabel>
                <Input
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  rounded="none"
                  variant="filled"
                />
              </FormControl>

              <FormControl isInvalid={!!priceError} mb="4">
                <FormLabel>Cijena</FormLabel>
                <NumberInput
                  value={price}
                  onChange={(valueAsNumber) => setPrice(valueAsNumber)}
                  defaultValue={0}
                  min={0}
                  variant="filled"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {priceError && (
                  <FormErrorMessage>{priceError}</FormErrorMessage>
                )}
              </FormControl>
              <Box>
                <Button type="submit" colorScheme="blue" w="50%">
                  Ažuriraj oglas
                </Button>
                <Button variant="ghost" onClick={onClose} ml="15%" w="47">
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostUpdate;
