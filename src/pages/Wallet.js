import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchWallet from '../services/fetchWallet';
import Header from '../components/Header';
import { expensesAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      expenses: [],
      expenseHeader: 0,
    };
  }

  async componentDidMount() {
    const api = await fetchWallet();
    this.setState({ currencies: api });
  }

  addExpensesToLocalState = async () => {
    const { expenses } = this.state;
    const currencies = await fetchWallet();
    delete currencies.USDT;
    const exchangeRates = { ...currencies };
    const id = expenses.length;
    const { value } = document.getElementById('valor');
    const description = document.getElementById('description').value;
    const currency = document.getElementById('Moeda').value;
    const method = document.getElementById('método').value;
    const tag = document.getElementById('despesa').value;
    this.setState((prvwsStt) => ({
      expenses: [...prvwsStt.expenses,
        { id, value, description, currency, method, tag, exchangeRates }],
    }), this.addExpensesToGlobalState);
    document.getElementById('form').reset();
  }

  addExpensesToGlobalState = () => {
    const { dispExpenses } = this.props;
    const { expenses } = this.state;
    dispExpenses(expenses);
    // Breno Lopes da tribo B me ajudou com a lógica do code abaixo:
    const expense = expenses.map((element) => {
      const { currency } = element;
      const { exchangeRates } = element;
      const { ask } = exchangeRates[currency];
      const { value } = element;
      return Number(value) * Number(ask);
    });
    const expenseHeader = expense.reduce((acc, crr) => Number(acc) + Number(crr))
      .toFixed(2);
    this.setState({ expenseHeader });
  }

  render() {
    const { expenseHeader, currencies: oldsCu } = this.state;
    const currencies = Object.keys(oldsCu).filter((coin) => coin !== 'USDT');
    const metodoDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header api={ oldsCu } expens={ expenseHeader } />
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

const mapDispatchToProps = (dispatch) => ({
  dispExpenses: (expenses) => dispatch(expensesAction(expenses)),
});

Wallet.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
