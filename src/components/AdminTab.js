import React, { Component } from 'react'
import { FormControl, Button, Paper, Typography, TextField } from '../../node_modules/@material-ui/core';
const crypto = require('../utils/crypto');

class AdminTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({pass: e.target.value});
  }

  onClick() {
    const hashedPassword = crypto.hashPassword(this.state.pass);
    alert('Update REACT_APP_PASSWORD in .env with this value: ' + hashedPassword);
  }

  render() {
    return (
      <div>
        <Paper>
          <FormControl>
            <Typography variant="headline" component="h1">Admin Settings</Typography>
            <TextField id="admin_password" label="Set admin password" variant="filled" onChange={this.onChange}/>
            <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={this.onClick}>Submit</Button>
          </FormControl>
        </Paper>
      </div>
    )
  }
}

export default AdminTab;
