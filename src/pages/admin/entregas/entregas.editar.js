import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import MenuAdmin from '../../../components/menu-admin';
import Copy from '../../../components/copyright';
import { useParams } from 'react-router-dom';

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

//Caminho -> http://localhost:3000/entregas/cadastro-de-entregas

export default function Usuario_Cadastrar() {
  const classes = useStyles();
  const [nome_Cliente, setNome_cliente] = useState('');
  const [data_Entrega, setData_entrega] = useState('');
  const [P_Partida, setP_Partida] = useState('');
  const [P_Destino, setP_Destino] = useState('');

  const { idEntrega } = useParams();

  useEffect(()=>{
    async function getEntrega(){
      var response = await api.get('entregas/'+idEntrega)
      setNome_cliente(response.data.nomeCliente);
      setData_entrega(response.data.dataEntrega);
      setP_Partida(response.data.pontoPartida);
      setP_Destino(response.data.pontoDestino);
    }
    getEntrega();
  },[])

  const handleSubmit = async ()=>{
    const data = {
      nomeCliente:nome_Cliente,
      dataEntrega:data_Entrega,
      pontoPartida:P_Partida,
      pontoDestino:P_Destino,
      _id: idEntrega}

      console.log(data)

        const response = await api.put('/entregas',data);
        console.log(response)
        if(response.status===200){
          window.location.href='/entregas'
        }else{
          alert('Erro ao atualizar a entrega!')
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
                <h2>Atualização de entregas</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome_cliente"
                      name="nome_cliente"
                      label="Nome do cliente"
                      fullWidth
                      autoComplete="Nome-do-cliente"
                      value={nome_Cliente}
                      onChange={e=>setNome_cliente(e.target.value)}
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
                      value={data_Entrega}
                      onChange={e=>setData_entrega(e.target.value)}
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
                      value={P_Partida}
                      onChange={e=>setP_Partida(e.target.value)}
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
                      value={P_Destino}
                      onChange={e=>setP_Destino(e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <Button className={classes.Button}variant="contained" color="primary" onClick={handleSubmit}>
                      Salvar
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