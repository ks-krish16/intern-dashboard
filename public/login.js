  document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault();
        loginUser();
    });
        async function loginUser() {
        const username1 = document.getElementById('username1').value;
        const email1 = document.getElementById('email1').value;
        const password1 = document.getElementById('password1').value;
        
        try{
            const response= await fetch('https://intern-dashboard-f4yw.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username:username1, email:email1, password:password1 })
        })
        
        const data=await response.json();
        alert(data.message);
    
        if (data.success){
            localStorage.setItem("username",data.username);
            localStorage.setItem("email",data.email);

            window.location.href = `/?username=${encodeURIComponent(data.username)}`

        
        }} catch(error) {
    console.log("Error:", error);
    alert("An error occurred: " + error.message); 
}

    
    }
