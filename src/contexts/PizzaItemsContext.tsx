import React, { createContext, useState } from 'react';
import { pizzaItems } from '../services/pizzaItems';

export interface PizzaItemsContextData {
  pizzaAvailableItems: {
    sizes: PizzaItemProps[];
    crusts: PizzaItemProps[];
    toppings: PizzaItemProps[];
  };
}

export interface PizzaItemProps {
  name: string;
  price: number;
}

export const PizzaItemsContext = createContext<PizzaItemsContextData>(
  {} as PizzaItemsContextData
);

const PizzaItemsContextProvider: React.FC = ({ children }) => {
  const [pizzaAvailableItems] = useState(pizzaItems);

  return (
    <PizzaItemsContext.Provider value={{ pizzaAvailableItems }}>
      {children}
    </PizzaItemsContext.Provider>
  );
};

export default PizzaItemsContextProvider;
