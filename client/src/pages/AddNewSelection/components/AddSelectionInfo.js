import React, { useState } from 'react';
import { TextField, Switch } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { unit } from '../../../theme';

const useStyles = makeStyles({
  textInput: {
    width: '100%',
    marginBottom: unit(1)
  }
});

const setDefaultDisplay = players => {
  const defaultDisplay = {};
  players.forEach(player => {
    defaultDisplay[player.id] = false
  });
  return defaultDisplay;
};

const AddSelectionInfo = ({ setFieldValue, values, players }) => {
  const classes = useStyles();
  const [displayFields, setDisplayFields] = useState(setDefaultDisplay(players));

  const setDisplayField = (player, display) => {
    const meow = Object.assign({}, displayFields);
    meow[player] = display;
    setDisplayFields(meow);
  };

  const onChange = (userId, field, value) => {
    const newValues = values.selections.slice();
    const index = newValues.findIndex(selection => selection.userId === userId);
    newValues[index][field] = value;
    setFieldValue({
      ...values,
      selections: newValues
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {players.map(player => (
        <div
          key={player.name}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p>{player.name}</p>
            <Switch onChange={e => setDisplayField(player.id, e.target.checked)}/>
          </div>
          <div style={{ marginBottom: unit(2) }}>
            {displayFields[player.id] && (
              <>
                <TextField
                  className={classes.textInput}
                  id={`${player.id}-totalSelections`}
                  name={`${player.id}-totalSelections`}
                  label={`Enter selections`}
                  type="number"
                  onChange={e => {
                    onChange(player.id, 'totalSelections', e.target.value);
                  }}
                />
                <TextField
                  className={classes.textInput}
                  id={`${player.id}-winningSelections`}
                  name={`${player.id}-winningSelections`}
                  label={`Enter winning selections`}
                  type="number"
                  onChange={e => {
                    onChange(player.id, 'winningSelections', e.target.value);
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