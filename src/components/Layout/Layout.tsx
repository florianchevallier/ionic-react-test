import React from 'react';
import './styles.scss';
import { IonContent } from '@ionic/react';

interface Props {
  children: JSX.Element[] | JSX.Element
}

function Layout (props: Props) {
  const { children } = props;
  return (
    <IonContent className="layout">
      <img alt="pokeball" className="background-image" src="/assets/images/pokeball.png" />
      {children}
    </IonContent>
  );
};

export default Layout;
