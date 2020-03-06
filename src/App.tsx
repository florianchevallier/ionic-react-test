import React from 'react';
import { Route } from 'react-router-dom';
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
import './theme/variables.css';
import Layout from './components/Layout/Layout';
import Pokedex from './pages/Pokedex';

const App: React.FC = () => (
  <ReactQueryConfigProvider config={{ refetchAllOnWindowFocus: false }}>
    <IonApp>
      <Layout>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" component={Home} exact={true} />
            <Route path="/pokedex" component={Pokedex} />
          </IonRouterOutlet>
        </IonReactRouter>
      </Layout>
    </IonApp>
  </ReactQueryConfigProvider>
);

export default App;
