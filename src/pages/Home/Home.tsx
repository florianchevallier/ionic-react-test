import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import './assets/Home.scss';
import { IonContent, useIonViewDidEnter, IonItem } from '@ionic/react';
import Badge from './components/Badge';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');

  useIonViewDidEnter(() => {
    console.log('hoooho')
  })

  return (
    <Layout>
      <IonContent className="home">
        <h1 className="title">What pokemon <br />are you looking for ?</h1>

        <div className="search-input">
          <IoMdSearch className="icon" />
          <input value={search} onChange={({ target: { value } }) => setSearch(value)} placeholder="Search Pokemon" />
        </div>

        <div className="menu">
          <div className="row">
            <Badge to="/pokedex" name="Pokedex" color="pokedex" />
            <Badge to="/pokedex" name="Moves" color="moves" />
          </div>
        </div>

      </IonContent>
    </Layout>
  );
};

export default Home;
