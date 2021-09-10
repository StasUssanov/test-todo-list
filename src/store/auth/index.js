import types from './actions.type';
import initData from './initData';

const initialState = {
  userId: Number(localStorage.getItem('tbg-user-id')),
  userList: initData.userList,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SIGN_IN:
      return { ...state, userId: action.payload };
    case types.AUTH_SIGN_OUT:
      return { ...state, userId: 0 };
    default:
      return state;
  }
};
