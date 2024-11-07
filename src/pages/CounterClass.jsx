import cx from 'classnames';
import { Component } from 'react';

export default class CounterClass extends Component {
  constructor() {
    super();
    this.state = {
      counter: 42
    }
  }

  handleIncrement() {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }))
  }


  render() {
    const { counter } = this.state;

    const btnClass = cx({
      fontSize: '1rem',
      padding: '5px 10px',
      color: '#585858'
    })

    return (
        <>
            <div>
                <h2>{counter}</h2>
            </div>
            <button type="button" className="counter-button" onClick={this.handleIncrement.bind(this)}>
              Click
            </button>
            <style>{`
                .counter-button {
                    font-size: 1rem;
                    padding: 5px 10px;
                    color:  #585858;
                }
            `}</style>
        </>
    );
  }
}
