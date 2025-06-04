import React from 'react';

export class MainRoute extends React.Component {
  render() {
    console.log('MainRoute: ', this.props)
    return (
      <div>
        <h1>Main Route</h1>
        <p>This is the main route of the application.</p>
      </div>
    );
  }
}