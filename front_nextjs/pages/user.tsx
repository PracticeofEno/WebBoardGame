export async function Login(nickname: string, password: string) {
    const res = await fetch("/api/user?nickname=" + nickname, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
    });
    const json = await res.json();
    return json;
}
