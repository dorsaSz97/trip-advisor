import React, { Fragment } from 'react';
import Header from './components/Header';
import { CssBaseline, Grid } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';

function App() {
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'a26de7b984msh26050a96285dd51p181f31jsn8eb4383ff23d',
  //     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
  //   },
  // };

  // useEffect(() => {
  //   fetch(
  //     'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=11.847676&bl_longitude=108.473209&tr_longitude=109.149359&tr_latitude=12.838442&limit=30',
  //     options
  //   )
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));
  // }, []);
  return (
    <>
      <CssBaseline />

      <Header />
      <Hero />
      {/* <Routes>
        <Route path="*" element={<Header />} />
        <Route path="/" element={<Header />} />
      </Routes> */}

      {/* Form */}
      {/* Login */}
      {/* Logout */}
      {/* FIREBAS EAUTH */}
      {/* SENDTOACONTEXT */}

      {/* Header */}
      {/* Avatar */}
      {/* GETFROM CONTEXT */}
      {/* Logout */}

      {/* Sidebar (nav) */}
      {/* Links */}
      {/* Setting */}

      {/* Weather */}
      {/* API CALL */}
      {/* 7 Forecast */}
    </>
  );
}

export default App;
