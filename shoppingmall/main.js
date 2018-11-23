// 

document.getElementById("login").addEventListener("click", () => {
    showModal("Login");
});

document.getElementById("join").addEventListener("click", () => {
    showModal("Join");
});


document.getElementById("modal_exit").addEventListener("click", function(){
    closeModal();
});

document.querySelector(".modal").addEventListener("click", function(e){
    if(e.target === e.currentTarget)
        closeModal();
});


const showModal = (message) => {
    document.querySelector(".modal").style.display = "block";

    document.querySelector(".modal_login h2").innerHTML = message;
}
const closeModal = () => {
    document.querySelector(".modal").style.display = "none";
}
