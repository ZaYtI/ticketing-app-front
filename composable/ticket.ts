import { useFetch } from '#app'; // Vérifiez si cet import est nécessaire dans votre configuration

export async function getAllTicket(filters = {}, page = 1, token = '') {
    const params = new URLSearchParams({
        ...filters,
        page: String(page),
    });

    const response = await $fetch(`http://localhost:8000/api/ticket`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzI3MDM5MjQsImV4cCI6MTczMjcwNzUyNCwianRpIjoiY2IwNTk3YzQ2OWI3NjMwM2M5Y2M3ZmEwOWFhYTQ5ZWIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ1cmV5QGJsb3QuY29tIn0.o753HPVwdNh5f0zJbwcjRluK9KB1aEG2Ur7aQ6frCINiSGf8YDKFazkOJECKio4Rk7NxkX_F3EjlWV2rBB93KnOP1D6VLct_8bjLfZFqNhqiT_UPZTx9MOA1j1YDXTtDH0PmmVhwFYDFsWz21JDszRqeGAFPQkxlbMjl941UyGfLM9i-ErCCwG4WJ-MFeKd2EsDV-MycvFM4L3MAd5wFrgXX06nps5tDojHfKD0ezBCzCnM8_-lcBmU0Y-sm0FiNIJZxk_6MhY02yMFxnKmNFWjqdOvx9gDXmNY00M-0hVbW_YbWIXC0rt7DaP7NngCgwZ4ITgZhQhL2_dptJZc0Ow`,
        },
    });

    return response;
}
