export async function login(email: string, password: string) {
  const response = await $fetch(`http://localhost:8000/api/login`, {
    method: "POST",  
    headers: {
      "Content-Type": "application/json",  
    },
    credentials: "include",  
    body: {
      'email': email,
      'password': password,
    },  
  });

  return response;  
}
