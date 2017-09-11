import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import PostDetail from './PostDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header text="📖 Readable" />
        <CategoriesList />
        <div className="c-container">
          <Switch>
            <Route path="/" exact component={PostsList} />
            <Route path="/category/:category" component={PostsList} />
            <Route path="/:category/:postId" component={PostDetail} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
