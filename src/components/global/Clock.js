import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Footer from './Footer.js';


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString()
      };
    }

    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }

    // componentWillUnmount() {
    //   clearInterval(this.intervalID);
    // }

    tick() {
      this.setState({
        time: new Date().toLocaleString()
      });
    }
    render() {
      return (
        <div>
            <Header/>
                <p className="App-clock">
                The time is {this.state.time}.
                </p>
            <Footer/>
        </div>
      );
    }
  }

  export default Clock;