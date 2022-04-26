import propTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((element) => {
            const { exchangeRates } = element;
            const { id } = element;
            const { description } = element;
            const { currency } = element;
            const { method } = element;
            const { value } = element;
            const { name } = exchangeRates[currency];
            const { ask } = exchangeRates[currency];
            const { tag } = element;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ name }</td>
                <td>{ Number(ask).toFixed(2) }</td>
                <td>{ (Number(value) * Number(ask)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  {' '}
                  <button data-testid="delete-btn" onClick={ () => deleteExpenses(id) } type="button">Excluir</button>
                  {' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

// const mapStateToProps = (state) => ({
// });

// const mapDispatchToProps = (dispatch) => ({
// });

Table.propTypes = {
  WalletTry: propTypes.func,
  email: propTypes.string,
}.isRequired;

export default Table;
