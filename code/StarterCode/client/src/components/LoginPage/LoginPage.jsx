import React, { useState } from "react";
import MainHeader from "../MainHeader.jsx";
import homeBackground from './homeBackground1.jpg';
import { Image, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./layout.css";

const axios = require('axios');


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          error: '',
          response: ''
        };

      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
      this.setState({ error: '' });
    }

    handleLogin() {
      if (this.state.response == 'Failed') {
        console.log(this.state.response);
        this.setState({username: '', password:''});
        console.log(this.state.username);
        console.log(this.state.password);
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.username) {
        this.setState({ error: 'Username is required' });
      }
      if (!this.state.password) {
        this.setState({ error: 'Password is required' });
      }

      console.log(this.state.username);
      console.log(this.state.password);
      console.log(this.state.error);
      this.handleSend()
    }

    handleUserChange(e) {
      this.setState({
        username: e.target.value,
      });
    }

    handlePassChange(e) {
      this.setState({
        password: e.target.value,
      });
    }

    handleSend() {
      var user = this.state.username;
      var password = this.state.password
      var params = {
        username: user,
        password: password
      }
      axios.post('http://localhost:5000/login',{params}, {
        headers: {
          'content-type': 'application/json',
        }})
        .then(res => {
          this.setState({response: res.data});
          console.log(res);
          console.log(this.state.response);
          this.handleLogin();
      }).catch(function(error){
        console.error(error);
      });
    }

    render () {
      return (
        <div>
          <div>
            <MainHeader />
          </div>
          <div className="login-page">
            <div className="form">
              <form className="login-form" onSubmit={this.handleSubmit}>
              {
                this.state.error &&
                <p data-test="error" onClick={this.dismissError}>
                  <button onClick={this.dismissError}>✖</button>
                  {this.state.error}
                </p>
              }
                <input type="text" data-test="username" placeholder="username" value={this.state.username} onChange={this.handleUserChange} />
                <input type="password" data-test="password" placeholder="password" value={this.state.password} onChange={this.handlePassChange} />
                <input className="buttonbutton" type="submit" value="Sign In" data-test="submit"/>
                <p className="message">Not registered? <a href="/register">Create an account</a></p>
              </form>
            </div>
          </div>
        </div>
        
      )
    }
}

export default LoginPage;