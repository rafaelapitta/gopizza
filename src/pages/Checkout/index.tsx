import React, { useState, useCallback, useEffect } from 'react';
import Lottie from 'react-lottie';
import { Button, Typography } from '@material-ui/core';
import { usePizzaContext } from '../../contexts/PizzaContext';
import { PizzaItem } from '../../contexts/PizzaContext/types';
import pieSlice from '../../assets/animations/pie-slice.json';

import { Container } from './styles';

interface CheckoutProps {
  step: number;
  currentStep: number;
}

const ToppingsSelection: React.FC<CheckoutProps> = ({ step, currentStep }) => {
  const isCurrentStep = step === currentStep;
  const [pizzaOrder] = usePizzaContext();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isOrderFinished, setIsOrderFinished] = useState(false);

  const { size } = pizzaOrder;
  const { crust } = pizzaOrder;
  const { toppings } = pizzaOrder;

  const toppingsGeneralPrice = toppings[0]?.price;
  const toppingsLength = toppings.length;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: pieSlice,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const toppingsPrice =
    toppingsLength > 3 ? (toppingsLength - 3) * toppingsGeneralPrice : 0;

  const totalPrice = toppingsPrice + crust.price + size.price;

  const handleConfirmation = useCallback(() => {
    setIsConfirmed(true);
  }, []);

  useEffect(() => {
    currentStep !== step && setIsConfirmed(false);
  }, [currentStep, step]);

  useEffect(() => {
    setIsOrderFinished(
      toppings.length >= 3 && size.length !== 0 && crust.length !== 0
    );
  }, [toppings, size, crust]);

  return (
    <Container>
      {isCurrentStep ? (
        <>
          <div>
            <h3>Your pizza pie</h3>
            <div>
              <h5>{`Size - ${size.name || 'not picked'}`}</h5>
              <span>{`$${size.price || 0}`}</span>
            </div>
            <div>
              <h5>{`Crust - ${crust.name || 'not picked'}`}</h5>

              <span>{`$${crust.price || 0}`}</span>
            </div>
            <div>
              <h5>{`Toppings - $${toppingsPrice}`}</h5>

              <ul>
                {toppings.map((topping: PizzaItem) => (
                  <li key={topping.name}>{topping.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <span>{`Total price: $${totalPrice || 0}`}</span>
            </div>

            <div className="confirmation-button">
              <Button
                variant="contained"
                type="button"
                onClick={handleConfirmation}
              >
                Confirm
              </Button>
            </div>
          </div>
          {isConfirmed && (
            <div className="confirmation-container">
              <Typography>Your order is confirmed. Enjoy your pie!</Typography>
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          )}
        </>
      ) : null}
    </Container>
  );
};

export default ToppingsSelection;
