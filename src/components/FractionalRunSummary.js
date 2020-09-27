import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const fractionalRunSummary = (props) => {
  const headlineStyle = {
    width: '100%',
    textAlign: 'center'
  };

  const cellStyle = {
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px'
  };

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  };

  const fullWidthCell = {
    width: '100%',
    margin: '25px'
  }

  const hasResult = props.runData.result && props.runData.result.heartsVolume && props.runData.result.heartsPercent;

  const tempRun = props.runData.input.startAlcohol && props.runData.input.startVolume;

  return (
    <div>
      {tempRun ?
      <div style={gridStyle}>
        <Typography variant="headline" component="h3" style={headlineStyle}>Input</Typography>
        <Typography component="span" style={cellStyle}>Start time: {(new Date(props.runData.starttime)).toLocaleString()}</Typography>
        <Typography component="span" style={cellStyle}>End time: {props.runData.endtime ? (new Date(props.runData.endtime)).toLocaleString(): ''}</Typography>
        <Typography component="span" style={cellStyle}>Start volume: {props.runData.input.startVolume}</Typography>
        <Typography component="span" style={cellStyle}>Start alcohol: {props.runData.input.startAlcohol}</Typography>
        <Typography component="span" style={cellStyle}>Percent methanol: {props.runData.input.methanolPercent}</Typography>
        <Typography component="span" style={cellStyle}>Percent heads: {props.runData.input.volumeHeadsPercent}</Typography>
        <Typography component="span" style={cellStyle}>Percent tails: {props.runData.input.volumeTailsPercent}</Typography>
        <Typography component="span" style={cellStyle}>Collection coefficient: {props.runData.input.collectionCoefficient}</Typography>
        <Typography component="span" style={cellStyle}>Last fraction for heads: {props.runData.input.lastFractionForHeads}</Typography>
        <Typography component="span" style={cellStyle}>Last fraction for hearts: {props.runData.input.lastFractionForHearts}</Typography>
        <Typography component="span" style={cellStyle}>Preheat temperature: {props.runData.input.preHeatEndTemperature}</Typography>
        <Typography component="span" style={cellStyle}>Preheat time limit: {props.runData.input.preHeatTime}</Typography>
      </div>
      :
      <div style={gridStyle}>
        <Typography variant="headline" component="h3" style={headlineStyle}>Input</Typography>
        <Typography component="span" style={cellStyle}>Start time: {(new Date(props.runData.starttime)).toLocaleString()}</Typography>
        <Typography component="span" style={cellStyle}>End time: {props.runData.endtime ? (new Date(props.runData.endtime)).toLocaleString(): ''}</Typography>
        <Typography component="span" style={cellStyle}>Heads temperature: {props.runData.input.headsTemp}</Typography>
        <Typography component="span" style={cellStyle}>Heads time: {props.runData.input.headsTime}</Typography>
        <Typography component="span" style={cellStyle}>Hearts temperature: {props.runData.input.heartsTemp}</Typography>
        <Typography component="span" style={cellStyle}>Hearts time: {props.runData.input.heartsTime}</Typography>
        <Typography component="span" style={cellStyle}>Preheat temperature: {props.runData.input.preHeatEndTemperature}</Typography>
        <Typography component="span" style={cellStyle}>Preheat time limit: {props.runData.input.preHeatTime}</Typography>
      </div>
      }
      {hasResult ?
        <div style={gridStyle}>
          <Typography variant="headline" component="h3" style={headlineStyle}>Result</Typography>
          <Typography component="span" style={cellStyle}>Heads alcohol volume: {props.runData.result.headsVolume}</Typography>
          <Typography component="span" style={cellStyle}>Heads alcohol percent: {props.runData.result.headsPercent}</Typography>
          <Typography component="span" style={cellStyle}>Hearts alcohol volume: {props.runData.result.heartsVolume}</Typography>
          <Typography component="span" style={cellStyle}>Hearts alcohol percent: {props.runData.result.heartsPercent}</Typography>
          <Typography component="span" style={cellStyle}>Tails alcohol volume: {props.runData.result.tailsVolume}</Typography>
          <Typography component="span" style={cellStyle}>Tails alcohol percent: {props.runData.result.tailsPercent}</Typography>
          <Typography component="span" style={cellStyle}>Notes: {props.runData.result.notes}</Typography>
        </div>
      :
        <div style={gridStyle}>
          <Typography variant="headline" component="h3" style={headlineStyle}>Need Result</Typography>
          <TextField
              id="headsVolume"
              name="headsVolume"
              label="Heads alcohol volume"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="headsPercent"
              name="headsPercent"
              label="Heads alcohol percentage"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="heartsVolume"
              name="heartsVolume"
              label="Hearts alcohol volume"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="heartsPercent"
              name="heartsPercent"
              label="Hearts alcohol percentage"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="tailsVolume"
              name="tailsVolume"
              label="Tails alcohol volume"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="tailsPercent"
              name="tailsPercent"
              label="Tails alcohol percentage"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="notes"
              name="notes"
              label="Notes"
              defaultValue=""
              margin="normal"
              multiline
              rows={5}
              style={fullWidthCell}
              onChange={props.change}
          />
          <Button variant="contained" color="primary" onClick={props.click}>
              Save Result
          </Button>
        </div>
      }
    </div>
  )
}

export default fractionalRunSummary;
