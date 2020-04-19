import { fromJS, List, Map } from 'immutable';
import notif from 'ba-api/notifMessage';
import {
  FETCH_DATA_FORM,
  ADD_NEW,
  CLOSE_FORM,
  SUBMIT_DATA,
  REMOVE_ROW_FORM,
  EDIT_ROW_FORM,
  CLOSE_NOTIF,
  ERROR_NOTIF,
} from 'ba-actions/actionTypes';

const initialState = {
  dataTable: List([]),
  formValues: Map(),
  editingId: '',
  showFrm: false,
  notifMsg: '',
  variant: '',
};

const initialItem = (keyTemplate, anchor) => {
  let rawKey = [];
  if (keyTemplate) {
    rawKey = keyTemplate.keys();
  } else {
    rawKey = anchor.map(e => e.name);
    rawKey = new Set(rawKey);
    rawKey = Array.from(rawKey);
  }
  const staticKey = {};
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== 'id') {
      const itemIndex = anchor.findIndex(a => a.name === rawKey[i]);
      staticKey[rawKey[i]] = anchor[itemIndex] == !undefined ? anchor[itemIndex].initialValue : '';
    }
  }

  return Map(staticKey);
};
let editingIndex = 0;

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { branch } = action;
  switch (action.type) {
    case `${branch}/${FETCH_DATA_FORM}`:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('dataTable', items);
      });
    case `${branch}/${ADD_NEW}`:
      return state.withMutations((mutableState) => {
        const raw = state.get('dataTable').last();
        const initial = initialItem(raw, action.anchor);
        mutableState.set('formValues', initial);
        mutableState.set('showFrm', true);
      });
    case `${branch}/${SUBMIT_DATA}`:
      return state.withMutations((mutableState) => {
        const message = action.newData.get('message');
        if (state.get('editingId') === action.newData.get('id')) {
          // Update data
          mutableState
            .update('dataTable', dataTable => dataTable.setIn([editingIndex], action.newData))
            .set('notifMsg', message || notif.updated)
            .set('variant', 'success');
        } else {
          // Insert data
          const id = action.newData.get('id');
          const initItem = Map(action.newData);
          const newItem = initItem.update('id', (val = id) => val);
          mutableState
            .update('dataTable', dataTable => dataTable.unshift(newItem))
            .set('notifMsg', message || notif.saved)
            .set('variant', 'success');
        }
        mutableState.set('showFrm', false);
        mutableState.set('formValues', Map());
      });
    case `${branch}/${CLOSE_FORM}`:
      return state.withMutations((mutableState) => {
        mutableState
          .set('formValues', Map())
          .set('showFrm', false);
      });
    case `${branch}/${REMOVE_ROW_FORM}`:
      return state.withMutations((mutableState) => {
        const message = action.item.get('message');
        const index = state.get('dataTable').indexOf(action.item);
        mutableState
          .update('dataTable', dataTable => dataTable.splice(index, 1))
          .set('notifMsg', message || notif.removed)
          .set('variant', 'success');
      });
    case `${branch}/${EDIT_ROW_FORM}`:
      return state.withMutations((mutableState) => {
        editingIndex = state.get('dataTable').indexOf(action.item);
        mutableState
          .set('formValues', action.item)
          .set('editingId', action.item.get('id'))
          .set('showFrm', true);
      });
    case `${branch}/${CLOSE_NOTIF}`:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    case `${branch}/${ERROR_NOTIF}`:
      return state.withMutations((mutableState) => {
        const message = action.message;
        mutableState
          .set('notifMsg', message)
          .set('variant', 'error');
      });
    default:
      return state;
  }
}
