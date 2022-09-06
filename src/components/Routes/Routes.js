import React from 'react';
import Auth from './Auth/Auth';
import Conversation from './Home/Conversation/Conversation';
import Home from './Home/Home';

import { BrowserRouter, Routes as MyRoutes, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <MyRoutes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/messages/:id' element={<Conversation />} />
        </MyRoutes>
      </BrowserRouter>
    </>
  );
};

export default Routes;
