import React from 'react';
import { CheckboxProps, CheckboxesGroup } from '../Checkbox';
import { usePizzaContext } from '../../contexts/PizzaContext';

// import { Container } from './styles';

interface CrustSelectionProps extends CheckboxProps {
  step: number;
  currentStep: number;
}

const CrustSelection: React.FC<CrustSelectionProps> = ({
  step,
  currentStep,
  legend,
  field,
  handleChoice,
}) => {
  const isCurrentStep = step === currentStep;
  const [pizzaOrder] = usePizzaContext();
  const selectedCrust = pizzaOrder.crust.name;

  return (
    <div>
      {isCurrentStep ? (
        <CheckboxesGroup
          legend={legend}
          field={field}
          handleChoice={handleChoice}
          selectedField={selectedCrust}
        />
      ) : null}
    </div>
  );
};

export default CrustSelection;
