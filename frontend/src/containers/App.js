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
import NotFound from '../components/NotFound';
import { openPostModal } from '../actions/modals';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header text="Readable" />
        <Switch>
          <Route path="/category/:category" component={CategoriesList} />
          <Route component={CategoriesList} />
        </Switch>
        <button className="c-new" onClick={() => this.props.dispatch(openPostModal())}>New post</button>
        <div className="c-container">
          <Switch>
            <Route path="/" exact component={PostsList} />
            <Route path="/category/:category" component={PostsList} />
            <Route path="/:category/:postId" component={PostDetail} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <PostModal />
      </div>
    );
  }
}

export default withRouter(connect()(App));
