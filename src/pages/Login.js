import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../actions';

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
    const { click, history } = this.props;
    const oLintEncheOsaco = 6;
    const senhaLenght = password.length >= oLintEncheOsaco;
    const emailValidade = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

    return (
      <div>
        <fieldset>
          <form>
            <label htmlFor="email">
              <input
                data-testid="email-input"
                type="email"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                id="email"
                placeholder="Email"
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
                name="password"
                id="password"
                placeholder="Password"
              />
            </label>
            <button
              id="button"
              disabled={ !(senhaLenght && emailValidade) }
              type="button"
              onClick={ () => click(email, password) && history.push('./carteira') }
            >
              Entrar
            </button>
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
