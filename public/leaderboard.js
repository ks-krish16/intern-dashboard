  async function fetchPost() {


    try {
        const response = await fetch(`http://localhost:8080/api/leaderboard` );
        const posts = await response.json();
       

        if (response.ok) {
            displayPost(posts);
        } else {
            console.log("Error fetching post");
        }
    } catch (err) {
        console.log("Error:", err);
    }
}

function displayPost(posts) {
    
    const username = localStorage.getItem("username");
        const leaderboard = document.querySelector(".leaderboard");
        leaderboard.innerHTML = ""; // Clear previous content

        posts.forEach(intern => {

            const postElement = document.createElement("div");
            postElement.classList.add("interns");

            postElement.innerHTML = `
                <p class="user" >${intern.username}</p>
                <p class="name">${intern.donations}</p>
                

            `;
             const userPara = postElement.querySelector(".user");
        if (intern.username === username) {
            userPara.textContent = "You";
        }

            leaderboard.appendChild(postElement);
          
    }
    
)}
window.onload = fetchPost;

               document.addEventListener("DOMContentLoaded", async function() {
    const username = localStorage.getItem("username");
    const userLink = document.querySelector("#sign-link");
    const signupBtn = document.getElementById("signup-button"); 
    const profile = document.getElementById("profile"); 
    const internName = document.getElementById("profile");
    
    if (username) {
        if (signupBtn) signupBtn.textContent = username;
        if (profile) profile.textContent = "logout";
        
    }
    setTimeout(() => {
         if(!username){
        alert("Please login/signup to access the leaderboard.");
        window.location.href = "/signup";
    }
    },3000)
    
            
       
})
 function logout() {
                localStorage.clear();
                window.location.href = "/";
            }