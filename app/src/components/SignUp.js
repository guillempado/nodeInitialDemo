import React, { Component } from "react";
import {register} from "../services/Auth";
import { withRouter } from '../common/with-router';
import User from "../common/User";

class SignUp extends Component {
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

    async onSubmit(e) {
        e.preventDefault();  // Necessari per evitar comportament per defecte del html form on submit (redirect, reload...)
        console.log("Submit!")  // Funciona?


        try {
            const response = await register(this.state.username, this.state.password);
            console.log("Response received")
            console.log(response);
            if(response.status === 200){
                console.log("Status 200")
                this.props.setToken(response.data.token);
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

    render() {
        return (
            <div >
                {/* TODO imatge de background difuminada: https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2015/05/english-for-chatting-768x512.jpg */}

                {/* TODO Bootstrap per validations (en comptes d react-validation): https://getbootstrap.com/docs/5.0/forms/validation/ */}

                {/* TODO El card que tinc a custom css ara mateix, passar-lo a fer amb classes de bootstrap */}

                {/* TODO Centrar el card de login a la pàgina */}

                <form className = "card card-container"
                      onSubmit = {this.onSubmit} >

                    {/* TODO treure inlines i posar-ho tot en el CSS a part */}
                    <h1 style = {{ textAlign: "center" }} >Sign Up</h1 >
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
                    <div className = "form-group" >
                        {this.state.error && (<div className = "alert alert-danger alert-dismissible fade show" style={{
                            textAlign: "center",
                            paddingLeft: 20,
                            paddingRight: 20
                        }} >
                            {this.state.error}
                        </div >)}
                    </div>
                    <button type = "submit"
                            className = "btn btn-primary" >Submit
                    </button >
                </form >

            </div >
        );
    }
}

export default withRouter(SignUp);