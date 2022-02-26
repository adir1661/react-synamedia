import React from 'react';
import { TreeView } from './features/nodes/TreeView';
import './App.css';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Container, Grid } from '@mui/material';

const useStyles = makeStyles({
  paper: {
    overflow:'hidden',
    // margin: 'auto',
    height: '90vh',
    // width: '50vw'
    padding:'15px'
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Paper className={classes.paper}>
            <Grid xs={4}>
              <TreeView />
            </Grid>
          </Paper>
        </Container>
      </header>
    </div>
  );
}

export default App;
