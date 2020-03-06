import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import { ReactQueryConfigProvider } from 'react-query';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

const App: React.FC = () => (
  <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/pokemons/:id" component={Pokemon} />
        </Switch>
      </IonReactRouter>
    </IonApp>
  </ReactQueryConfigProvider>
);

export default App;
