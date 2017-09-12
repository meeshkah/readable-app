import React from 'react';
import serialize from 'form-serialize';

const PostForm = (props) => {
  const { post, categories, handleSubmit } = props;
  const values = post ? {...post.body} : {};

  return (
    <form className="c-form" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(serialize(e.target, {hash: true}));
    }}>
      <h1>{post ? "Edit post" : "New post"}</h1>
      <label htmlFor="title" className="c-form__label">Title</label>
      <input name="title" id="title" type="text" className="c-form__input" value={values.title} required />
      <label htmlFor="author" className="c-form__label">Author</label>
      <input name="author" id="author" type="text" className="c-form__input" value={values.author} required />
      <label htmlFor="category" className="c-form__label">Category</label>
      <select name="category" id="category" className="c-form__select" value={values.category} required>
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category.path} value={category.path}>{category.name}</option>
        ))}
      </select>
      <label htmlFor="body" className="c-form__label"></label>
      <textarea name="body" id="body" cols="30" rows="20" className="c-form__text" required>
        {values.body}
      </textarea>
      <button className="c-form__submit">Submit post</button>
    </form>
  );
}

export default PostForm;
