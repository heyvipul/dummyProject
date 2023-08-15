document.querySelector("#add").addEventListener("click", myDetail)

let addArr = JSON.parse(localStorage.getItem("address")) || []

function myDetail() {
    event.preventDefault()
    let addObj = {
      name : document.querySelector("#name").value,
      add1 : document.querySelector("#lane1").value,
      add2 : document.querySelector("#lane2").value,
      dist : document.querySelector("#dist").value,
      pin : document.querySelector("#pin").value,
      mobile : document.querySelector("#mobile").value,
    }
    document.querySelector("#name").value = ""
    document.querySelector("#lane1").value = ""
    document.querySelector("#lane2").value = ""
    document.querySelector("#dist").value = ""
    document.querySelector("#pin").value = ""
    document.querySelector("#mobile").value = ""

    if(!addObj.name||!addObj.add1||!addObj.add2||!addObj.dist||!addObj.pin||!addObj.mobile) {
      alert("Please fill all credentials")
    }else{
      addArr.push(addObj)

      localStorage.setItem("address", JSON.stringify(addArr))

      window.location.href = "payment.html"
    }
}

function fetchPin() {
  let pinCode = document.querySelector("#pin").value

  if(pinCode.length!==6){
    document.querySelector("#pinErr").innerText = "PIN Code must be of 6 digits"
  }else{
    document.querySelector("#pinErr").innerText = ""

    getPincode()
  }
}

let getPincode = async () => {
  try {
    let pinData = document.querySelector("#pin").value
    let response = await fetch(`https://api.postalpincode.in/pincode/${pinData}`)
    let data = await response.json()
    displayPIN(data[0].PostOffice)
    console.log(data[0].PostOffice)
  } catch (error) {
    console.log(error)
  }
}

function displayPIN(arr) {
  let blockAdd = document.querySelector("#lane2")
  blockAdd.value = arr[0].Block
  blockAdd.readOnly = true
  document.querySelector("#dist").value = arr[0].District
  document.querySelector("#dist").readOnly = true
}