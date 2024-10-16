const binId = '670ee6c8e41b4d34e443669f';
const apiKey = '$2a$10$C70KU/CxBpkg.8y88oqrzu51YZipxjkv2TNQiTruV2IhEM2qZ3Nv6'; 

async function registerUser(email, password, role) {
    const url = `https://api.jsonbin.io/v3/b/${binId}/latest`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const data = await response.json();

        const userExists = data.record.find(user => user.email === email);
        if (userExists) {
            document.getElementById('message').textContent = 'Este correo ya está registrado.';
            return;
        }

        const newUser = { email, password, role };
        data.record.push(newUser);

        const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey
            },
            body: JSON.stringify(data.record)
        });

        if (updateResponse.ok) {
            document.getElementById('message').textContent = 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
        }

    } catch (error) {
        console.error('Error al registrar:', error);
    }
}

async function loginUser(email, password) {
    const url = `https://api.jsonbin.io/v3/b/${binId}/latest`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const data = await response.json();

        const user = data.record.find(user => user.email === email && user.password === password);
        if (user) {
            document.getElementById('message').textContent = 'Login exitoso';
            
         
            if (user.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (user.role === 'user') {
                window.location.href = 'user-dashboard.html'; 
            }
        } else {
            document.getElementById('message').textContent = 'Credenciales incorrectas';
        }

    } catch (error) {
        console.error('Error en el login:', error);
    }
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value; 
    registerUser(email, password, role);
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    loginUser(email, password);
});
