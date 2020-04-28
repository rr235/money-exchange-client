import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './main.styles.scss';
import Button from '../../atoms/button';
import CurrencySelector from '../../molecules/currencySelector';
import { fetchPockets } from '../../../actions';

class Main extends Component {
  componentDidMount() {
    this.props.fetchPockets();
  }

  getOptions = () => {
    const { pockets } = this.props;
    return pockets.map(({ code }) => ({ text: code, value: code }));
  };

  selectionHandler = ({ value: selectedValue }) => {
    // const updatedOptions = this.state.options.map(({ text, value }) => ({
    //   text,
    //   value,
    //   selected: value === selectedValue,
    // }));
    // this.setState({ options: updatedOptions });
  };

  render() {
    const options = this.getOptions();
    return (
      <form className={styles.main}>
        <div className={styles.content}>
          <div className={styles.selector}>
            <CurrencySelector
              options={options}
              id="from"
              label="From"
              onSelect={this.selectionHandler}
            />
          </div>
          <div className={styles.selector}>
            <CurrencySelector
              options={options}
              id="to"
              label="To"
              onSelect={this.selectionHandler}
            />
          </div>
          <Button className={styles.button}>Exchange</Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ pockets }) => ({
  pockets,
});

export default connect(mapStateToProps, { fetchPockets })(Main);
