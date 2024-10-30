function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const login = async (e) => {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    e.preventDefault();

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        if (!res.ok) {
            const err = await res.json()
            alert(err.message)
        } else {
            const data = await res.json()
            const decodedToken = parseJwt(data.token);
            if (decodedToken.rol !== "admin") {
                window.location.href='./html/admin-dashboard.html'
            } else {
                alert('No tiene privelegios para acceder.')
            }
        }
    } catch (err) {
        console.error('Error inesperado: ', err)
        alert('Ocurrio un error inesperado.')
    }
}