import React, { useState, useEffect } from "react";
import Axios from "../api/Axios";
import PrivateRoute from "../components/PrivateRoute";
import {
  Box,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const Account = () => {
  const [reservations, setReservations] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userInfo, setUserInfo] = useState({
    godine: "",
    mjestoPrebivalista: "",
    pol: "",
    adresa: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");
  const toast = useToast();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await Axios.get(`/reservations/user/${userId}`);
        setReservations(response.data.reservations);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await Axios.get(`/user-details/${userId}`);
        setUserDetails(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchReservations();
      fetchUserDetails();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await Axios.post("/user-details", {
        userId,
        ...userInfo,
      });

      setUserDetails(response.data);
      setIsEditing(false);
      toast({
        title: "Uspješno kreirano",
        description: "Dodatni podaci su uspješno sačuvani",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Greška pri kreiranju:", error);
      toast({
        title: "Greška",
        description: "Došlo je do greške pri kreiranju podataka.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(`/user-details/${userDetails.id}`);
      setUserDetails(null);
      setUserInfo({
        godine: "",
        mjestoPrebivalista: "",
        pol: "",
        adresa: "",
      });
      setIsEditing(false);
      toast({
        title: "Uspjesno izbrisano",
        description: "Svi podaci su uspjesno izbrisani.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Greska pri brisanju:", error);
      toast({
        title: "Greska",
        description: "Doslo je do greske pri brisanju podataka.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await Axios.delete(`/reservations/${reservationId}`);
      setReservations(
        reservations.filter((reservation) => reservation.id !== reservationId)
      );
      toast({
        title: "Rezervacija otkazana",
        description: "Rezervacija je uspješno otkazana.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Greška pri otkazivanju rezervacije:", error);
      toast({
        title: "Greška",
        description: "Došlo je do greške pri otkazivanju rezervacije.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <PrivateRoute>
      <Box p={6}>
        <Heading size="lg" mb={4}>
          Moj nalog
        </Heading>
        <Heading size="md" mb={2}>
          Moje rezervacije
        </Heading>
        {reservations.length > 0 ? (
          <Stack spacing={3}>
            {reservations.map((reservation) => (
              <Box key={reservation.id} p={4} shadow="md" borderWidth="1px">
                <Text>
                  <strong>Post ID:</strong> {reservation.postId}
                </Text>
                <Text>
                  <strong>Datum rezervacije:</strong> {reservation.date}
                </Text>
                <Button onClick={() => handleCancelReservation(reservation.id)}>
                  Otkaži rezervaciju
                </Button>
              </Box>
            ))}
          </Stack>
        ) : (
          <Text>Nema rezervacija za vaše postove.</Text>
        )}

        <Box mt={6}>
          <Heading size="md" mb={2}>
            Dodatni podaci
          </Heading>
          {isEditing ? (
            <>
              <FormControl mb={3}>
                <FormLabel>Godine:</FormLabel>
                <Input
                  name="godine"
                  value={userInfo.godine}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Mjesto prebivalista:</FormLabel>
                <Input
                  name="mjestoPrebivalista"
                  value={userInfo.mjestoPrebivalista}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Pol:</FormLabel>
                <Input
                  name="pol"
                  value={userInfo.pol}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Adresa:</FormLabel>
                <Input
                  name="adresa"
                  value={userInfo.adresa}
                  onChange={handleInputChange}
                />
              </FormControl>

              <ButtonGroup>
                <Button colorScheme="blue" onClick={handleCreate}>
                  Kreiraj
                </Button>
                <Button colorScheme="red" onClick={() => setIsEditing(false)}>
                  Otkaži
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              {userDetails && (
                <List spacing={3} ml={2} mt={4}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Godine: {userDetails.godine}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Mjesto prebivalista: {userDetails.mjestoPrebivalista}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Pol: {userDetails.pol}
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Adresa: {userDetails.adresa}
                  </ListItem>
                </List>
              )}
              <ButtonGroup mt={3}>
                <Button colorScheme="blue" onClick={handleEdit}>
                  Izmjeni
                </Button>
                <Button colorScheme="red" onClick={handleDelete}>
                  Izbriši
                </Button>
              </ButtonGroup>
            </>
          )}
        </Box>
      </Box>
    </PrivateRoute>
  );
};

export default Account;
