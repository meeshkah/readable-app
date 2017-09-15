import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import PostForm from '../components/PostForm';
import { newPost, editPost } from '../actions';
import { closePostModal } from '../actions/modals';

class PostModal extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={() => this.props.dispatch(closePostModal())}
        contentLabel="Post Modal"
      >
        <PostForm
          post={this.props.post}
          categories={categories}
          handleSubmit={(post) => {
            if (this.props.post) {
              this.props.dispatch(editPost(this.props.post.body.id, post));
            } else {
              this.props.dispatch(newPost(post));
            }
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state = {}) => ({
  categories: state.categories,
  posts: state.posts,
  isOpen: state.postModal.isOpen,
  post: state.postModal.post,
});

PostModal = withRouter(connect(
  mapStateToProps,
)(PostModal));

export default PostModal;
