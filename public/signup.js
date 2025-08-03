
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form submission
    signup();
});


async function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        alert(data.message);
        
        if (data.success) {
            localStorage.setItem("username",data.username);
            localStorage.setItem("email",data.email);
            window.location.href = "/";}  
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred! Please try again.");
    }
}
