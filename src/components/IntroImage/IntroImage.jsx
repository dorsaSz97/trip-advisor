import React, { useContext } from 'react';

import AppContext from '../../store/app-context';

import { DETAILS } from '../../data';

import styles from './IntroImage.module.css';

const IntroImage = () => {
  const [state] = useContext(AppContext);

  return (
    <img
      className={styles.introImage}
      src={
        DETAILS.filter(detail => detail.category === state.category)[0].imageUrl
      }
      alt={state.category}
    />
  );
};

export default IntroImage;
