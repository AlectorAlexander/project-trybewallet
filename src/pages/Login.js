import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import userAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    const { click } = this.props;
    const oLintEncheOsaco = 6;
    const senhaLenght = password.length >= oLintEncheOsaco;
    const emailValidade = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

    return (
      <div>
        <fieldset>
          <form>
            <label htmlFor="email" data-testid="email-input">
              <input
                type="email"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                placeholder="Email"
              />
            </label>
            <label htmlFor="password" data-testid="password-input">
              <input
                type="password"
                value={ password }
                onChange={ this.handleChange }
                name="password"
                placeholder="Password"
              />
            </label>
            <Link to="/carteira">
              <button
                id="button"
                disabled={ !(senhaLenght && emailValidade) }
                type="button"
                onClick={ () => click(email, password) }
              >
                Entrar
              </button>
            </Link>
          </form>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  click: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  click: (email, password) => dispatch(userAction(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
