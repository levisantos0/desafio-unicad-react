import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom'


//Entregas
import Dashboard from './pages/admin/dashboard';

import entregas from './pages/admin/entregas/'
import entregasCadastrar from './pages/admin/entregas/entregas.cadastro'
import entregasEditar from './pages/admin/entregas/entregas.editar'


export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            {/* Rotas */}
            <Route path='/' exact component={Dashboard}/>
            <Route path='/entregas' exact component={entregas}/>
            <Route path='/entregas/cadastrar' exact component={entregasCadastrar}/>
            <Route path='/entregas/editar/:idEntrega' exact component={entregasEditar}/>
        </Switch>
        </BrowserRouter>
    )
}
