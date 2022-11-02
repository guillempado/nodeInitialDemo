import React, { Component } from "react";
import { Link } from "react-router-dom";
import querystring from "querystring";
import User from '../common/User'
import GoogleConfig from '../google.config'

import { login, sendGoogleCode } from "../services/Auth";
import { withRouter } from '../common/with-router';


class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false
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

    getGoogleLoginUrl(e){
        const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const options = {
            redirect_uri: `http://localhost/login`,
            client_id: GoogleConfig.client_id,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile"
            ].join(" "),
        };

        return `${rootUrl}?${querystring.stringify(options)}`;
    }

    async onSubmit(e) {
        e.preventDefault();  // Necessari per evitar comportament per defecte del html form on submit (redirect, reload...)
        console.log("Submit!")  // Funciona?

        try {
            const response = await login(this.state.username, this.state.password);
            if(response.status === 200){
                console.log("Status 200")
                User.name = this.state.username;
                User.token = response.data.token;
                this.props.router.navigate("/chats");
                //window.location.reload();
            }
            else{
                console.log(response.data.error)
                this.setState({
                    error: response.data.error + "!"
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    // Si reps code de tornada de google OAuth, reenvia a servidor i autentica't
    async componentDidMount() {
        const search = this.props.location.search;
        const code = new URLSearchParams(search).get('code');
        if(code){
            try {
                const response = await sendGoogleCode(code);
                if(response.status === 200){
                    console.log("Status 200")
                    User.name = this.state.username;
                    User.token = response.data.token;
                    this.props.router.navigate("/chats");
                    //window.location.reload();
                }
                else{
                    console.log(response.data.error)
                    this.setState({
                        error: response.data.error + "!"
                    })
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    render() {
        return (
            <div >

                {/* TODO imatge de background difuminada: https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2015/05/english-for-chatting-768x512.jpg */}

                {/* TODO Bootstrap per validations (en comptes d react-validation): https://getbootstrap.com/docs/5.0/forms/validation/ */}

                {/* TODO El card que tinc a custom css ara mateix, passar-lo a fer amb classes de bootstrap */}

                {/* TODO Centrar el card de login a la pàgina */}


                <form className = "card card-container"
                      onSubmit = {this.onSubmit} >

                    {/*
                    <GoogleOAuthProvider clientId="<677782702791-v4mf9mf4uhg2l3e2oesi6kng582a2r4f.apps.googleusercontent.com>">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                    </GoogleOAuthProvider>
                    */}

                    {/* TODO treure inlines i posar-ho tot en el CSS a part */}
                    <h1 style = {{ textAlign: "center" }} >Login</h1 >
                    <br />
                    <div className = "form-group" >
                        <label htmlFor = "login_name" >User Name</label >
                        <input type = "text"
                               className = "form-control"
                               id = "login_name"
                               aria-describedby = "emailHelp"
                               placeholder = "Enter your user name"
                               onChange = {this.onChangeUsername}
                               required ></input >
                        <small id = "emailHelp"
                               className = "form-text text-muted" >Your name will be visible for all other users</small >
                    </div >
                    <div className = "form-group" >
                        <label htmlFor = "login_password" >Password</label >
                        <input type = "password"
                               className = "form-control"
                               id = "login_password"
                               placeholder = "Password"
                               onChange = {this.onChangePassword}
                               required ></input >
                    </div >
                    <br />
                    {this.state.error && (<div className = "alert alert-danger alert-dismissible fade show" style={{
                        textAlign: "center",
                        paddingLeft: 20,
                        paddingRight: 20
                    }} >
                        {this.state.error}
                    </div >)}
                    <button type = "submit"
                            className = "btn btn-primary" >Submit
                    </button >
                    <br />
                    <p style = {{ textAlign: "center" }} >Not registered?</p >
                    <Link type = "submit"
                          className = "btn btn-primary btn-block"
                          style={{ width: "100%"}}
                          to = "/signup" > Sign Up
                    </Link >
                    <br/>
                    <p style = {{ textAlign: "center" }}>Or Login with...</p>
                    {/*Anchor en comptes de Link perquè sortim de l'app: hem d'anar a Google*/}
                    <a className = "btn btn-primary btn-block"
                       style={{ width: "100%"}}
                       href = {this.getGoogleLoginUrl()} > <i className = "fa-brands fa-google" ></i > Google
                    </a >
                </form >

            </div >
        );
    }
}

export default withRouter(Login);