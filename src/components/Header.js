import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { WalletAction } from '../actions';

class Header extends React.Component {
  async componentDidMount() {
    const { WalletTry, api } = this.props;
    WalletTry(api);
  }

  render() {
    const { email, expens } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ expens }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  WalletTry: (api) => dispatch(WalletAction(api)),
});

Header.propTypes = {
  WalletTry: propTypes.func,
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
