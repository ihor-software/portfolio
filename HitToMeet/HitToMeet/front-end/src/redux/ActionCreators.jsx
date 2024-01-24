import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { Redirect } from 'react-router-dom';




export const addAccount = (account) => ({
    type: ActionTypes.ACCOUNT_CREATE,
    payload: account
});
export const Lodins = (account) => ({
    type: ActionTypes.LOGIN,
    payload: account
});

export const Questions = (Quiz) => ({
    type: ActionTypes.GET_QUESTIONS,
    payload: Quiz
});

export const Refresh = (token) => ({
    type: ActionTypes.REFRESH,
    payload: token
});

export const createAccount = (Email, UserName, Password) => (dispatch) => {
    const newAccount = {
        Email: Email,
        UserName: UserName,
        Password: Password
        
    }

    return fetch(baseUrl + 'identity/register', {
        method: 'POST',
        body: JSON.stringify(newAccount),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                alert('Поздравляю вы успешно зарегистрированы.');

                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addAccount(response)))
        .then((data) => {
            console.log(data)
            /* alert(data);*/
        })
        .catch(error => {
            console.log('Post account ', error.message);
            alert('Your account could not be posted\nError: ' + error.message);
        })
};




export const Login = (Email, Password) => (dispatch) => {
    const addLogin = {
        Email: Email,
        Password: Password
    }

    return fetch(baseUrl + 'identity/login', {
        method: 'POST',
        body: JSON.stringify(addLogin),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                alert('Поздравляю вы успешно зашли в свой профиль.');
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(Lodins(response)))
        .then(response => {
            document.cookie = "refreshToken=" + response.payload.refreshToken;
            document.cookie = "JwtClaimId=" + response.payload.token;
        })
        .catch(error => {
            console.log('Post account ', error.message);
            alert('Your account could not be posted\nError: ' + error.message);
        })
};

export const GetQuestion = () => (dispatch) => {
    return fetch(baseUrl + 'quiz', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${getCookie("JwtClaimId")}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(response => dispatch(Questions(response)))
        .then(response => {
            if (response.status == 401) {
                RefreshToken(getCookie("JwtClaimId"), getCookie("refreshToken"))
            }
            const items = response.payload.questions;
            return items;
        })
        .then(items => {
            return items;
        })
        .catch(error => {
            console.log("Can't get quiz: ", error.message);
            alert("Can't get quiz: " + error.message);
        })
}

export const RefreshToken = (Token, RefreshToken) => (dispatch) => {
    const Tokens = {
        Token: Token,
        RefreshToken: RefreshToken
    }

    return fetch(baseUrl + 'identity/refreshToken', {
        method: 'POST',
        body: JSON.stringify(Tokens),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(Refresh(response)))
        .then(response => {
            document.cookie = "refreshToken=" + response.payload.refreshToken;
            document.cookie = "JwtClaimId=" + response.payload.token;
        })
        .catch(error => {
            console.log('Refresh token ', error.message);
            alert('Your token could not be posted\nError: ' + error.message);
        })
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}