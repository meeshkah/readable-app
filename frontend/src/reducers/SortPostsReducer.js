import {
  SORT_POSTS,
} from '../actions/types';

const sortPosts = (state = {
  sortBy: '',
  sortOptionsById: [
    'timestamp',
    'voteScore',
  ],
  sortOptions: {
    timestamp: {
      title: 'Date',
      value: 'timestamp',
    },
    voteScore: {
      title: 'Score',
      value: 'voteScore',
    },
  }
}, action) => {
  switch (action.type) {
    case SORT_POSTS:
      return {
        ...state,
        sortBy: action.payload.sortBy,
      }
    default:
      return state;
  }

}

export default sortPosts;
