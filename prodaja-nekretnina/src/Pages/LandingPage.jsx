import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import pozadina from "../images/pozadina.jpg";
import { useNavigate } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <PublicRoute>
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
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Box
          w={{ base: "90%", md: "60%", lg: "40%" }}
          h="auto"
          bgImage="linear-gradient(rgba(0, 0, 0, 0.300),rgba(0, 0, 0, 0.7))"
          borderRadius="20"
          boxShadow="dark-lg"
          p={{ base: 4, md: 6 }}
          rounded="md"
          textAlign="center"
        >
          <Text
            color="white"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontFamily="Roboto"
            textAlign="center"
            mb={8}
          >
            Dobro došli na aplikaciju za prodaju nekretnina
          </Text>
          <ButtonGroup
            gap={4}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="center"
          >
            <Button
              colorScheme="whiteAlpha"
              onClick={() => navigate("/login-page")}
              w={{ base: "full", md: "auto" }}
            >
              Login
            </Button>
            <Button
              colorScheme="blackAlpha"
              onClick={() => navigate("/register-page")}
              w={{ base: "full", md: "auto" }}
            >
              Register
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </PublicRoute>
  );
};

export default LandingPage;
