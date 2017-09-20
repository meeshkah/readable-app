import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import CommentForm from '../components/CommentForm';
import { editComment } from '../actions/CommentActions';
import { closeCommentModal } from '../actions/modals';

class CommentModal extends Component {
  render() {
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
    };

    return (
      <Modal
        isOpen={this.props.isOpen}
        style={customStyle}
        onRequestClose={() => this.props.closeCommentModal()}
        contentLabel="Comment Modal"
      >
        <CommentForm
          comment={this.props.comment}
          handleSubmit={(comment) => this.props.editComment(this.props.comment.body.id, comment)}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({commentModal}) => ({
  isOpen: commentModal.isOpen,
  comment: commentModal.comment,
});

CommentModal = withRouter(connect(
  mapStateToProps,
  {
    editComment,
    closeCommentModal,
  }
)(CommentModal));

export default CommentModal;