import React, { Component } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { getPotRunOverview } from '../actions/PotStillAction'

class BigPotRunInitiation extends Component {
    state = {
        forcedTerminationTime:40,
        userSelectedGinRun:true
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.startPotRun = this.startPotRun.bind(this);
    }

    startPotRun() {
        let potStillInitiatingValues = JSON.stringify({forcedTerminationTime:this.state.forcedTerminationTime, typeOfRun:'Large Stripping'});
        axios.post('http://' + process.env.REACT_APP_PHIDGET_SERVER + '/setpot', {
            potStillInitiatingValues
        }).then(res => {
            let message = res.data.message;
            this.setState({message:message})
        })
    }

    render() {
        return (
            <div>
                <Paper>
                    <TextField
                        id="forcedTerminationTime"
                        name="forcedTerminationTime"
                        label="Time for the run"
                        defaultValue="40"
                        helperText="hours"
                        margin="normal"
                        onChange={this.onChange}
                    />
                    <br/>
                    <Button variant='contained' color='primary' onClick={this.startPotRun}> Start Big Pot </Button>
                </Paper>
            </div>
        )
    }
}

// BigPotRunInitiation.propTypes = {
//     getPotRunOverview: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//     serverPotOverview: state.potStill.serverPotOverview
// })

// export default connect(mapStateToProps, { getPotRunOverview })(BigPotRunInitiation);
export default BigPotRunInitiation;