import { defineStore } from 'pinia';
import type { User } from '~/utils/interface/Users';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User| null,
    isAdmin:false,
    isAuthenticated: false,
  }),

  actions: {
    async getIsAdmin():Promise<boolean>{
      if(this.user){
        return this.user?.roles.includes('ROLE_ADMIN')
      }
      return false; 
    }
  },
});
