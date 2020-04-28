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
    const { pockets, selectPocketFrom } = this.props;
    const selectedValue = pockets.find((pocket) => pocket.code === value);

    selectPocketFrom(selectedValue);
  };

  /**
   * sets the pocket for 'to' selection of the exchange
   */
  selectionToHandler = ({ value }) => {
    const { pockets, selectPocketTo } = this.props;
    const selectedValue = pockets.find((pocket) => pocket.code === value);

    selectPocketTo(selectedValue);
  };

  /**
   * sets amount for 'from' selection of the exchange
   */
  setAmountFromHandler = (e) => {
    const { setAmountFrom } = this.props;
    setAmountFrom(e.currentTarget.value);
  };

  /**
   * sets amount for 'to' selection of the exchange
   */
  setAmountToHandler = (e) => {
    const { setAmountTo } = this.props;
    setAmountTo(e.currentTarget.value);
  };

  render() {
    const { pockets, fromPocket, toPocket } = this.props;
    const options = this.getOptions(pockets);

    return (
      <form className={styles.main}>
        <div className={styles.content}>
          <div className={styles.selector}>
            <CurrencySelector
              options={options}
              id="from"
              label="From (-)"
              onSelect={this.selectionFromHandler}
              selectedValue={fromPocket.pocket}
              onChange={this.setAmountFromHandler}
              inputValue={fromPocket.amount}
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
          <Button id="btnExchange" className={styles.button} type="submit">
            Exchange
          </Button>
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
  pockets: arrayOf(pocketShape),
  fromPocket: pocketShape,
  toPocket: pocketShape,
};

Main.defaultProps = {
  pockets: [],
  fromPocket: {},
  toPocket: {},
};

const mapStateToProps = ({ pockets, from, to }) => ({
  pockets,
  fromPocket: from,
  toPocket: to,
});

export default connect(mapStateToProps, {
  fetchPockets: fetchPocketsAction,
  selectPocketFrom: selectPocketFromAction,
  selectPocketTo: selectPocketToAction,
  setAmountFrom: setAmountFromAction,
  setAmountTo: setAmountToAction,
})(Main);
