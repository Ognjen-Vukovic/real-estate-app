import {
  Heading,
  Text,
  FormLabel,
  Input,
  FormControl,
  Checkbox,
  Button,
  Box,
  Spinner,
} from "@chakra-ui/react";
import pozadina from "../images/pozadina.jpg";
import { useState } from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Users";

const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onLoginSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await loginUser({
        username: loginUsername,
        password: loginPassword,
      });

      if (data) {
        localStorage.setItem("userId", data);
        navigate(ROUTES.NEKRETNINE);
      } else {
        alert("Username or password incorrect");
      }
    } catch (error) {
      alert(error?.response?.data);
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
      <div className=" w-1/2 h-2/4 flex flex-col justify-center items-center  p-8 mt-20 mx-auto  rounded-2xl outline-4 border-2 right-0 bg-white">
        <Heading>Login</Heading>
        <Text>Enter your username and password to login</Text>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                rounded="none"
                variant="filled"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
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
            onClick={onLoginSubmitForm}
          >
            Login
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default LoginPage;
