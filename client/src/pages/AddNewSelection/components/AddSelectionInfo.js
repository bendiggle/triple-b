import React, { useState } from 'react';
import { TextField, Switch } from '@material-ui/core';
import {unit} from "../../../theme";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  textInput: {
    width: '100%',
    marginBottom: unit(1)
  }
});

const players = [{
  name: 'BD'
}, {
  name: 'SF'
}, {
  name: 'LA'
}, {
  name: 'JM'
}];

const setDefaultDisplay = players => {
  const blah = {};
  players.forEach(player => {
    blah[player.name] = false
  });
  return blah;
};

const setDefaultValues = players => {
  const blah = {};
  players.forEach(player => {
    blah[player.name] = {
      selections: '',
      winningSelections: ''
    }
  });
  return blah;
};

const AddSelectionInfo = ({ onChange }) => {
  const classes = useStyles();
  const [displayFields, setDisplayFields] = useState(setDefaultDisplay(players));
  const [fieldValues, setFieldValues] = useState(setDefaultValues(players));

  console.log(displayFields);

  const setDisplayField = (player, display) => {
    const meow = Object.assign({}, displayFields);
    meow[player] = display;
    setDisplayFields(meow);
  };

  const setFieldValue = (player, field, value) => {
    const meow = Object.assign({}, fieldValues);
    meow[player][field] = value;
    setFieldValues(meow);
    onChange(meow[player], player);
  };

  console.log('values', fieldValues);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {players.map(player => (
        <div
          key={player.name}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p>{player.name}</p>
            <Switch onChange={e => setDisplayField(player.name, e.target.checked)}/>
          </div>
          <div style={{ marginBottom: unit(2) }}>
            {displayFields[player.name] && (
              <>
                <TextField
                  className={classes.textInput}
                  id={`${player.name}-totalSelections`}
                  name={`${player.name}-totalSelections`}
                  label={`Enter selections`}
                  type="number"
                  onChange={e => {
                    console.log(e.target.value);
                    setFieldValue(player.name, 'selections', e.target.value);
                  }}
                />
                <TextField
                  className={classes.textInput}
                  id={`${player.name}-winningSelections`}
                  name={`${player.name}-winningSelections`}
                  label={`Enter winning selections`}
                  type="number"
                  onChange={e => {
                    console.log(e.target.value);
                    setFieldValue(player.name, 'winningSelections', e.target.value);
                  }}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddSelectionInfo;