import { Component } from 'react';
import { Label, Col, Row, Button } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import s from './SuccessRegistration.module.css';

class SuccessRegistration extends Component {
    constructor(props) {
        super(props);

    }




    render() {
        return (
            <div className={s.containe}>
                <div className = {s.arrow}> 
<svg width="50%" height="auto" viewBox="0 0 601 600" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M270.613 299.22C268.986 297.593 266.348 297.593 264.72 299.22C263.093 300.848 263.093 303.486 264.72 305.113L285.554 325.946C287.181 327.573 289.819 327.573 291.446 325.946L337.28 280.113C338.907 278.486 338.907 275.848 337.28 274.22C335.652 272.593 333.014 272.593 331.387 274.22L288.5 317.107L270.613 299.22Z" fill="#00FD19"/>
<g opacity="0.4" filter="url(#filter0_f)">
<rect x="200.5" y="200" width="200" height="200" rx="100" fill="#01FB19"/>
</g>
<defs>
<filter id="filter0_f" x="0.5" y="0" width="600" height="600" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur"/>
</filter>
</defs>
</svg>
                    
</div>
              <div>
                  <h3 className ={s.ready}>
                  Готово!
                  </h3>
                  <h3 className={s.youcr}>
                  Вы создали аккаунт
                  </h3>
                  <p className={s.textto}>
                      Пройдите тест для  определения<br/>
                        вашего тотемного животного</p>
              </div>


                <Link to="/quiz">
                        <div className={s.dibutton}>


                        <Button className={s.butlog} > 
                        Пройти
                        </Button>
                        </div>
                    </Link>

            </div>
        );
    }
}

export default SuccessRegistration;