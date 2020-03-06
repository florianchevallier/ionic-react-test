import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import './assets/Home.scss';
import { IonContent, useIonViewDidEnter, IonItem } from '@ionic/react';
import Badge from './components/Badge';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');

  useIonViewDidEnter(() => {
    console.log('hoooho')
  })

  return (
    <IonContent className="home">
      <h1 className="title">What pokemon <br />are you looking for ?</h1>

      <div className="search-input">
        <IoMdSearch className="icon" />
        <input value={search} onChange={({ target: { value } }) => setSearch(value)} placeholder="Search Pokemon" />
      </div>

      <div className="menu">
        <div className="row">
          <IonItem routerLink="/pokedex">
            <Badge name="Pokedex" color="pokedex" />
          </IonItem>
          <IonItem routerLink="/pokedex">
            <Badge name="Moves" color="moves"/>
          </IonItem>
        </div>
      </div>

    </IonContent>
  );
};

export default Home;
