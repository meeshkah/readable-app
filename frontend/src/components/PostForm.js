import React, { Component } from 'react';

class PostForm extends Component {
  state = this.props.post ? {
    ...this.props.post.body,
  } : {
    title: '',
    author: '',
    body: '',
    category: '',
  };

  render() {
    const { post, categories, handleSubmit } = this.props;
    return (
      <form className="c-form" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          ...this.state,
        });
        this.setState({
          author: '',
          body: '',
        });
      }}>
        <h1>{post ? "Edit post" : "New post"}</h1>
        <div>
          <label htmlFor="title" className="c-form__label">Title</label>
          <input
            name="title"
            id="title"
            type="text"
            className="c-form__input"
            value={this.state.title}
            onChange={(e) => this.setState({title: e.target.value})}
            required
          />
        </div>
        {!post && (
          <div>
            <label htmlFor="author" className="c-form__label">Author</label>
            <input
              name="author"
              id="author"
              type="text"
              className="c-form__input"
              value={this.state.author}
              onChange={(e) => this.setState({author: e.target.value})}
              required
            />
          </div>
        )}
        {!post && (
          <div>
            <label htmlFor="category" className="c-form__label">Category</label>
            <select
              name="category"
              id="category"
              className="c-form__select"
              value={this.state.category}
              onChange={(e) => this.setState({category: e.target.value})}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.path} value={category.path}>{category.name}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="body" className="c-form__label">Text</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="20"
            className="c-form__text"
            value={this.state.body}
            onChange={(e) => this.setState({body: e.target.value})}
            required
          >
          </textarea>
        </div>
        <button className="c-form__submit">Submit post</button>
      </form>
    );
  }
}

export default PostForm;
