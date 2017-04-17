import React, {Component} from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

class Header extends Component {


  irPreguntas(){

    document.getElementById('promo').style.display = 'none'
    setTimeout(function (){
        document.getElementById('promo').style.display = 'block';
      $('html,body').animate({
        scrollTop: $("#preguntas").offset().top
      },
        'slow');}
    , 1000);

  }
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
                    <a className="btn btn-cta-primary" href="#preguntas" onClick={this.irPreguntas.bind(this)}>Ir a las preguntas</a>
                    <a className="nuevo"><AccountsUIWrapper/></a>
                </div>
                <br/>
                <p className="intro"> Si te registras podrás guardar todas las busquedas que hagas, pero aunque no te registres disfrutarás de los demás servicios</p>
                <br/>
            </div>
        </section>
      </div>
    );
  }
}

export default Header;
