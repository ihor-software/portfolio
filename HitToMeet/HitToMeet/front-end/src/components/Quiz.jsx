import React, { Component } from 'react';
import { Label, Col, Row, Button } from 'reactstrap';

import l from './Quiz.module.css';



class Quiz extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

        this.state = {
            questions: [{}],
            isLoading: true
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillMount() {
        const promise1 = this.props.GetQuestion();

        promise1.then((value) => {
            this.setState({
                questions: value,
                isLoading: false
            })
        });
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

    handleLoad() {
    }

    handleSubmit(event) {
        console.log(this.state.questions)
        event.preventDefault();
    }

    state = {
        gender: ""
    };

    handleChange = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <i className="fa fa-spinner fa-spin"></i>
            );
        } else if (!this.state.isLoading) {
            return (
                <div className="container">
                    <div className={l.quiz}>
                        <h2 className={l.Title}></h2>
                        <form onSubmit={this.handleSubmit}>
                            <h4 className={l.question}>{this.state.questions[0].text}</h4>

                            <div className={l.demail}>
                                <label className={l.containers}>
                                    <input type="radio" onChange={this.handleChange} value="1" name="radio" />
                                    <span className={l.checkmark}>{this.state.questions[0].answers[0].title}</span>
                                </label>
                            </div>

                            <div className={l.dem}>
                                <label className={l.containers}>1
                     <input type="radio" onChange={this.handleChange} value="2" name="radio" />
                                    <span className={l.checkmark}>ВАРИАНТ ДВА</span>
                                </label>
                            </div>
                            <div className={l.dem}>
                                <label className={l.containers}>1
                     <input type="radio" onChange={this.handleChange} value="2" name="radio" />
                                    <span className={l.checkmark}>ВАРИАНТ ТРИ</span>
                                </label>
                            </div>


                            <div className={l.dibutton}>
                                <Button type="submit" className={l.butlog}>
                                    Далее
                                        </Button>

                            </div>
                        </form>
                    </div>
                </div>
            );
        }

    }
}
export default Quiz