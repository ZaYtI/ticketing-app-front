import { useAuthStore } from "~/stores/auth";
import type { User } from "~/utils/interface/Users";

export function useAuth() {
  const authStore = useAuthStore();

  async function login(email: string, password: string) {
    const response = await $fetch(`http://localhost:8000/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email,
        password: password,
      },
    });

    return response;
  }

  async function register(email: string, password: string) {
    const response = await $fetch(`http://localhost:8000/api/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email,
        password: password,
      },
    });

    return response;
  }

  async function logout() {
    await $fetch(`http://localhost:8000/api/logout`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    authStore.user = null;
    authStore.isAdmin = await authStore.getIsAdmin();
    authStore.isAuthenticated = false;
  }

  async function checkAuth() {
    try {
      const user = await $fetch(`http://localhost:8000/api/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      authStore.user = user as User;
      authStore.isAdmin = await authStore.getIsAdmin();
      authStore.isAuthenticated = true;
    } catch (error) {
      authStore.user = null;
      authStore.isAuthenticated = false;
    }
  }

  return {
    login,
    register,
    logout,
    checkAuth,
  };
}
