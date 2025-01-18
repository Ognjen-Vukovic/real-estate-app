import { Button, Image } from "@chakra-ui/react";
import logo from "../images/logo.png";
import logout from "../images/logout.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    navigate(ROUTES.LANDING);
  };

  return (
    <div className="p-4 text-4xl font-bold flex items-center bg-black  w-full h-16 box-border">
      <Image src={logo} maxW="100px" />
      <h1 className="text-blue-400">Prodaja nekretnina</h1>
      <div className="flex gap-4 ml-auto">
        <Button onClick={() => navigate("/admin-dashboard")}>
          Admin Dashboard
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/home-page")}>
          Home
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/nekretnine")}>
          Moje nekretnine
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/add-new")}>
          Objavi oglas
        </Button>
        <Button colorScheme="blue" onClick={() => navigate("/account")}>
          Account
        </Button>
        <Button colorScheme="red" maxW="100px" onClick={handleLogOut}>
          Log Out{" "}
          <Image
            src={logout}
            maxW="20px"
            marginLeft="10px"
            onClick={handleLogOut}
          />
        </Button>
      </div>
    </div>
  );
};

export default Header;
