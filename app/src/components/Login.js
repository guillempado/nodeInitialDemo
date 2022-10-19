import React, { Component } from "react";

import AuthService from "../services/Auth";

import { withRouter } from '../common/with-router';

const required = value => {
    if (!value) {
        return (
            <div className = "alert alert-danger"
                 role = "alert" >
                This field is required! </div >
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            error: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();  // Necessari per evitar comportament per defecte del html form on submit (redirect, reload...)
        console.log("Submit!")  // Funciona!

        /*
        e.preventDefault();

        this.setState({
            error: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.router.navigate("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        error: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }

         */
    }

    render() {
        return (
            <div>
                {/* TODO imatge de background difuminada: https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2015/05/english-for-chatting-768x512.jpg */}

                {/* TODO Bootstrap per validations (en comptes d react-validation): https://getbootstrap.com/docs/5.0/forms/validation/ */}

                {/* TODO El card que tinc a custom css ara mateix, passar-lo a fer amb classes de bootstrap */}

                {/* TODO Centrar el card de login a la pàgina */}


                <form className="card card-container" onSubmit={this.onSubmit}>

                    {/* TODO treure inlines i posar-ho tot en el CSS a part */}
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    <br/>
                    <div className = "form-group" >
                        <label htmlFor = "login_email" >Email address</label >
                        <input type = "email"
                               className = "form-control"
                               id = "login_email"
                               aria-describedby = "emailHelp"
                               placeholder = "Enter email"
                               onChange={this.onChangeUsername}
                               required ></input >
                        <small id = "emailHelp"
                               className = "form-text text-muted" >We'll never share your email with anyone else.</small >
                    </div >
                    <div className = "form-group" >
                        <label htmlFor = "login_password" >Password</label >
                        <input type = "password"
                               className = "form-control"
                               id = "login_password"
                               placeholder = "Password"
                               onChange={this.onChangePassword}
                               required></input >
                    </div >
                    <br/><br/>
                    {this.state.error && (<div className = "alert alert-danger alert-dismissible fade show" >
                        {this.state.error}
                        <button type = "button"
                                className = "btn"
                                data-bs-dismiss = "alert" ></button >
                    </div >)}
                    <button type = "submit"
                            className = "btn btn-primary" >Submit
                    </button >
                </form >
            </div>

        );
    }
}

export default withRouter(Login);