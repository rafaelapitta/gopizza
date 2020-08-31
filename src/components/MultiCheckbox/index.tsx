import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { PizzaItem } from '../../contexts/PizzaContext/types';
import { usePizzaContext } from '../../contexts/PizzaContext';
import { PizzaSelectionActionTypes } from '../../contexts/PizzaContext/types';

import { ItemContainer } from './styles';

export interface CheckboxProps {
  legend: string;
  field: ItemProps[];
  handleChoice: Dispatch<SetStateAction<PizzaItem[]>>;
  selectedField?: PizzaItem[];
  maxItems?: number;
  step?: number;
}

interface ItemProps {
  name: string;
  price: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

const CheckboxesGroup: React.FC<CheckboxProps> = ({
  legend,
  field,
  handleChoice,
  selectedField,
  maxItems,
}) => {
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = useState<PizzaItem[]>([]);
  const [extraToppings, setExtraToppings] = useState<PizzaItem[]>([]);
  const [isError, setIsError] = useState(false);
  const [itemsLeft, setItemsLeft] = useState(maxItems);
  const [, dispatch] = usePizzaContext();
  const selectedItemsNames = selectedItems.map(
    (topping: PizzaItem) => topping.name
  );
  const selectedExtraToppingsNames = extraToppings.map(
    (topping: PizzaItem) => topping.name
  );

  const handleChange = (index: number): void => {
    const selectedItem = field[index];
    const alreadySelectedItems = selectedItems;

    const isSelected = alreadySelectedItems.some((item) => {
      return item.name === selectedItem.name;
    });

    if (isSelected) {
      const updatedSelectedItems = alreadySelectedItems.filter(
        (item) => item.name !== selectedItem.name
      );
      const updatedExtraToppings = extraToppings.filter(
        (item) => item.name !== selectedItem.name
      );

      if (selectedItems.length >= 3) {
        setSelectedItems([...updatedSelectedItems]);
        setExtraToppings([...updatedExtraToppings]);
      } else {
        setSelectedItems([...updatedSelectedItems]);
      }

      (itemsLeft || itemsLeft === 0) && setItemsLeft(itemsLeft + 1);

      isError && setIsError(false);
    } else if (maxItems === selectedItems.length) {
      setIsError(true);
    } else {
      if (selectedItems.length >= 3) {
        setSelectedItems([...alreadySelectedItems, selectedItem]);
        setExtraToppings([...extraToppings, selectedItem]);
      } else {
        setSelectedItems([...alreadySelectedItems, selectedItem]);
      }

      itemsLeft && setItemsLeft(itemsLeft - 1);
    }
  };

  const anyItemSelected = Object.keys(selectedItems).length !== 0;

  useEffect(() => {
    if (selectedField) {
      setSelectedItems(selectedField);
    }
  }, [selectedField]);

  useEffect(() => {
    if (anyItemSelected) {
      handleChoice(selectedItems);
    }
  }, [selectedItems, handleChoice, anyItemSelected]);

  useEffect(() => {
    dispatch({
      type: PizzaSelectionActionTypes.SWITCH_ERROR,
      payload: selectedItems.length < 3,
    });
  }, [selectedItems.length, dispatch]);

  return (
    <>
      <div className={classes.root}>
        <FormControl
          // required
          error={isError}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">{legend}</FormLabel>
          <FormGroup>
            {field &&
              field.map((item, index) => (
                <FormControlLabel
                  control={(
                    <ItemContainer
                      disabled={
                        !selectedItemsNames?.includes(item.name) && isError
                      }
                    >
                      <img
                        src={`../images/${item.name}.jpeg`}
                        alt={item.name}
                      />
                      <Checkbox
                        checked={selectedItemsNames.includes(item.name)}
                        onChange={() => handleChange(index)}
                        name={item.name}
                      />
                    </ItemContainer>
                  )}
                  label={`${item.name.split(/(?=[A-Z])/).join(' ')}${
                    extraToppings.length !== 0 &&
                      selectedExtraToppingsNames.includes(item.name)
                      ? ` - $${item.price}`
                      : ''
                    }`}
                  key={item.name + item.price}
                  disabled={!selectedItemsNames?.includes(item.name) && isError}
                />
              ))}
          </FormGroup>
          {isError && <FormHelperText>Max toppings reached</FormHelperText>}
          <Typography>{`You have ${itemsLeft} toppings`}</Typography>
        </FormControl>
      </div>
    </>
  );
};

export { CheckboxesGroup };
