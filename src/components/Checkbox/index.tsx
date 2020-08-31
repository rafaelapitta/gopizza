import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { usePizzaContext } from '../../contexts/PizzaContext';
import { PizzaSelectionActionTypes } from '../../contexts/PizzaContext/types';

export interface CheckboxProps {
  legend: string;
  field: ItemProps[];
  handleChoice: Dispatch<SetStateAction<ItemProps>>;
  selectedField?: string;
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
}) => {
  const classes = useStyles();
  const [, dispatch] = usePizzaContext();

  const [selectedItems, setSelectedItems] = React.useState<ItemProps>(
    {} as ItemProps
  );

  const handleChange = (index: number): void => {
    const selectedItem = field[index];

    setSelectedItems({
      ...selectedItem,
    });
  };

  const isSelected = Object.keys(selectedItems).length !== 0;

  useEffect(() => {
    if (isSelected) {
      handleChoice(selectedItems);
    }
  }, [selectedItems, handleChoice, isSelected]);

  const error = selectedField === undefined;

  useEffect(() => {
    dispatch({
      type: PizzaSelectionActionTypes.SWITCH_ERROR,
      payload: error,
    });
  }, [error, dispatch]);

  return (
    <div className={classes.root}>
      <FormControl
        // required
        error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          {field &&
            field.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.name === selectedField}
                    onChange={() => handleChange(index)}
                    name={item.name}
                  />
                }
                label={`${item.name} - $${item.price}`}
                key={item.name + item.price}
              />
            ))}
        </FormGroup>
        <FormHelperText>Choose at least one item</FormHelperText>
      </FormControl>
    </div>
  );
};

export { CheckboxesGroup };
