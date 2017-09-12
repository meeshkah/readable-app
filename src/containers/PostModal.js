import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import PostForm from '../components/PostForm';
import { newPost } from '../actions';
import { closePostModal } from '../actions/modals';

class PostModal extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Modal
        isOpen={this.props.postModal}
        onRequestClose={() => this.props.dispatch(closePostModal())}
        contentLabel="Post Modal"
      >
        <PostForm
          post={(this.props.posts.lengh > 0 && this.props.postId) && this.props.posts[this.props.postId]}
          categories={categories}
          handleSubmit={(post) => this.props.dispatch(newPost(post))}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state = {}, { props }) => ({
  categories: state.categories,
  posts: state.posts,
  postId: props && props.postId,
  postModal: state.postModal,
});

PostModal = withRouter(connect(
  mapStateToProps,
)(PostModal));

export default PostModal;
