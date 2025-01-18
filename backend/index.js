const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
const UserRouter = require("./Routers/UserRouter");
const DeletePostRouter = require("./Routers/DeletePostRouter");
const PostViewRouter = require("./Routers/PostViewRouter");
const PostCrudId = require("./Routers/PostCrudId");
const RatingStarsRouter = require("./Routers/RatingStars"); 
const ReservationsRouter = require("./Routers/ReservationsRouter");
const UserDetailsRouter = require("./Routers/UserDetailsRouter");
const AdminRouter = require("./Routers/AdminRouter");

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", UserRouter);
app.use("/users", DeletePostRouter);
app.use("/users", PostViewRouter);
app.use("/users", PostCrudId);
app.use("/ratings", RatingStarsRouter); 
app.use("/reservations", ReservationsRouter);
app.use("/user-details", UserDetailsRouter);
app.use("/admin", AdminRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
