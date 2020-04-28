import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, number, arrayOf, shape } from 'prop-types';
import styles from './main.styles.scss';
import Button from '../../atoms/button';
import CurrencySelector from '../../molecules/currencySelector';
import {
  fetchPockets,
  selectPocketFrom,
  selectPocketTo,
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
   * sets the 'from' selection for the exchange
   */
  selectionFromHandler = ({ value }) => {
    const { pockets, selectPocketFrom } = this.props;
    const selectedValue = pockets.find((pocket) => pocket.code === value);

    selectPocketFrom(selectedValue);
  };

  /**
   * sets the 'to' selection for the exchange
   */
  selectionToHandler = ({ value }) => {
    const { pockets, selectPocketTo } = this.props;
    const selectedValue = pockets.find((pocket) => pocket.code === value);

    selectPocketTo(selectedValue);
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
              label="From"
              onSelect={this.selectionFromHandler}
              selectedValue={fromPocket}
            />
          </div>
          <div className={styles.selector}>
            <CurrencySelector
              options={options}
              id="to"
              label="To"
              onSelect={this.selectionToHandler}
              selectedValue={toPocket}
            />
          </div>
          <Button className={styles.button}>Exchange</Button>
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
  fetchPockets,
  selectPocketFrom,
  selectPocketTo,
})(Main);
