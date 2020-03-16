import React from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const CREATE_USER = gql`
    mutation createUser($name: String!) {
        createUser(name: $name) {
            name
        }
    }
`;

const AddUser = () => {
  const [createUser, { error }] = useMutation(CREATE_USER);
  return (
    <div>
      <h1>Add User</h1>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={async (values) => {
          console.log('SUBMIT', values);
          try {
            await createUser({ variables: { name: values.username }});
          } catch (err) {
            console.error(err);
          }
        }}
        render={formProps => (
          <Form>
            <TextField
              id="username"
              name="username"
              label="Username"
              margin="normal"
              onChange={e => formProps.setFieldValue('username', e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create User
            </Button>
          </Form>
        )}
      />
    </div>
  )
};

export default AddUser;
