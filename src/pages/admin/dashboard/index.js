import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MenuAdmin from '../../../components/menu-admin';
import Copy from '../../../components/copyright'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  Grid:{
    align: 'center' 
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuAdmin title={'DASHBOARD'}/>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

          </Grid>
          <Box pt={4}>
            <Copy />
          </Box>
        </Container>
      </main>
    </div>
  );
}