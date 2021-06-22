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
import { toast } from 'react-toastify';
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

export default function Entregas_Atualizar(props) {
  const classes = useStyles();
  const [nomeCliente, setNomeCliente] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');

  const { idEntrega } = useParams();

  useEffect(()=>{
    async function getEntrega(){
      const response = await api.get(`entregas/${idEntrega}`)
      setNomeCliente(response.data.nomeCliente);
      setDataEntrega(response.data.dataEntrega);
      setPontoPartida(response.data.pontoPartida);
      setPontoDestino(response.data.pontoDestino);
    }
    getEntrega();
  },[idEntrega])

  const handleSubmit = async ()=>{
    const data = {
      nomeCliente:nomeCliente,
      dataEntrega:dataEntrega,
      pontoPartida:pontoPartida,
      pontoDestino:pontoDestino,
      _id: idEntrega}

      if (nomeCliente !== '' &&
      dataEntrega !== '' && 
      pontoPartida !== '' &&
      pontoDestino !== '') {
        const response = await api.put('/entregas',data);
        if(response.status===200){
          toast.success("Atualizado com sucesso!");
          props.history.push('/entregas')
        }else{
          toast.error("Erro ao atualizar a entrega!");
        }
      }else{
      toast.warn("Por favor, preencher todas as informações!");
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