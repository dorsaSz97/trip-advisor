import React, { Fragment } from 'react';
import Header from './components/Header';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import { useContext } from 'react';
import AppContext from './store/app-context';
import Map from './components/ChangeView';

function App() {
  const [coords, setCoords] = useState(null);
  const [bounds, setBounds] = useState({});
  const [places, setPlaces] = useState([]);

  const ctx = useContext(AppContext);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a26de7b984msh26050a96285dd51p181f31jsn8eb4383ff23d',
      'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com',
    },
  };
  useEffect(() => {
    // abort
    if (!ctx.search) return;

    fetch(
      `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=${ctx.search}`,
      options
    )
      .then(response => response.json())
      .then(response => {
        ctx.setSearchCoords(response[0].lat, response[0].lon);

        setBounds({
          one: response[0].boundingbox[0],
          two: response[0].boundingbox[1],
          three: response[0].boundingbox[2],
          four: response[0].boundingbox[3],
        });
      })
      .catch(err => console.error(err));
  }, [ctx.search]);

  const options1 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a26de7b984msh26050a96285dd51p181f31jsn8eb4383ff23d',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    },
  };
  useEffect(() => {
    // abort
    if (bounds.one && bounds.two && bounds.three && bounds.four) {
      fetch(
        `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=${bounds.one}&tr_latitude=${bounds.two}&bl_longitude=${bounds.three}&tr_longitude=${bounds.four}&limit=30&open_now=false&lunit=km&lang=en_US`,
        options1
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
          ctx.setRes([...response.data]);
        })
        .catch(err => console.error(err));
    }
  }, [bounds.one, bounds.two, bounds.three, bounds.four]);
  return (
    <>
      {/* <Map /> */}
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
