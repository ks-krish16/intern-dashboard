 document.addEventListener("DOMContentLoaded", async function() {
    const username = localStorage.getItem("username");
    const userLink = document.querySelector("#sign-link");
    const signupBtn = document.getElementById("signup-button"); 
    const profile = document.getElementById("profile"); 
    const reward1= document.getElementById("reward-1");
    const reward2 = document.getElementById("reward-2");    
    const reward3 = document.getElementById("reward-3");
    const reward4 = document.getElementById("reward-4");
    const reward5 = document.getElementById("reward-5");
    const reward6 = document.getElementById("reward-6");
    

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
             
    
    const donations = localStorage.getItem("donations");
    if(donations >1){
        
       reward1.classList.add("premium");
    }
})
 function logout() {
                localStorage.clear();
                window.location.href = "/";
            }