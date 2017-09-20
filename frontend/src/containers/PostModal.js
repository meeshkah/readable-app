import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import PostForm from '../components/PostForm';
import { newPost, editPost } from '../actions/PostActions';
import { closePostModal } from '../actions/modals';

class PostModal extends Component {
  render() {
    const { categories } = this.props;
    const customStyle = {
      overlay: {
        backgroundColor: 'rgba(66, 110, 134, .75)',
      },
      content: {
        top: '50%',
        transform: 'translateY(-50%)',
        bottom: 'auto',
        borderRadius: '0',
      }
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        style={customStyle}
        onRequestClose={() => this.props.closePostModal()}
        contentLabel="Post Modal"
      >
        <PostForm
          post={this.props.post}
          categories={categories}
          handleSubmit={(post) => {
            if (this.props.post) {
              this.props.editPost(this.props.post.body.id, post);
            } else {
              this.props.newPost(post);
            }
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({categories, posts, postModal}) => ({
  categories,
  posts,
  isOpen: postModal.isOpen,
  post: postModal.post,
});

PostModal = withRouter(connect(
  mapStateToProps,
  {
    newPost,
    editPost,
    closePostModal,
  }
)(PostModal));

export default PostModal;
