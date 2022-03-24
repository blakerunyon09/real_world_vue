import { createStore, createLogger } from 'vuex';
import JsonApiService from '../services/JsonApiService';
import {
  CLEAR_FLASH_MESSAGE,
  SET_FLASH_MESSAGE,
  SET_USER,
  CLEAR_USER,
  SET_ALL_USERS,
  CLEAR_ALL_USERS,
} from './types';

export default createStore({
  plugins: [createLogger()],
  state() {
    return {
      flashMessage: '',
      user: null,
      users: [],
    };
  },
  mutations: {
    [SET_FLASH_MESSAGE](state, payload) {
      state.flashMessage = payload;
    },
    [CLEAR_FLASH_MESSAGE](state) {
      state.flashMessage = null;
    },
    [SET_USER](state, payload) {
      state.user = payload;
    },
    [CLEAR_USER](state) {
      state.user = null;
    },
    [SET_ALL_USERS](state, payload) {
      state.users = payload;
    },
    [CLEAR_ALL_USERS](state) {
      state.users = null;
    },
  },
  actions: {
    async setAllUsers(context) {
      JsonApiService.getUsers(2, 1)
        .then((response) => {
          context.commit(SET_ALL_USERS, response.data);
        });
    },
    async setUser(context, payload) {
      const existingUser = this.state.users.find((user) => payload === user.id);
      if (existingUser) context.commit(SET_USER, existingUser);
      else {
        JsonApiService.getUser(payload)
          .then(({ data: foundUser }) => {
            context.commit(SET_USER, foundUser);
          });
      }
    },
    clearAllUsers(context) {
      context.commit(CLEAR_ALL_USERS);
    },
    clearUser(context) {
      context.commit(CLEAR_USER);
    },
    setFlashMessage(context, payload) {
      context.commit(SET_FLASH_MESSAGE, payload);
    },
    clearFlashMessage(context) {
      context.commit(CLEAR_FLASH_MESSAGE);
    },
  },
  getters: {
    getUsersByPage: (state) => (page) => {
      const userIndex = page * 2 - 2;
      return state.users.slice(userIndex, userIndex + 2);
    },
    checkNextPage: (state) => (page) => page < Math.ceil(state.users.length / 2),
  },
});
