import React from 'react';
import { CheckboxProps, CheckboxesGroup } from '../MultiCheckbox';
import { usePizzaContext } from '../../contexts/PizzaContext';

// import { Container } from './styles';

interface ToppingsSelectionProps extends CheckboxProps {
  step: number;
  currentStep: number;
}

const ToppingsSelection: React.FC<ToppingsSelectionProps> = ({
  step,
  currentStep,
  legend,
  field,
  handleChoice,
}) => {
  const isCurrentStep = step === currentStep;
  const [pizzaOrder] = usePizzaContext();
  const pizzaSize = pizzaOrder.size.name;

  const maxItems = ((): number => {
    switch (pizzaSize) {
      case 'small':
        return 5;

      case 'medium':
        return 7;

      case 'large':
        return 9;

      default:
        return 0;
    }
  })();

  const selectedToppings = pizzaOrder.toppings;

  return (
    <div>
      {isCurrentStep ? (
        <CheckboxesGroup
          legend={legend}
          field={field}
          handleChoice={handleChoice}
          selectedField={selectedToppings}
          maxItems={maxItems}
        />
      ) : null}
    </div>
  );
};

export default ToppingsSelection;
