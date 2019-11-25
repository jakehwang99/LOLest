import React, { useState } from "react";
import MainHeader from "../MainHeader.jsx";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./layout.css";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          error: '',
        };

      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      // if (!this.state.username) {
      //   return this.setState({ error: 'Username is required' });
      // }
      // if (!this.state.password) {
      //   return this.setState({ error: 'Password is required' });
      // }

      console.log(this.state.username);
      console.log(this.state.password);
      console.log(this.state.error);
      this.handleSend()
    }

    handleSend() {

      let options = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST'
        };

        options.body = new FormData();
        options.body.append('username', this.state.username);
        options.body.append('pass', this.state.password);
        console.log(options.body.get('username'), options.body.get('pass'));

        fetch('http://localhost:5000/register', options)
          .then(response => console.log(response))
          .catch(error => console.error(error))
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

    render () {
      return (

        <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input type="text" data-test="username" placeholder="username" value={this.state.username} onChange={this.handleUserChange} />
              <input type="password" data-test="password" placeholder="password" value={this.state.password} onChange={this.handlePassChange} />
              <input className="buttonbutton" type="submit" value="Register" data-test="submit"/>
              <p className="message">Already registered? <a href="/login">Sign In</a></p>
            </form>
          </div>
        </div>
        
      )
    }
}

export default RegisterPage;