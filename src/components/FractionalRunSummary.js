import React from 'react';
import Typography from '@material-ui/core/Typography';


const fractionalRunSummary = (props) => {
  const headlineStyle = {
    width: '100%',
    textAlign: 'center'
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '10px'
  };

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  };

  return (
    <div>
      <div style={gridStyle}>
        <Typography variant="headline" component="h3" style={headlineStyle}>Input</Typography>
        <Typography component="span" style={cellStyle}>Start time: {(new Date(props.runData.starttime)).toLocaleString()}</Typography>
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
    </div>
  )
}

export default fractionalRunSummary;
