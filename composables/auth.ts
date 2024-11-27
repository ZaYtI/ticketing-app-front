export async  function login(email: string, password: string) {
  const response = await $fetch(`http://localhost:8000/api/login?`,
    {
      method: "POST",
      mode: "cors",
      body:{
        'email':email,
        'password':password
      }
    }
  );

  return response;
}
