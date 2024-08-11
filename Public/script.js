
document.addEventListener('DOMContentLoaded', () =>{
    async function handleRegister(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 

        try{
            const res = await fetch('http://localhost:5000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password})
            });


            const data = await res.json();
            if (res.status === 200){
                alert ('Resgistro Exitoso');
            }else {
                alert(`Error: ${data.msg}`);
            }

        }catch(error){
            console.error('Error:', error);
            alert('Error de Registro de Usuario')
        }

       }


    async function handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value; 

        try{
            const res = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password})
            });


            const data = await res.json();
            if (res.status === 200){
                alert ('Login  Exitoso');
            }else {
                alert(`Error: ${data.msg}`);
            }

        }catch(error){
            console.error('Error:', error);
            alert('Error al inicio de sesión')
        }

       }

       document.getElementById('registerForm').addEventListener('submit', handleRegister);
       document.getElementById('loginForm').addEventListener('submit', handleLogin);
   
});

