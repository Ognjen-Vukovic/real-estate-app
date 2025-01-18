import React, { useState } from "react";
import {
  Heading,
  Text,
  FormLabel,
  Input,
  FormControl,
  Checkbox,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import pozadina from "../images/pozadina.jpg";
import { db } from "../config";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { registerUser } from "../api/Users";

const RegisterPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const user = { name, surname, username, email, password };

    try {
      setLoading(true);
      const { data } = await registerUser(user);
      localStorage.setItem("userId", data);
      navigate(ROUTES.NEKRETNINE);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bgImage={`url(${pozadina})`}
      bgSize="cover"
      bgPosition="center"
      w="100%"
      h="100vh"
      rounded="md"
      position="relative"
      zIndex="0"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignContent="center"
    >
      <div className=" w-1/2 h-3/4 flex flex-col justify-center items-center  p-8 mt-20 mx-auto  rounded-2xl outline-4 border-2 right-0 bg-white">
        <Heading>Register</Heading>
        <Text>Enter your info for registration</Text>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Surname</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>E-mail adress</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel alignSelf="start" marginTop="3px">
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </>
        )}
        <div className="flex flex-col w-full justify-between">
          <Checkbox>Remember me.</Checkbox>
          <Button variant="link" colorScheme="blue">
            Forgot Password
          </Button>
          <Button
            rounded="5px"
            colorScheme="blue"
            w="80px"
            h="36px"
            alignSelf="end"
            marginTop="10px"
            onClick={onRegisterFormSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default RegisterPage;
