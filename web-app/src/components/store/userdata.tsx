import { create } from 'zustand';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  url: string;
}
interface UserDataStore extends UserData {
  setUserData: (data: UserData) => void;
}

const useUserDataStore = create<UserDataStore>((set) => ({
  firstname: '',
  lastname: '',
  email: '',
  url: '',
  setUserData: (data: UserData) => set({ ...data }),
}));

export default useUserDataStore;
