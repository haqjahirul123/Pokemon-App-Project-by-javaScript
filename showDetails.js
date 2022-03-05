const show1=document.getElementById("showDetails1")
const show2=document.getElementById("showDetails2")
const show3=document.getElementById("showDetails3")

var details=JSON.parse(localStorage.getItem('RES'))

show2.innerHTML+=`<div>
                        <div >
                            <hr>
                            <img src=${details.sprites.front_shiny} alt="" /> 
                        </div>
                    </div>`

show3.innerHTML+=`<div>
                      Weight: ${details.weight}<br>
                      Order:${details.order}<br>
                      Height:${details.height}
                    </div>`

const showDetails=()=>{
    
    
     console.log(details)
       details.abilities.map((detail)=>{
        // console.log(detail)
        show1.innerHTML+=`<div>
                            <div>
                                Name: ${detail.ability.name}<br>
                                Slot Number: ${detail.slot}<hr>
                            </div>
                                
                        </div>`
        })         
}

showDetails()