import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import CommentForm from '../components/CommentForm';
import { editComment } from '../actions';
import { closeCommentModal } from '../actions/modals';

class CommentModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={() => this.props.dispatch(closeCommentModal())}
        contentLabel="Comment Modal"
      >
        <CommentForm
          comment={this.props.comment}
          handleSubmit={(comment) => this.props.dispatch(editComment(this.props.comment.body.id, comment))}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state = {}, { props }) => ({
  comments: state.posts,
  isOpen: state.commentModal.isOpen,
  comment: state.commentModal.comment,
});

CommentModal = withRouter(connect(
  mapStateToProps,
)(CommentModal));

export default CommentModal;