function redirectToDashboard(email){localStorage.setItem('ohi_user_email',email);window.location.href='./dashboard.html';}
function loginWithSSO(p){redirectToDashboard('utilisateur@'+p+'.com');}
document.addEventListener('DOMContentLoaded',()=>{const f=document.getElementById('loginForm');if(f){f.addEventListener('submit',e=>{e.preventDefault();const email=document.getElementById('email').value;if(!email)return;redirectToDashboard(email);});}});
function logout(){localStorage.removeItem('ohi_user_email');window.location.href='./index.html';}