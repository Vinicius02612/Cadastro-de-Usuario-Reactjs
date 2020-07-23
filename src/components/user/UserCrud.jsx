import React, {Component} from 'react'
import Axios from 'axios'
import Main from '../tamplet/Main'

const headerProps = {
    icon:'users',
    title:'Usuarios',
    subtitle:'Cadastro de Usuários: Incluir, Listar, Aterar e Excluir.'
}

//acessando o base de dados no backend
const baseUrl = 'http://localhost:3001/users'

//defindo o estado inicial do componente
const initialState ={
    user:{name:'', email:''},
    list: []
}

export default class UserCrud extends Component{

    state ={...initialState}

    //essa funçao sera chamanda quando um componente for exibido da tela...
    componentWillMount(){
        Axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }


    //Metodo limpar usuario
    clear(){
        this.setState({user:initialState.user})
    }

    //salvando um novo usuario no sistema.
    save(){

        const user = this.state.user

        //se o id do usuário for verdadeiro alterar o usuario caso contrario incluar o usuario
        const method = user.id ?'put':'post'

        //se a url estivar alterada passe o id do usuario alterado, se nao, nao altere a url
        const url = user.id ? `${baseUrl}/${user.id}`: baseUrl

          //mostrando usuario que foi aloterado
        Axios[method](url, user)
            .then(resp =>{
                const list = this.getUpadatedList(resp.data)
                this.setState({user:initialState.user, list})
            })
    }

    //atualizando a lista
    getUpadatedList(user){
        const list = this.state.list.filter(u => u.id !==user.id)
        list.unshift(user)
        return list
    }
    //funcaao pra atualizar os campos
    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    //funcao pra renderizar o formulario
    renderForm(){
        return(
            <div className="form">
                <div className="rows">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <table>Nome</table>
                            <input type="text" className ="form-control" name="name" 
                            value={this.state.user.name}
                            onChange ={ e=>this.updateField(e)}
                            placeholder ="Digite seu nome..."/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6" >
                        <div className="form-group">
                            <label > E-mail</label>
                            <input type="text" className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite seu e-mail"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary "
                            onClick={e=> this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    //carregando usários
    load(user){
        this.setState({user})
    }
    

    //removendo usuário da lista
    remove(user){
        Axios.delete(`${baseUrl}/${user.id}`).then(resp =>{
            const list = this.state.list.filter(u =>u !==user)
            this.setState({ list })
        })
    }

    //funcao pra renderizar as tabelas
    renderTabel(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    //mapeando a lista de usarios pra dentro do objeto
    renderRows(){
        return this.state.list.map(user =>{
            return(
                <tr key ={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className ="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-3"
                            onClick={() => this.remove(user)}>
                            <i className ="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>   
            )
        })
        
    }
    

    render(){
        console.log(this.state.list)
        return (
        
            <Main {...headerProps }>
                <p className="d-flex justify-content-center  font-weight-bold">Cadastrar</p>              
                {this.renderForm()}
                {this.renderTabel()}
            </Main>
        )
    }
}