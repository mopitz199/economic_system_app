import { Map, fromJS } from 'immutable';
import { INIT } from 'ba-actions/actionTypes';

const initialState = {
  usersLogin: Map({
    email: '',
    password: '',
    remember: false
  })
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    default:
      return state;
  }
}
