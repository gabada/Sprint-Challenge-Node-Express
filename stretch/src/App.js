import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [],
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/projects')
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        {this.state.projects.map(project => {
          return (
            <div key={project.id}>
              <p>
                <strong>ID:</strong> {project.id}
              </p>

              <p>
                <strong>{project.name}</strong>
              </p>
              <p>
                <strong>Description:</strong> {project.description}
              </p>
              <p>
                <strong>Completed:</strong> {`${project.completed}`}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
