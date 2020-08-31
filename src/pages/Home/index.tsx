import React, { useContext, useState, ReactElement, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { PizzaItemsContext } from '../../contexts/PizzaItemsContext';
import CrustSelection from '../../components/CrustSelection';
import SizeSelection from '../../components/SizeSelection';
import ToppingsSelection from '../../components/ToppingsSelection';
import Checkout from '../Checkout';
import { usePizzaContext } from '../../contexts/PizzaContext';
import {
  PizzaSelectionActionTypes,
  PizzaItem,
} from '../../contexts/PizzaContext/types';

import { Container, ButtonsContainer } from './styles';

const Home: React.FC = () => {
  const [selectedPizzaSize, setSelectedPizzaSize] = useState({});
  const [selectedPizzaCrust, setSelectedPizzaCrust] = useState({});
  const [selectedPizzaToppings, setSelectedPizzaToppings] = useState<
    PizzaItem[]
  >([]);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const { pizzaAvailableItems } = useContext(PizzaItemsContext);

  const [pizzaOrder, dispatch] = usePizzaContext();

  const availableSizes = pizzaAvailableItems.sizes;
  const availableCrusts = pizzaAvailableItems.crusts;
  const availableToppings = pizzaAvailableItems.toppings;
  const navError = pizzaOrder.error;

  useEffect(() => {
    dispatch({
      type: PizzaSelectionActionTypes.SWITCH_SIZE,
      payload: selectedPizzaSize,
    });
  }, [selectedPizzaSize, dispatch]);

  useEffect(() => {
    dispatch({
      type: PizzaSelectionActionTypes.SWITCH_CRUST,
      payload: selectedPizzaCrust,
    });
  }, [selectedPizzaCrust, dispatch]);

  useEffect(() => {
    dispatch({
      type: PizzaSelectionActionTypes.ADD_TOPPINGS,
      payload: selectedPizzaToppings,
    });
  }, [selectedPizzaToppings, dispatch]);

  const next = (): void => {
    let nextStep = currentStep;
    nextStep = nextStep >= 2 ? nextStep + 1 : nextStep + 1;
    setCurrentStep(nextStep);
  };

  const prev = (): void => {
    let prevStep = currentStep;
    prevStep = prevStep <= 1 ? 1 : prevStep - 1;
    setCurrentStep(prevStep);
  };

  const previousButton = (): ReactElement<HTMLButtonElement> | null => {
    if (currentStep !== 1) {
      return (
        <Button
          variant="contained"
          color="default"
          type="button"
          onClick={prev}
        >
          Previous
        </Button>
      );
    }
    return null;
  };

  const nextButton = (): ReactElement<HTMLButtonElement> | null => {
    if (currentStep < 4) {
      return (
        <Button
          variant="contained"
          color="default"
          type="button"
          disabled={navError}
          onClick={next}
        >
          Next
        </Button>
      );
    }
    return null;
  };

  return (
    <Container>
      <SizeSelection
        step={1}
        currentStep={currentStep}
        field={availableSizes}
        handleChoice={setSelectedPizzaSize}
        legend="Choose your pie size"
      />
      <CrustSelection
        step={2}
        currentStep={currentStep}
        field={availableCrusts}
        handleChoice={setSelectedPizzaCrust}
        legend="Choose your pie crust"
      />
      <ToppingsSelection
        step={3}
        currentStep={currentStep}
        field={availableToppings}
        handleChoice={setSelectedPizzaToppings}
        legend="Choose your pie toppings"
      />
      <Checkout step={4} currentStep={currentStep} />
      <ButtonsContainer>
        {previousButton()}
        {nextButton()}
      </ButtonsContainer>
    </Container>
  );
};

export default Home;
