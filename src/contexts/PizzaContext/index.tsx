import React, { useReducer, createContext, useMemo, useContext } from 'react';
import {
  PizzaItemProps,
  PizzaSelectionAction,
  PizzaContextPayload,
} from './types';

export const PizzaContext = createContext<PizzaContextPayload>(
  {} as PizzaContextPayload
);

const initialState: PizzaItemProps = {
  size: {},
  crust: {},
  toppings: [],
  error: true,
};

const reducer = (
  state: typeof initialState,
  action: PizzaSelectionAction
): any => {
  switch (action.type) {
    case 'SWITCH_SIZE':
      return {
        ...state,
        size: action.payload,
      };
    case 'SWITCH_CRUST':
      return {
        ...state,
        crust: action.payload,
      };
    case 'ADD_TOPPINGS':
      return {
        ...state,
        toppings: action.payload,
      };

    case 'SWITCH_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export const usePizzaContext = (): PizzaContextPayload => {
  const context = useContext(PizzaContext);

  if (!context) {
    throw new Error(
      'Use pizza context should be used within a Pizza Context provider'
    );
  }

  return context;
};

export const PizzaContextProvider: React.FC = ({ children }) => {
  const [pizzaOrder, dispatch] = useReducer(reducer, initialState);

  const payload = useMemo<PizzaContextPayload>(() => [pizzaOrder, dispatch], [
    pizzaOrder,
    dispatch,
  ]);

  return (
    <PizzaContext.Provider value={payload}>{children}</PizzaContext.Provider>
  );
};
