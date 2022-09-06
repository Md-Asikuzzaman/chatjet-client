import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const Chat = ({ user }) => {
  return (
    <Link className="message-links" to={`/messages/${user._id}`}>
      <div className="home-chat">
        <Avatar src={user.name} alt={user.name.toUpperCase()} />
        <div className="home-chat-details">
          <Typography
            style={{ textTransform: "capitalize" }}
            className="home-chat-title"
            variant="h6"
          >
            {user.name}
          </Typography>
          <Typography className="home-chat-message" variant="body2">
            hello, how are you?
          </Typography>
        </div>
        <div className="home-chat-last-active">
          <Typography variant="body2">30 minutes ago</Typography>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
