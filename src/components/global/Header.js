import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');
        const tokenIsValid = localStorage.getItem('tokenIsValid');

        this.state = {
            token: token,
            tokenIsValid: tokenIsValid
        }
    }

    componentWillMount() {

        const checkTokenEndpoint = '/authenticate/current_user/';

        const token = localStorage.getItem('token');

        axios({
            method: 'get',
            url: checkTokenEndpoint,
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token'),
                Accept: 'application/json'
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {
                localStorage.setItem('tokenIsValid', true)
                this.setState(
                    {tokenIsValid: true}
                );
            } else {
                localStorage.setItem('tokenIsValid', null)
                this.setState(
                    {tokenIsValid: null}
                );
            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })

    }
    
    render() {
        return (
            <header>
                <div id="header-inner">
                    <div id="header-title-container">
                        <Link to="/"><h1>The Next Step</h1></Link>
                    </div>
                    <nav>
                        <NavLink to="/" activeClassName="is-active" exact={true}> Home </NavLink>
                        <NavLink to="/contact" activeClassName="is-active" exact={true}> Contact </NavLink>
                        {
                            this.state.tokenIsValid ? <NavLink to="/dashboard" activeClassName="is-active" exact={true}> Dashboard </NavLink> : <NavLink to="/my_account" activeClassName="is-active" exact={true}>Login/Register </NavLink>
                        }
                          
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;