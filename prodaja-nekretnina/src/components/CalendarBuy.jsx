import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import Axios from "../api/Axios";

const CalendarBuy = ({ isOpen, onClose, postId }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [savedDate, setSavedDate] = useState("");

  const toast = useToast();

  const userId = localStorage.getItem("userId");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      const response = await Axios.post("/reservations", {
        date: selectedDate,
        userId: userId,
        postId: postId,
      });

      setSavedDate(response.data.date);
      onClose();

      toast({
        title: "Rezervacija uspjela",
        description: `Vas termin je rezervisan za ${response.data.date}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Greška",
        description: "Doslo je do greske",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rezerviši termin za kupovinu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              maxW="90%"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <p>
              Vaš termin je: {savedDate ? savedDate : "Termin nije oznacen"}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleConfirm}>
              Potvrdi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarBuy;
