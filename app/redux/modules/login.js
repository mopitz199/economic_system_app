const initialState = {
  user: {
    username: ''
  }
};
export default function reducer(state=initialState, action = {}) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}
