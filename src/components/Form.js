import React from 'react';
import propTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { currencies, metodoDePagamento, despesas,
      addExpensesToLocalState } = this.props;
    return (
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
          <button type="button" onClick={ () => addExpensesToLocalState() }>
            Adicionar Despesas
          </button>
        </form>
      </fieldset>

    );
  }
}

/* const mapStateToProps = (state) => ({
  email: state.user.email,
}); */

/* const mapDispatchToProps = (dispatch) => ({
  WalletTry: (api) => dispatch(WalletAction(api)),
});
 */
Form.propTypes = {
  WalletTry: propTypes.func,
  email: propTypes.string,
}.isRequired;

export default Form;
