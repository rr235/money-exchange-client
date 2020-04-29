import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, number, arrayOf, shape } from 'prop-types';
import styles from './main.styles.scss';
import Button from '../../atoms/button';
import CurrencySelector from '../../molecules/currencySelector';
import {
  fetchPockets as fetchPocketsAction,
  selectPocketFrom as selectPocketFromAction,
  selectPocketTo as selectPocketToAction,
  setAmountFrom as setAmountFromAction,
  setAmountTo as setAmountToAction,
  exchangeAmountFrom as exchangeAmountFromAction,
  exchangeAmountTo as exchangeAmountToAction,
  setExchangeRate as setExchangeRateAction,
} from '../../../actions';

class Main extends Component {
  componentDidMount() {
    const { fetchPockets } = this.props;
    fetchPockets();
  }

  /**
   * converts pocket data to dropdown options format
   */
  getOptions = (pockets) => {
    return pockets.map(({ code }) => ({ text: code, value: code }));
  };

  /**
   * sets the pocket for 'from' selection of the exchange
   */
  selectionFromHandler = ({ value }) => {
    const { pockets, selectPocketFrom, toPocket, setExchangeRate } = this.props;
    const selectedValue = pockets.find((pocket) => pocket.code === value);

    selectPocketFrom(selectedValue);
    setExchangeRate({ from: selectedValue.code, to: toPocket.pocket.code });
  };

  /**
   * sets the pocket for 'to' selection of the exchange
   */
  selectionToHandler = ({ value }) => {
    const { pockets, selectPocketTo, fromPocket, setExchangeRate } = this.props;
    const selectedValue = pockets.find((pocket) => pocket.code === value);

    selectPocketTo(selectedValue);
    setExchangeRate({ from: fromPocket.pocket.code, to: selectedValue.code });
  };

  /**
   * sets amount for 'from' selection of the exchange
   */
  setAmountFromHandler = (e) => {
    const { setAmountFrom, exchangeAmountFrom, exchangeRate } = this.props;
    const amount = Number(e.currentTarget.value);
    setAmountFrom(amount);
    exchangeAmountFrom({
      amount,
      rate: exchangeRate,
    });
  };

  /**
   * sets amount for 'to' selection of the exchange
   */
  setAmountToHandler = (e) => {
    const { setAmountTo, exchangeAmountTo, exchangeRate } = this.props;
    const amount = Number(e.currentTarget.value);
    setAmountTo(amount);
    exchangeAmountTo({
      amount,
      rate: exchangeRate,
    });
  };

  render() {
    const { pockets, fromPocket, toPocket, exchangeRate } = this.props;
    const options = this.getOptions(pockets);

    return (
      <form className={styles.main}>
        <div className={styles.content}>
          <span className={styles.exchangeRate}>
            {`1 ${fromPocket.pocket.code} = ${exchangeRate} ${toPocket.pocket.code}`}
          </span>
          <div className={styles.selector}>
            <CurrencySelector
              options={options}
              id="from"
              label="From (-)"
              onSelect={this.selectionFromHandler}
              selectedValue={fromPocket.pocket}
              onChange={this.setAmountFromHandler}
              inputValue={fromPocket.amount}
              exceedsBalance={fromPocket.exceedsBalance}
            />
          </div>
          <div className={styles.selector}>
            <CurrencySelector
              options={options}
              id="to"
              label="To (+)"
              onSelect={this.selectionToHandler}
              selectedValue={toPocket.pocket}
              onChange={this.setAmountToHandler}
              inputValue={toPocket.amount}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              id="btnExchange"
              className={styles.button}
              type="submit"
              isDisabled={fromPocket.exceedsBalance}
            >
              Exchange
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const pocketShape = shape({
  name: string,
  code: string,
  symbol: string,
  balance: number,
});

Main.propTypes = {
  fetchPockets: func.isRequired,
  selectPocketFrom: func.isRequired,
  selectPocketTo: func.isRequired,
  setAmountFrom: func.isRequired,
  setAmountTo: func.isRequired,
  exchangeAmountFrom: func.isRequired,
  exchangeAmountTo: func.isRequired,
  setExchangeRate: func.isRequired,
  pockets: arrayOf(pocketShape),
  fromPocket: shape({ pocket: pocketShape, amount: number }),
  toPocket: shape({ pocket: pocketShape, amount: number }),
  exchangeRate: number.isRequired,
};

Main.defaultProps = {
  pockets: [],
  fromPocket: {},
  toPocket: {},
};

const mapStateToProps = ({ pockets, from, to, exchangeRate }) => ({
  pockets,
  fromPocket: from,
  toPocket: to,
  exchangeRate,
});

export default connect(mapStateToProps, {
  fetchPockets: fetchPocketsAction,
  selectPocketFrom: selectPocketFromAction,
  selectPocketTo: selectPocketToAction,
  setAmountFrom: setAmountFromAction,
  setAmountTo: setAmountToAction,
  exchangeAmountFrom: exchangeAmountFromAction,
  exchangeAmountTo: exchangeAmountToAction,
  setExchangeRate: setExchangeRateAction,
})(Main);
