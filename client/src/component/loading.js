import React, { Component } from 'react';
import LoadingGif from '../../src/component/img/BhxtZQE.gif'

class loading extends Component {
  render() {
    return (
      <div className="Loading_main_Container" style={{width:"100%", textAlign:"center"}}>
        <img src={LoadingGif} className="loadingGIF"></img>
      </div>
    );
  }
}

export default loading;