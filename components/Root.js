import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  Checkbox,
  TextField,
} from 'redux-form-material-ui';
import * as actions from '../actions';
import * as constants from '../config/constants';

// https://github.com/mui-org/material-ui/issues/10982#issuecomment-424269663
const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    flexGrow: 1,
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
});

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.fetchTodo = this.fetchTodo.bind(this);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  fetchTodo() {
    const { idToSearch, dispatch } = this.props;
    dispatch(actions.fetchTodo(idToSearch));
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                This is an example of Next.js setup.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Field name="idToSearch" component={TextField} label="Todo ID"/>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" onClick={this.fetchTodo}>Load</Button>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={3}>
              <Field name="todo.id" component={TextField} disabled label="ID"/>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel control={<Field name="todo.completed" component={Checkbox} /> } label="completed?" />
            </Grid>
            <Grid item xs={6}>
              <Field name="todo.title" component={TextField} label="Title"/>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

export default connect(
  (state) => {
    // https://redux-form.com/8.1.0/docs/api/formvalueselector.md/
    const selector = formValueSelector(constants.REDUX_FORM_NAME);
    return {
      idToSearch: selector(state, 'idToSearch'),
    };
  }
)(reduxForm({
  // a unique name for the form
  form: constants.REDUX_FORM_NAME,
})(withStyles(styles)(Root)));
