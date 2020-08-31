import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';
import Routes from './routes';
import PizzaItemsContextProvider from './contexts/PizzaItemsContext';
import { PizzaContextProvider } from './contexts/PizzaContext';

const App: React.FC = () => (
  <PizzaItemsContextProvider>
    <PizzaContextProvider>
      <BrowserRouter>
        <Routes />
        <GlobalStyles />
      </BrowserRouter>
    </PizzaContextProvider>
  </PizzaItemsContextProvider>
);

export default App;
