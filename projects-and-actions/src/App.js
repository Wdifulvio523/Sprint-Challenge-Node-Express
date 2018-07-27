import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    }
  }

componentWillMount() {
  this.getData();
}

getData = () => {
  axios
  .get('http://localhost:8000/projects')
  .then((response) => {
    this.setState({projects: response.data})
  })
  .catch(err => console.log(err))
}

  render() {
    return (
      <div className="App">
      <h1>Projects and Actions App!</h1>
      {this.state.projects.map(project => {
        return (
          <div  className= 'projects-div' key={project.id}>
          <p> Name of Project: {project.name}</p>
          <p> Description of Project: {project.description}</p>
          </div>
        )
      })}
      </div>
    );
  }
}

export default App;
