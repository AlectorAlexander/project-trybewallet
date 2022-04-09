import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchWallet from '../services/fetchWallet';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      expenses: [],
    };
  }

  async componentDidMount() {
    const api = await fetchWallet();
    this.setState({ currencies: api });
  }

  addExpensesToLocalState = () => {
    const { expenses } = this.state;
    const id = expenses.length;
    const { value } = document.getElementById('valor');
    const description = document.getElementById('description').value;
    const currency = document.getElementById('Moeda').value;
    const method = document.getElementById('método').value;
    const tag = document.getElementById('despesa').value;
    this.setState((prvwsStt) => ({
      expenses: [...prvwsStt.expenses, { id, value, description, currency, method, tag }],
    }));
    document.getElementById('form').reset();
  }

  render() {
    const { currencies: oldsCu } = this.state;
    const currencies = Object.keys(oldsCu).filter((coin) => coin !== 'USDT');
    const metodoDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header />
        <fieldset>
          <form id="form">
            <input
              type="number"
              id="valor"
              data-testid="value-input"
              placeholder="Valor"
            />
            <input
              type="text"
              id="description"
              data-testid="description-input"
              placeholder="Descrição"
            />
            <label htmlFor="Moeda">
              <span>Moeda: </span>
              <select id="Moeda" data-testid="currency-input">
                {currencies.map((coin, i) => (
                  <option key={ i }>{ coin }</option>
                ))}
              </select>
            </label>
            <label htmlFor="método">
              <span>Método de pagamento: </span>
              <select id="método" data-testid="method-input">
                {metodoDePagamento.map((metod, i) => (
                  <option key={ i }>{ metod }</option>
                ))}
              </select>
            </label>
            <label htmlFor="despesa">
              <span>Tipo de despesa: </span>
              <select id="despesa" data-testid="tag-input">
                {despesas.map((metod, i) => (
                  <option key={ i }>{ metod }</option>
                ))}
              </select>
            </label>
            <button type="button" onClick={ () => this.addExpensesToLocalState() }>
              Adicionar Despesas
            </button>
          </form>
        </fieldset>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

// const mapDispatchToProps = (dispatch) => ({
//   WalletTry: (api) => dispatch(WalletAction(api)),
// });

Wallet.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
