import { Component } from 'react';
import { Label, Col, Row, Button } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import l from './PersonalArea.module.css';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class PersonalArea extends Component {
    constructor(props) {
        super(props);
        this.lol = l.imgs_activ;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClicks = this.handleClicks.bind(this);
    }

  handleSubmit(values) {
     /*   this.props.createAccount(values.Email, values.UserName, values.Password);*/
    }
    handleClicks() {
        this.lol = l.imgs;
        console.log('значение this:');
      }
    render() {
        return (
            <div className="container">
                    <div className="col-12">
                        
                    </div>
                    <div className={l.login}>
                    <h2 className={l.Title}>Личный кабинет</h2>
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                                <Col md={10}>
                                <img src="assets/images/user-avatar1.png" className ={this.lol}  onClick={this.handleClicks}/>
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
                                <Label htmlFor="Email" md={2}></Label>
                                <Col md={10}>
                                    <Control.text model=".Email" id="Email" name="Email"
                                        placeholder="Введите e-mail"
                                        defaultValue="star.shadow0707@gmail.com"
                                        className ={l.placeinput}
                                        validators={{
                                            required, validEmail
                                        }}
                                        disabled
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".Email"
                                        show="touched"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Email" md={2}></Label>
                                <Col md={10}>
                                    <Control.textarea model=".About" id="About" name="About"
                                        placeholder="О себе"
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
                                <div className={l.sex}>
                                    <h5 className={l.sexh}>Выберите ваш пол:</h5>
                                <div className={l.dem}>
                            <label className={l.containers}>
                 <input type="radio" onChange={this.handleChange} value = "1"  name="radio"/>
                  <span className={l.checkmark}>Мужской</span>
                     </label>
                     </div>
                     <div className={l.dem1}>
                     <label className={l.containers}>
                 <input type="radio" onChange={this.handleChange} value = "2"  name="radio"/>
                  <span className={l.checkmark} >Женский</span>
                        </label>
                        </div>
                        </div>    
                                  
        
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                <div className={l.dibutton}>
                                <Button type="submit" className={l.butlog}>
                                Сохранить
                                    </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        
                    </div>

                

            </div>
        );
    }
}

export default PersonalArea;