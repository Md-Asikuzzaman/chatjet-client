import React, { useEffect, useState, useRef } from 'react';
import { ArrowForward, Send } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUser,
  sendMessage,
  fetchMessage,
} from './../../../../actions/chat';

import './style.css';
import {
  Container,
  IconButton,
  Paper,
  Typography,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Conversation = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const { id } = useParams();

  const profile = JSON.parse(localStorage.getItem('chatjet_profile'));

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchUser());
      dispatch(fetchMessage());

      if (dispatch) {
        scrollRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  // =============================================================================

  // That was really hard part of my life ever...
  const myMsg = useSelector((message) =>
    message.chat.filter((data) => {
      return (
        (String(data.senderId) === String(id) ||
          String(data.receiverId) === String(id)) &&
        (String(data.senderId) === String(profile.result._id) ||
          String(data.receiverId) === String(profile.result._id))
      );
    })
  );

  const senderData = useSelector((data) =>
    data.user.find((user) => {
      return String(user._id) === String(id);
    })
  );

  // console.log(senderData);

  // =============================================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(
        sendMessage({
          message: text,
          senderId: profile.result._id,
          receiverId: id,
          date: new Date().toISOString(),
        })
      );
    }

    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    setText('');
  };

  return (
    <Container className='container'>
      <Paper className='paper-space'>
        <div className='home-header'>
          <div className='home-header-status'>
            <Avatar
              src={senderData && senderData.name}
              alt={senderData && senderData.name.toUpperCase()}
            />
            <div className='home-header-details'>
              <Typography variant='h6' style={{ textTransform: 'capitalize' }}>
                {senderData && senderData.name}
              </Typography>
              <Typography variant='body2'>20 minutes ago</Typography>
            </div>
          </div>
          <Link className='message-links' to='/'>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </Link>
        </div>

        <div className='home-conversations' id='cursor'>
          {myMsg.length ? (
            myMsg.map((message) => (
              <div
                key={message._id}
                className={`home-conversation ${message.senderId ===
                  profile.result._id && 'active'}`}
              >
                <Avatar src={message.name} alt={message.name} />
                <Typography className='home-conversation-text' variant='body2'>
                  {message.message}
                </Typography>
                <Typography variant='body2' className='home-conversation-date'>
                  {`${new Date(message.date).getUTCDate()}/${new Date(
                    message.date
                  ).getDay()}/${new Date(
                    message.date
                  ).getFullYear()} ${new Date(
                    message.date
                  ).toLocaleTimeString()}`}
                </Typography>
              </div>
            ))
          ) : (
            <Typography align='center' className='history-text' variant='h5'>
              No History!
            </Typography>
          )}
          <div ref={scrollRef}></div>
        </div>

        <div className='home-message-sender-box'>
          <form onSubmit={handleSubmit}>
            <div className='from-group'>
              <input
                type='text'
                name='message'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Type Aa...'
              />
              <IconButton className='send-btn-icon' type='submit'>
                <Send className='send-btn' />
              </IconButton>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Conversation;
