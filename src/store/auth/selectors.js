export const authIsAuth = (state) => state.auth.userId > 0;

export const authUserList = (state) => state.auth.userList;

export const authCurrentUser = (state) => {
  const { userId, userList } = state.auth;
  return userList.find((user) => user.id === userId);
};

export default {
  authIsAuth,
  authUserList,
  authCurrentUser,
};
