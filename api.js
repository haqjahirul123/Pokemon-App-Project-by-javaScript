const imgAdd = document.getElementById("container");
const details = document.getElementById("showDetails");

var info = " jahir made mistakelll";
var a = [];
var offset = parseInt(document.getElementById("btnShowMore").value);
//var offset= parseInt(document.getElementById("btnShowLess").value)
console.log(offset);

function changeOffsetNext() {
  imgAdd.innerHTML = "";
  //showDetails.innerHTML=""

  offset = offset + 10;
  console.log(offset);
  getData();
  document.getElementById("btnShowMore").innerHTML =
    "Next" + " " + `${offset}` + " " + "Pokimons";
}

function changeOffsetPrev() {
  imgAdd.innerHTML = "";

  offset = offset - 10;
  console.log(offset);
  getData();
  document.getElementById("btnShowLess").innerHTML =
    "Prev" + " " + `${offset}` + " " + "Pokimons";
}

const makeRequest = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Error: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
};

const getData = () => {
  //var offset=10
  imgAdd.innerHTML = "";
  localStorage.clear();
  makeRequest(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  ).then((res) => {
    console.log(res.results);
    var values = res.results;
    const getInfo = values.map((val) => {
      makeRequest(val.url)
        .then((res) => {
          console.log(res);
          console.log(res.forms[0].name);
          a.push(res);
          localStorage.setItem("RES", JSON.stringify(res));
          console.log(a);
          imgAdd.insertAdjacentHTML(
            "beforeend",
            ` 
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
                            BaseStat: ${res.stats[0].base_stat}<br>
                            Effort: ${res.stats[0].effort}<br>
                            Experience: ${res.base_experience}<br>
                            </div>
                        </div>
                        <div class="product-cart">
                            <button class="rmbutton showdetailButton" id="${res.id}" >Show Details</button>
                        </div>
                    </div> `
          );
          const productcard = imgAdd.lastElementChild;
          const readMebutton = productcard.querySelector(".showdetailButton");

          readMebutton.addEventListener("click", function () {
            this.id;

            fetch(`https://pokeapi.co/api/v2/ability/${this.id}`)
              .then((response) => response.json())
              .then((data) => {
                const carddata = `
                    <div class="product-card product-card-modal">
                    <div class="test1">
                    <div class="product-text">
                    <div class="product-name product-name-modal">
                    ${res.forms[0].name}<br>
                    <div class="product-img img-one-modal">  
                      <img src=${res.sprites.front_shiny} alt="" /> 
                    </div>
                
                    <hr>
                    </div>
                    <div class="pokemonInfo pokemonInfo-modal">
                    BaseStat: ${res.stats[0].base_stat}<br>
                    Type: ${res.types[0].type.name}<br>
                    Experience: ${res.base_experience}<br><br>
                    <hr>
                    Ability: ${data.names[7].name}<br>
                    [${data.effect_entries[1].effect}]
                    </div>
                    </div>
                    </div>
                    <br>
                    <div class="product-cart">
                    <button class="prbutton">Purchase Card</button>
                    </div>
                    </div>
                     `;
                console.log(data);

                showModal("Pokemon Card", carddata, [
                  {
                    label: "Close",
                    onClick: () => {
                      console.log("the button was clicked");
                    },
                    triggerClose: true,
                  },
                  {
                    label: "Previous",
                    onClick: () => {
                      console.log("the button was not clicked");
                    },
                  },
                  {
                    label: "Next",
                    onClick: () => {
                      console.log("the button was not clicked");
                    },
                  },
                  {
                    label: "Purchase",
                    onClick: () => {
                      console.log("the button was not clicked");
                    },
                  },
                ]);
              });
          });
        })
        .catch((err) => console.log(err));
    });
  });
};
getData();

function showModal(titelHtml, contentHtml, buttons) {
  const modal = document.createElement("div");

  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal__inner">
        <div class="modal__top">
            <div class="modal__title"> ${titelHtml}</div>
            <button class="modal__close" type="button">
                <span class="material-icons">close</span>
            </button>
        </div>
        <div class="modal__content">${contentHtml}</div>
        <div class="modal__bottom"></div>
        </div>
    </div>
        `;

  for (const button of buttons) {
    const element = document.createElement("button");
    element.setAttribute("type", "button");
    element.classList.add("modal__button");
    element.textContent = button.label;
    element.addEventListener("click", () => {
      if (button.triggerClose) {
        document.body.removeChild(modal);
      }

      button.onClick(modal);
    });

    modal.querySelector(".modal__bottom").appendChild(element);
  }
  modal.querySelector(".modal__close").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  document.body.appendChild(modal);
}
