import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const potRunSummary = (props) => {
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

  const hasResult = props.runData.result && props.runData.result.volume && props.runData.result.percent;

  return (
    <div>
      <div style={gridStyle}>
        <Typography variant="headline" component="h3" style={headlineStyle}>Input</Typography>
        <Typography component="span" style={cellStyle}>Start time: {(new Date(props.runData.starttime)).toLocaleString()}</Typography>
        <Typography component="span" style={cellStyle}>Forced termination time: {props.runData.input.forcedTerminationTime}</Typography>
        <Typography component="span" style={cellStyle}>Volume of hearts: {props.runData.input.volumeHearts}</Typography>
        <Typography component="span" style={cellStyle}>Alcohol percent: {props.runData.input.alcoholPercent}</Typography>
        <Typography component="span" style={cellStyle}>Juniper: {props.runData.input.juniper}</Typography>
        <Typography component="span" style={cellStyle}>Cardamonm: {props.runData.input.cardamonm}</Typography>
        <Typography component="span" style={cellStyle}>Coriander: {props.runData.input.coriander}</Typography>
        <Typography component="span" style={cellStyle}>Angelica: {props.runData.input.angelica}</Typography>
        <Typography component="span" style={cellStyle}>Orange: {props.runData.input.orange}</Typography>
        <Typography component="span" style={cellStyle}>Lemon: {props.runData.input.lemon}</Typography>
        <Typography component="span" style={cellStyle}>Type of run: {props.runData.input.typeOfRun}</Typography>
      </div>
      {hasResult ?
        <div style={gridStyle}>
          <Typography variant="headline" component="h3" style={headlineStyle}>Result</Typography>
          <Typography component="span" style={cellStyle}>Alcohol volume: {props.runData.result.volume}</Typography>
          <Typography component="span" style={cellStyle}>Alcohol percent: {props.runData.result.percent}</Typography>
          <Typography component="span" style={cellStyle}>Notes: {props.runData.result.notes}</Typography>
        </div>
      :
        <div style={gridStyle}>
          <Typography variant="headline" component="h3" style={headlineStyle}>Need Result</Typography>
          <TextField
              id="volume"
              name="volume"
              label="Alcohol volume"
              defaultValue=""
              margin="normal"
              style={cellStyle}
              onChange={props.change}
          />
          <TextField
              id="percent"
              name="percent"
              label="Alcohol percentage"
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

export default potRunSummary;
