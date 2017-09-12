import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import { openPostModal } from '../actions/modals';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header text="📖 Readable" />
        <CategoriesList />
        <button className="c-new" onClick={() => this.props.dispatch(openPostModal())}>New post</button>
        <div className="c-container">
          <Switch>
            <Route path="/" exact component={PostsList} />
            <Route path="/category/:category" component={PostsList} />
            <Route path="/:category/:postId" component={PostDetail} />
          </Switch>
        </div>
        <PostModal />
      </div>
    );
  }
}

export default withRouter(connect()(App));
