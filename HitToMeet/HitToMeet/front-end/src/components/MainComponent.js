import React, { Component } from 'react';
import Header from './HeaderComponent';
import LogIn from './LoginComponent/LoginComponent';
import Registration from './RegistrationComponent';
import Quiz from './Quiz';
import Footer from './FooterComponent';
import SuccessRegistration from './SuccessRegistration';
import PersonalArea from './PersonalAreaComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount, Login, GetQuestion, RefreshToken } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = (dispatch) => ({
    createAccount: (Email, Password, UserName) => dispatch(createAccount(Email, Password, UserName)),
    Login: (Email, Password) => dispatch(Login(Email, Password)),
    GetQuestion: () => dispatch(GetQuestion()),
    RefreshToken: (Token, RefreshToken) => dispatch(RefreshToken(Token, RefreshToken))
});

class Main extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/home"></Route>
                    <Route path="/login" component={() => <LogIn Login={this.props.Login}></LogIn>}></Route>
                    <Route exact path="/registration" component={() => <Registration createAccount={this.props.createAccount}></Registration>}></Route>
                    <Route path="/successreg" component={SuccessRegistration}></Route>
                    <Route path="/quiz" component={() => <Quiz GetQuestion={this.props.GetQuestion}></Quiz>}></Route>
                    <Redirect to="/login"></Redirect>
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Main));