import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchWallet from '../services/fetchWallet';
import Header from '../components/Header';
import { expensesAction, WalletAction } from '../actions';
import Form from '../components/Form';
import Table from '../components/Table';

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
    const { dispCurrencies } = this.props;
    const api = await fetchWallet();
    dispCurrencies(api);
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
    const { expenses } = this.props;
    const currencies = Object.keys(oldsCu).filter((coin) => coin !== 'USDT');
    const metodoDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const despesas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header api={ oldsCu } expens={ expenseHeader } />
        <Form
          currencies={ currencies }
          metodoDePagamento={ metodoDePagamento }
          despesas={ despesas }
          addExpensesToLocalState={ this.addExpensesToLocalState }
        />
        {expenses
        && <Table expenses={ expenses } />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  dispExpenses: (expenses) => dispatch(expensesAction(expenses)),
  dispCurrencies: (currencies) => dispatch(WalletAction(currencies)),
});

Wallet.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
