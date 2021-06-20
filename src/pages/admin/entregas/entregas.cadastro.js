import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import MenuAdmin from '../../../components/menu-admin';
import Copy from '../../../components/copyright'

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  toolbar: {paddingRight: 24,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 15,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  Grid:{align: 'center'},
  Button: {margin: theme.spacing(1)}
}));

//Caminho -> http://localhost:3000/entregas/cadastar

export default function Usuario_Cadastrar() {
  const classes = useStyles();
  const [nomeCliente, setNomeCliente] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');

  async function handleSubmit(){
    const data = {
      nomeCliente:nomeCliente,
      dataEntrega:dataEntrega,
      pontoPartida:pontoPartida,
      pontoDestino:pontoDestino}

      if(nomeCliente!=='' && dataEntrega!=='' && pontoPartida!=='' && pontoDestino!==''){
        const response = await api.post('/entregas',data)
        if(response.status===201){
          window.location.href='/entregas'
        }else{
          alert('Erro ao cadastrar a entrega!')
        }
      }else{
        alert('Por favor, preencha todos os dados!')
      }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'ENTREGAS'}/>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={30} sm={12}>
              <Paper  className={classes.paper}>
                <h2>Cadastro de entregas</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome_cliente"
                      name="nome_cliente"
                      label="Nome do cliente"
                      fullWidth
                      autoComplete="Nome-do-cliente"
                      value={nomeCliente}
                      onChange={e=>setNomeCliente(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type= "date"
                      id="data_entrega"
                      name="data_entrega"
                      label="Data de entrega"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="data-de-entrega"
                      value={dataEntrega}
                      onChange={e=>setDataEntrega(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="P_Partida"
                      name="P_Partida"
                      label="Ponto de Partida"
                      fullWidth
                      autoComplete="Ponto-de-partida"
                      value={pontoPartida}
                      onChange={e=>setPontoPartida(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="P_Destino"
                      name="P_Destino"
                      label="Ponto de Destino"
                      fullWidth
                      autoComplete="Ponto-de-Destino"
                      value={pontoDestino}
                      onChange={e=>setPontoDestino(e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <Button className={classes.Button}variant="contained" color="primary" onClick={handleSubmit}>
                      Cadastrar
                    </Button>
                    <Button className={classes.Button}variant="contained" color="primary" href="/entregas">
                      Voltar
                    </Button>
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