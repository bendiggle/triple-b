import React, { useState } from 'react';
import { Switch, TextField, RadioGroup, Radio } from "@material-ui/core";

const players = [{
  name: 'BD'
}, {
  name: 'SF'
}, {
  name: 'LA'
}, {
  name: 'JM'
}];

const setDefaultFieldValues = () => ({
  totalBets: '',
  winningBets: '',
  playerCostWin: ''
});

const AddBetInfo = ({ onChange }) => {
  const [displaySingleSelectionField, setDisplaySingleSelectionField] = useState(false);
  const [fieldValues, setFieldValues] = useState(setDefaultFieldValues());

  const setFieldValue = (field, value) => {
    const meow = Object.assign({}, fieldValues);
    meow[field] = value;
    setFieldValues(meow);
    onChange(meow);
  };

  console.log(fieldValues);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="totalBets"
        name="totalBets"
        label="Enter total bets"
        type="number"
        onChange={e => setFieldValue('totalBets', e.target.value)}
        style={{ width: '100%' }}
      />
      <TextField
        id="winningBets"
        name="winningBets"
        label="Enter winning bets"
        type="number"
        onChange={e => setFieldValue('winningBets', e.target.value)}
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p>Single selection cost win?</p>
        <Switch onChange={e => {
          if (e.target.checked) setDisplaySingleSelectionField(e.target.checked);
          else {
            setFieldValue('playerCostWin', '');
            setDisplaySingleSelectionField(e.target.checked)
          }
        }}/>
      </div>
      {displaySingleSelectionField && (
        <RadioGroup>
          {players.map(player => (
            <div
              key={player.name}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <p>{player.name}</p>
              <Radio
                onChange={e => {
                  if (e.target.checked) setFieldValue('playerCostWin', player.name);
                  else setFieldValue('playerCostWin', '')
                }}
                checked={fieldValues.playerCostWin === player.name}
              />
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default AddBetInfo;
