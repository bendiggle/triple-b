import React, { useState } from 'react';
import { Switch, TextField, RadioGroup, Radio } from "@material-ui/core";

const AddBetInfo = ({ setFieldValue, values, players }) => {
  const [displaySingleSelectionField, setDisplaySingleSelectionField] = useState(false);

  const onChange = (field, value) => {
    setFieldValue({
      ...values,
      [field]: value
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="totalBets"
        name="totalBets"
        label="Enter total bets"
        type="number"
        onChange={e => onChange('totalBets', e.target.value)}
        style={{ width: '100%' }}
      />
      <TextField
        id="winningBets"
        name="winningBets"
        label="Enter winning bets"
        type="number"
        onChange={e => onChange('winningBets', e.target.value)}
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p>Single selection cost win?</p>
        <Switch onChange={e => setDisplaySingleSelectionField(e.target.checked)} />
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
                  if (e.target.checked) onChange('selectionCostWin', player.id);
                  else onChange('selectionCostWin', null)
                }}
                checked={values.selectionCostWin === player.id}
              />
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default AddBetInfo;
