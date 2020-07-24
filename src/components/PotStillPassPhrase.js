import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PotStillButtons from "./PotStillButtons";
const crypto = require('../utils/crypto');

class PotStillPassPhrase extends Component {
  state = {
    enteredPassPhrase: "",
    currentPassPhrase: process.env.REACT_APP_PASSWORD
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div>
        <Paper>
          <TextField
            id="enteredPassPhrase"
            name="enteredPassPhrase"
            label="Passphrase"
            defaultValue=""
            helperText="Please enter the passphrase"
            margin="normal"
            type="password"
            onChange={this.onChange}
          />
          <br />
          {crypto.checkPassword(this.state.enteredPassPhrase, this.state.currentPassPhrase) ? (
            <PotStillButtons />
          ) : (
            <div />
          )}
        </Paper>
      </div>
    );
  }
}

export default PotStillPassPhrase;
