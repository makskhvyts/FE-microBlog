import { create } from "zustand";

const useUserAuth = create((set) => ({
  username: null,
  password: null,
  isLoggedIn: false,
  login: async (username, password) => {set({ username, password, isLoggedIn: true });},
  logout: () => set({ username: null, password: null, isLoggedIn: false }),
}));

export default useUserAuth;