import {Form, Formik} from "formik";
import {Button} from "@material-ui/core";
import Layout from "../../../components/Layout";
import React from "react";

const AddNewForm = () => (
  <Formik
    initialValues={{
      date: '',
      totalSelections: '',
      winningSelections: '',
      totalBets: '',
      winningBets: ''
    }}
    onSubmit={() => {}}
    render={formProps => {
      console.log(formProps.values);
      return displayForm ? (
        <Form>
          <QuestionInput setValue={formProps.setFieldValue}/>
          <div>
            {questionNumber > 0 && (
              <Button
                style={{ float: 'left' }}
                onClick={() => setQuestionNumber(questionNumber - 1)}
              >
                Previous
              </Button>
            )}
            {questionNumber < questionInputs.length - 1 ? (
              <Button
                style={{ float: 'right' }}
                onClick={() => setQuestionNumber(questionNumber + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                style={{ float: 'right' }}
                type="submit"
                onClick={() => setQuestionNumber(questionNumber + 1)}
              >
                Submit
              </Button>
            )}
          </div>
        </Form>
      ) : (
        <Button
          fullWidth
          onClick={() => setDisplayForm(true)}
        >
          Add New Bet
        </Button>
      )
    }}
  />
);

export default AddNewForm;
