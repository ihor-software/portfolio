import { Component } from 'react';
import { Label, Col, Row, Button } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { Link } from 'react-router-dom';
import l from './LogIn.module.css';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(values) {
        this.props.Login(values.email, values.password);
    }

    render() {
        return (
            <div className="container">
                <div className={l.login} >
                    <h2 className={l.Title}>Вход</h2>
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className = {l.demail}>
                            
                                <Label htmlFor="email" md={2}></Label>
                                <Control.text model=".email" id="email" name="email"
                                    placeholder="Введите email"
                                    className ={l.placeinput}
                                    validators={{
                                        required, validEmail
                                    }}
                                />
                           
                            <Errors
                                className="text-danger"
                                model=".email"
                                show="touched"
                            />
                        </Row>
                        <Row className = {l.demail1}>
                            
                                <Label htmlFor="password" md={2}></Label>
                                <Control.text model=".password" id="password" name="password"
                                    placeholder="Введите пароль" type = "password"
                                    className ={l.placeinput}
                                    validators={{
                                        required, minLength: minLength(4), maxLength: maxLength(15)
                                    }}
                                />
                            
                            <Errors
                                className="text-danger"
                                model=".password"
                                show="touched"
                            />
                        </Row>
                        <Row >
                            <Col md={{ size: 10, offset: 0 }}>
                            <div className={l.dibutton}>
                                <Button type="submit" className={l.butlog}>
                                    Вход
                                    </Button>
                                    </div>
                            </Col>
                        </Row>
                    </Form>
                    <Link to="/registration">
                        <div className={l.dibuttonsig}>
                        <Button className={l.butsig} > 
                            Регистрация
                        </Button>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LogIn;