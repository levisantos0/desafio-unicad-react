import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

import MenuAdmin from '../../../components/menu-admin';
import Copy from '../../../components/copyright'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 15,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  Button: {margin: theme.spacing(1)}
}));

export default function EntregasListagem() {
  const classes = useStyles();

  const [entregas, setEntregas] = useState([]);

  useEffect(()=>{
    async function loadEntregas(){
      await api.get("/entregas").then((response) => {
        console.log(response)
        setEntregas(response.data);
      });
    }
    loadEntregas()
  },[])

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir?")){
      var result = await api.delete('/entregas/'+id);
      if(result.status === 200){
        window.location.href = '/entregas';
      }else{
        alert('Ocorreu algum erro, tente novamente!')
      }
    }
  }


  return (
    <div className={classes.root}>
      <MenuAdmin title={'ENTREGAS'}/>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Paper  className={classes.paper}>
                <h2>Listagem de entregas</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome do cliente</TableCell>
                            <TableCell align="center">Data de entrega</TableCell>
                            <TableCell align="center">Ponto de partida</TableCell>
                            <TableCell align="center">Ponto de destino</TableCell>
                            <TableCell align="center">Data de cadastro</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {entregas.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.nomeCliente}
                              </TableCell>
                              <TableCell align="center">{row.dataEntrega}</TableCell>
                              <TableCell align="center">{row.pontoPartida}</TableCell>
                              <TableCell align="center">{row.pontoDestino}</TableCell>
                              <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button color="primary" href={'/entregas/editar/'+row._id}>Atualizar</Button>
                                  <Button color="secondary" onClick={()=>handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Grid>                  
                    <Button className={classes.Button}variant="contained" color="primary" href="/entregas/cadastrar">
                      Cadastrar uma nova entrega
                    </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copy />
          </Box>
        </Container>
      </main>
    </div>
  );
}