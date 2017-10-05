import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import Category from '../components/Category';
import { fetchCategories } from '../actions/CategoryActions';
import './CategoriesList.css';

class CategoriesList extends Component {
  componentDidMount() {
    this.props.fetchCategories(this.props.category);
  }

  render() {
    return (
      <div className="c-categories">
        {this.props.categories.map((category) => (
          <Category
            key={category.path}
            path={category.path}
            name={category.name}
          />
        ))}

      </div>
    )
  }
}

const mapStateToProps = ({ categories }, { match }) => ({
  category: match && match.params.category,
  categories,
});

export default connect(
  mapStateToProps,
  {
    fetchCategories,
  }
)(CategoriesList);
