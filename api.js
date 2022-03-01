const imgAdd = document.getElementById("container");
const details = document.getElementById("showDetails");

var info = " jahir made mistakelll";
var a = [];
var offset= parseInt(document.getElementById("btnShowMore").value)
//var offset= parseInt(document.getElementById("btnShowLess").value)
console.log(offset)


function changeOffsetNext(){

imgAdd.innerHTML=""
//showDetails.innerHTML=""

  offset = offset + 10;
  console.log(offset)
  getData()
  document.getElementById("btnShowMore").innerHTML="Next"+" "+ `${offset}`+" "+"Pokimons"

}

function changeOffsetPrev(){

  imgAdd.innerHTML=""
  
    offset = offset-10;
    console.log(offset)
    getData()
    document.getElementById("btnShowLess").innerHTML="Prev"+" "+ `${offset}`+" "+"Pokimons"
   
  
  }



const makeRequest = async (url) => {
  const response = await fetch(url);

  //console.log(response)
  //return response
  if (!response.ok) {
    const message = `Error: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
};

const getData = () => {
  //var offset=10
  localStorage.clear();
  makeRequest(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    .then((res) => {
      console.log(res.results);
      var values = res.results;
      const getInfo = values.map((val) => {
        makeRequest(val.url).then((res) => {
          console.log(res);
          console.log(res.forms[0].name);
          a.push(res)

          localStorage.setItem("RES",JSON.stringify(res))
          console.log(a)  


          return (imgAdd.innerHTML += ` 
         
                    <div class="product-card">
                        <div class="product-img img-one">  
                            <img src=${res.sprites.front_shiny} alt="" /> 
                         </div>
                        <div class="product-text">
                        <div class="product-name">
                        ${res.forms[0].name}<br>
                        ID: ${res.id}
                        </div>
                            <div class="pokemonInfo">
                             <hr>
                            Weight: ${res.weight}<br>
                            Order: ${res.order}<br>
                            Height: ${res.height}<br>
                            </div>

                            
                        </div>
                        <div class="product-cart">
                            <a href="showDetails.html">
                            <button onclick="infoTransfer()" >Show Details</button>
                            </a>
                        </div>
                    </div> `
          
          )
        });
      });
      console.log(getInfo);
    })
    .catch((err) => console.log(err));

    
};

console.log(getData());









