console.log("Nikhil")  

// let boxes =  bhupendraJogis = document.getElementsByClassName("box")
// console.log(bhupendraJogis)

// boxes[2].style.backgroundColor = "red"

// document.getElementById("redbox").style.backgroundColor = "red"

// document.querySelector(".box").style.backgroundColor = "green"
console.log(document.querySelectorAll(".box"))
document.querySelectorAll(".box").forEach(e =>{
    e.style.backgroundColor = "green"
})