const inputSearch = document.querySelector(".search-books");
const buttonSearch = document.querySelector(".btn-books");
const h2resultsBook = document.querySelector(".resultsBook");

//evento click para rodar o codigo
buttonSearch.addEventListener("click", (event) => {
  event.preventDefault(); // Evita o comportamento padrão de submissão do formulário

  //pegando o termo digitado pelo usuario
  const searchTerm = inputSearch.value.trim();

  if (searchTerm !== "") {
    fetchBooks(searchTerm);
  }
});

function fetchBooks(searchTerm) {
  //se o termo nao for vazio, realizar fetch na url da api com termo
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`,
    { method: "get" }
  )
    .then((results) => results.json())
    .then((data) => showSearch(data, searchTerm));
}


function showSearch(data, searchTerm) {
  items = data.items; // Atribua os itens globalmente
  console.log(items);

  containerBook.innerHTML = ``;
  h2resultsBook.textContent = `Resultados para: `;
  h2resultsBook.style.color = "white";
  const spanResult = document.createElement("span");
  spanResult.textContent = `${searchTerm}`;
  spanResult.style.color = "#F2D422";
  h2resultsBook.appendChild(spanResult);

  //foreach nos resultados do termo da pesquisa
  items.forEach((item) => {
    const cardBook = createCard(item);
    containerBook.appendChild(cardBook);
  });
}

function createCard(item) {
  const cardBook = document.createElement("div");
  cardBook.classList.add("card-book");

  const thumbnailUrl = item.volumeInfo.imageLinks
    ? item.volumeInfo.imageLinks.thumbnail
    : "assets/img/bookNotFound.jpg";

  cardBook.innerHTML += `
    <button class="btnList btnStyle" id="${item.id}"><i class="fa-regular fa-bookmark"></i></button>
    <div class="img-book">
      <img src="${thumbnailUrl}" alt="">
    </div>
    <p>${item.volumeInfo.title}</p>
    <div class="bntDet">
      <button id="${item.id}" class="moreDetails">Mais detalhes</button>
    </div>
  `;

  const btnMoreDetail = cardBook.querySelector(".moreDetails");
  btnMoreDetail.addEventListener("click", () => moreDetails(item));

  addToList(item);

  return cardBook;
}

function moreDetails(item) {
  const id = item.id; // corrigido para usar o ID do item clicado
  const detailsBook = items.find((book) => book.id == id);
  console.log(detailsBook);

  const thumbnailUrl = detailsBook.volumeInfo.imageLinks
    ? detailsBook.volumeInfo.imageLinks.thumbnail
    : "assets/img/bookNotFound.jpg";

  main.innerHTML = "";
  const containerDetails = document.createElement("div");
  containerDetails.classList.add("containerDetails", "container");
  containerDetails.innerHTML = `
        <div class="imgBook">
        <a class="btnBack" href="/index.html"><i class="fa-solid fa-arrow-left"></i></a>
        <img src="${thumbnailUrl}" alt="">
        <button class="btnlist btnSave"> Minha Lista <i class="fa-regular fa-bookmark"></i></button>
      </div>
      <div class="ContentText">
        <div class="title">
          <h2>${detailsBook.volumeInfo.title}</h2>
          <h5>${detailsBook.volumeInfo.subtitle || ""}</h5>
        </div>
    
        <div class="description">
          <h3>Descrição</h3>
          <p>${detailsBook.volumeInfo.description}</p>
        </div>
          
        <div class="info">
          <h3>Informações adicionais</h3>
          <table class="tableInfo">
            <tbody>
<tr class="lineGray">
    <th>Titulo:</th>
    <td>${detailsBook.volumeInfo.title || "Not found"}</td>
  </tr>
  <tr class="lineBlack">
    <th>Subtitulo:</th>
    <td>${detailsBook.volumeInfo.subtitle || "Not found"}</td>
  </tr>
  <tr class="lineGray">
    <th>Autores:</th>
    <td>${detailsBook.volumeInfo.authors || "Not found"}</td>
  </tr>
  <tr class="lineBlack"> 
    <th>Editora:</th>
    <td>${detailsBook.volumeInfo.publisher || "Not found"}</td>
  </tr>
  <tr class="lineGray">
    <th>Publicação:</th>
    <td>${detailsBook.volumeInfo.publishedDate || "Not found"}</td>
  </tr>
  <tr class="lineBlack">
    <th>Nº paginas:</th>
    <td>${detailsBook.volumeInfo.pageCount || "Not found"}</td>
  </tr>
  <tr class="lineGray">
    <th>Categoria:</th>
    <td>${detailsBook.volumeInfo.categories || "Not found"}</td>
  </tr>
            </tbody>
          </table>
        </div>
      </div>`;

  main.appendChild(containerDetails);
  document.documentElement.scrollTop = 0;
}

function addToList(item) {
  const buttonSalvar = document.querySelectorAll(".btnList");
  buttonSalvar.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.id;

      button.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
      button.style.color = "#dab903";

      const existeNaLista = livrosDesejados.some((livro) => livro.id === id);

      if (!existeNaLista) {
        const myFav = items.find((element) => element.id == id);
        livrosDesejados.push(myFav);
        console.log(livrosDesejados);
      } else {
        console.log("Elemento já está na lista");
      }
    });
  });
}
