const users = {};

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username]) {
        document.getElementById('signupMessage').innerText = "Username already exists!";
    } else {
        
        users[username] = password;

        document.getElementById('signupMessage').innerText = "Sign up successful!";
        
        document.getElementById('signupForm').reset();
    }
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

   
    if (users[username] && users[username] === password) {
        document.getElementById('loginMessage').innerText = "Login successful!";
        
        window.location.href = 'dashboard.html'; 
    } else {
        document.getElementById('loginMessage').innerText = "Invalid username or password.";
    }
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
});

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
});
