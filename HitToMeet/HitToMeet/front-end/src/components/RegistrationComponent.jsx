import { Component } from 'react';
import { Label, Col, Row, Button } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import l from './Registation.module.css';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Registration extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.createAccount(values.Email, values.UserName, values.Password);
    }


    render() {
        return (
            <div className="container">
                
                    <div className="col-12">
                        
                    </div>
                    <div className={l.login}>
                    <h2 className={l.Title}>Регистрация</h2>
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Email" md={2}></Label>
                                <Col md={10}>
                                    <Control.text model=".Email" id="Email" name="Email"
                                        placeholder="Введите e-mail"
                                        className ={l.placeinput}
                                        validators={{
                                            required, validEmail
                                        }}
                                       
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".Email"
                                        show="touched"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Password" md={2}></Label>
                                <Col md={10}>
                                    <Control.text model=".Password" id="Password" name="Password"
                                        placeholder="Введите пароль" type = "password"
                                        className ={l.placeinput}
                                        validators={{
                                            required, minLength: minLength(4), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".Password"
                                        show="touched"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="UserName" md={2}></Label>
                                <Col md={10}>
                                    <Control.text model=".UserName" id="UserName" name="UserName"
                                        placeholder="Никнейм"
                                        className ={l.placeinput}
                                        validators={{
                                            required, minLength: minLength(4), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".UserName"
                                        show="touched"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="UserName" md={2}></Label>
                                <Col md={10}>
                                    <Control.radio  model=".UserName" id="UserName" name="UserName"
                                        placeholder="Никнейм"
                                        className ={l.placeinput}
                                        
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".UserName"
                                        show="touched"
                                    />
                                </Col>
                                <Col md={10}>
                                <Control.radio model=".UserName" id="UserName" name="UserName"
                                        placeholder="Никнейм"
                                        className ={l.placeinput}
                                        validators={{
                                            required, minLength: minLength(4), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".UserName"
                                        show="touched"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                <div className={l.dibutton}>
                                <Button type="submit" className={l.butlog}>
                                        Регистрация
                                    </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        <Link to="/login">
                        <div className={l.dibuttonsig}>
                        <Button className={l.butsig} > 
                        У меня уже есть аккаунт
                        </Button>
                        </div>
                    </Link>
                    </div>

                

            </div>
        );
    }
}

export default Registration;