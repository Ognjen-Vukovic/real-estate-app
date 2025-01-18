import {
  Heading,
  Text,
  FormLabel,
  Input,
  FormControl,
  Button,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import Axios from "../api/Axios";
import PrivateRoute from "../components/PrivateRoute";

const AddNew = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [price, setPrice] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");

  const userId = localStorage.getItem("userId");

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
      const post = {
        title,
        photoUrl,
        description,
        price,
        userId,
      };

      console.log("Podaci za slanje:", post);

      await Axios.post("/users/posts", post);

      setTitle("");
      setPhotoUrl("");
      setDescription("");
      setPrice("");

      alert("Oglas je uspješno postavljen");
    } catch (error) {
      console.error(error);
      alert("Došlo je do greške prilikom postavljanja oglasa.");
    }
  };

  return (
    <PrivateRoute>
      <Box
        w="100%"
        h="100vh"
        rounded="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
      >
        <Box
          as="form"
          onSubmit={onFormSubmit}
          w="50%"
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
            {titleError && <FormErrorMessage>{titleError}</FormErrorMessage>}
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
              onChange={(valueAsString, valueAsNumber) =>
                setPrice(valueAsNumber)
              }
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
            {priceError && <FormErrorMessage>{priceError}</FormErrorMessage>}
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">
            Postavi Oglas
          </Button>
        </Box>
      </Box>
    </PrivateRoute>
  );
};

export default AddNew;
