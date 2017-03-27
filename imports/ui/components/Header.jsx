import React, {Component} from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

class Header extends Component {

  render() {
    return(
      <div>
        <header id="header" className="header">
            <div className="container-fluid">
                <h1 className="logo pull-left">
                    <a className="scrollto" href="#promo">
                        <span className="logo-title">Where-To-Andes</span>
                    </a>
                </h1>
                <br/>
                <br/>
                <AccountsUIWrapper/>
                <span className="text">
                  <strong>
                    { this.props.user ?
                      this.props.user.username :
                      ''
                    }
                  </strong>
                </span>
            </div>
        </header>
        <section id="promo" className="promo section offset-header">
            <div className="container text-center">
                <h2 className="title">Where<span className="highlight">-To</span></h2>
                <p className="intro">Conoce los lugares, espacios o personas en la universidad que te pueden ayudar. Hazlo respondiendo unas sencillas preguntas</p>
                <div className="btns">
                    <a className="btn btn-cta-primary" href="#preguntas">Ir a las preguntas</a>
                </div>
                <br/>
                <p className="intro"> Si te registras podras guardar todas las busquedas que hagas, pero aunque no te registres podras disfrutar de los demás servicios</p>
                <br/>
            </div>
        </section>
      </div>
    );
  }
}

export default Header;
