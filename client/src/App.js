import React from 'react'
import Axios from 'axios'


class App extends React.Component{

  componentDidMount()
  {
    Axios.get('/test').then(res =>{
      console.log(res)
    })
  }

  render()
  {
    return(
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

export default App