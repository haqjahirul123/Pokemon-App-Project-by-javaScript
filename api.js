const imgAdd = document.getElementById("container");

var info = " jahir made mistakelll";
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
  makeRequest("https://pokeapi.co/api/v2/pokemon?limit=15&offset=200")
    .then((res) => {
      console.log(res.results);
      var values = res.results;
      const getInfo = values.map((val) => {
        makeRequest(val.url).then((res) => {
          console.log(res);
          console.log(res.forms[0].name);
          //console.log(res.held_items[0].item[0].name)

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
                            <button type="submit">Add to cart</button>
                        </div>
                    </div> `);
        });
      });
      console.log(getInfo);
    })
    .catch((err) => console.log(err));
};
console.log(getData());

// <div>
//                      <p>${res.forms[0].name}<p/>
//
//                     <p>${res.held_items[1].item[0]}<p/>

//                 </div>