import React, { Component } from 'react';
import './Form.css';

class CommentForm extends Component {
  state = {
    author: this.props.comment ? this.props.comment.body.author : '',
    body: this.props.comment ? this.props.comment.body.body : '',
  }

  render() {
    return (
      <form className="c-form c-form--comment" onSubmit={(e) => {
        e.preventDefault();
        this.props.handleSubmit({
          author: this.state.author,
          body: this.state.body,
        });
        this.setState({
          author: '',
          body: '',
        });
      }}>
        <h1 className="c-form__title">{this.props.comment ? "Edit comment" : "New comment"}</h1>
        {!this.props.comment && (
          <div>
            <label htmlFor="author" className="c-form__label">Author</label>
            <input 
              name="author" 
              id="author" 
              type="text" 
              className="c-form__input" 
              value={this.state.author} 
              onChange={(e) => this.setState({author: e.target.value})}
              required />
          </div>
        )}
        <label htmlFor="body" className="c-form__label">Text</label>
        <textarea 
          name="body" 
          id="body" 
          cols="30" 
          rows="10" 
          className="c-form__text"
          value={this.state.body}
          onChange={(e) => this.setState({body: e.target.value})}
          required
        >
        </textarea>
        <button className="c-form__submit">Submit comment</button>
      </form>
    );
  }
}

export default CommentForm;
