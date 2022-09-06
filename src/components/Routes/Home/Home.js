import React, { useEffect } from "react";
import { Container, Paper, Typography, IconButton } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import "./style.css";
import Chat from "./Chat/Chat";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./../../../actions/chat";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("chatjet_profile"));

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (!profile) {
      navigate("/auth");
    }
  }, [profile]);

  const users = useSelector((user) =>
    user.user.filter((f) => f._id !== profile.result._id)
  );

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to logOut?")) {
      dispatch({ type: "LOGOUT" });
      navigate("/auth");
    }
  };

  return (
    <Container className="container">
      <Paper className="paper-space">
        <div className="home-header">
          <div className="home-user_info">
            <Typography style={{ textTransform: "capitalize" }} variant="h5">
              {profile ? profile.result.name : "Guest"}
            </Typography>
          </div>
          <IconButton onClick={handleLogOut}>
            <ExitToAppRounded title="Logout" />
          </IconButton>
        </div>
        <div className="home-chats" id="cursor">
          <div className="force-overflow"></div>
          {users && users.map((user) => <Chat key={user._id} user={user} />)}
        </div>
      </Paper>
    </Container>
  );
};

export default Home;
