import React from 'react';
import { CheckboxProps, CheckboxesGroup } from '../Checkbox';
import { usePizzaContext } from '../../contexts/PizzaContext';

// import { Container } from './styles';

interface SizeSelectionProps extends CheckboxProps {
  step: number;
  currentStep: number;
}

const SizeSelection: React.FC<SizeSelectionProps> = ({
  step,
  currentStep,
  legend,
  field,
  handleChoice,
}) => {
  const isCurrentStep = step === currentStep;
  const [pizzaOrder] = usePizzaContext();
  const selectedSize = pizzaOrder.size.name;

  return (
    <div>
      {isCurrentStep ? (
        <CheckboxesGroup
          legend={legend}
          field={field}
          handleChoice={handleChoice}
          selectedField={selectedSize}
        />
      ) : null}
    </div>
  );
};

export default SizeSelection;
