const container = document.querySelector(".container")
const count = document.querySelector("#count")
const money = document.querySelector("#money")
const select = document.querySelector("#movie")
const okButton = document.querySelector(".ok")

container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected")

        calculateTotal()
    }
})

select.addEventListener("change",calculateTotal)
okButton.addEventListener("click",okButtonClicked)


function calculateTotal(){
    const selectedSeats = container.querySelectorAll(".seat.selected")
    let selectedSeatCount = selectedSeats.length
    count.innerText = selectedSeatCount
    money.innerText = select.value * selectedSeatCount
}

function okButtonClicked(e){
    const selectedSeats = container.querySelectorAll(".seat.selected")
    alert(`${money.innerText} TL para ödeyiniz !!!`)
    for (let i of selectedSeats){
        i.classList.remove("selected")
        i.classList.add("reserved")
        count.innerText = 0 
        money.innerText = 0
    }  
}


