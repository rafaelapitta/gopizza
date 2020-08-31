export interface PizzaItemProps {
  size: PizzaItem;
  crust: PizzaItem;
  toppings: PizzaItem[];
  error: boolean;
}

export interface PizzaItem {
  name?: string;
  price?: number;
}

export enum PizzaSelectionActionTypes {
  'SWITCH_SIZE' = 'SWITCH_SIZE',
  'SWITCH_CRUST' = 'SWITCH_CRUST',
  'ADD_TOPPINGS' = 'ADD_TOPPINGS',
  'SWITCH_ERROR' = 'SWITCH_ERROR',
}

export interface PizzaSelectionAction {
  payload: PizzaItem | PizzaItem[] | boolean;
  type: PizzaSelectionActionTypes;
}

export type PizzaContextPayload = [any, React.Dispatch<PizzaSelectionAction>];
