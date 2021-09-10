import actions from './actions.type';

export default {
  authSignIn: (payload) => ({
    type: actions.AUTH_SIGN_IN,
    payload,
  }),
  authSignOut: () => ({
    type: actions.AUTH_SIGN_OUT,
  }),
};
