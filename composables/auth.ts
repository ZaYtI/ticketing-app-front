export function useAuth(){

  async function login(email: string, password: string) {
    const response = await $fetch(`http://localhost:8000/api/login`, {
      method: "POST",  
      credentials:'include',
      headers: {
        "Content-Type": "application/json",  
      },
      body: {
        'email': email,
        'password': password,
      },  
    });
  
    return response;  
  }
  return {
    login
  }
}
