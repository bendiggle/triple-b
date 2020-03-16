import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '../../components/Layout';
import AddSelectionInfo from './components/AddSelectionInfo';
import AddBetInfo from "./components/AddBetInfo";

const players = [{
  name: 'BD'
}, {
  name: 'SF'
}, {
  name: 'LA'
}, {
  name: 'JM'
}];

const setDefaultValues = players => {
  const blah = {
    totalBets: '',
    winningBets: '',
    playerCostWin: ''
  };
  players.forEach(player => {
    blah[player.name] = {
      selections: '',
      winningSelections: ''
    }
  });
  return blah;
};


const sections = [
  ({ onChange }) => <AddSelectionInfo onChange={onChange}/>,
  ({ onChange })=> <AddBetInfo onChange={onChange}/>
];

// ENTER DATE -> DATEPICKER
// BREADCRUMBS
// YUP VALIDATION

// SECTIONS = list players and add individually (some might have different selections)
// ADD void bets (switch)
// ADD if one bet cost win

// POSSIBLE TO DO MU


// Go to Add new Selections
// 1. add date
// 2. Displays date -> Add new bet
// 3. Add bet name
// 4. DONE - Add Selections and winning selections
// 5. DONE - Add total bets and total winning bets ANd any slections cost winning bets ( list of all

const AddNewSelection = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [sectionNumber, setSectionNumber] = useState(0);
  const [fieldValues, setFieldValues] = useState(setDefaultValues(players));
  const Section = sections[sectionNumber];
  const meow = (value, field) => {
    console.log('value, field', value, field);
    const blah = Object.assign({}, fieldValues);
    blah[field] = value;
    setFieldValues(blah);
  };
  const submitSelections = () => {
    console.log('SUBMIT', );
  };
  console.log('selection Values', fieldValues);
  return (
    <Layout header="Add New">
      <Section onChange={meow}/>
      <div>
        {sectionNumber > 0 && (
          <Button
            color="secondary"
            style={{ float: 'left' }}
            onClick={() => setSectionNumber(sectionNumber - 1)}
          >
            Previous
          </Button>
        )}
        {sectionNumber < sections.length - 1 ? (
          <Button
            color="primary"
            style={{ float: 'right' }}
            onClick={() => setSectionNumber(sectionNumber + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            style={{ float: 'right' }}
            color="primary"
            type="submit"
            onClick={() => submitSelections()}
          >
            Submit
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default AddNewSelection;