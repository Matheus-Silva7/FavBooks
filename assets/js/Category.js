const lateral = document.querySelector(".offcanvas");
const body = document.querySelector("body")
const titleCategory = document.querySelector(".resultsBook");
let categoryPage;

const categoryList = [
  {category: "adventure", title:"Aventura"},
  {category: "fiction", title:"Ficção"},
  {category: "fantasy", title:"Fantasia"},
  {category: "romance", title:"Romance"},
  {category: "drama", title:"Drama"},
  {category: "horror", title:"Terror"},
  {category: "computers", title:"Tecnologia"},
  {category: "history", title:"História"},
  {category: "philosophy", title:"Filosofia"},
  {category: "math", title:"Matemática"}
]

function categoryClick(category, title){
  document.querySelector("."+category).addEventListener('click', ()=>{
    categoryPage = category
    fetchCategory(categoryPage)
    titleCategory.textContent = "Livros de "+title
    titleCategory.style.color = "#dab903";
  })
}

categoryList.forEach(({ category, title }) => {
  categoryClick(category, title);
});

function fetchCategory(category) {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=40`,
    { method: "get" }
  )
    .then((results) => results.json())
    .then((data) => cardCategory(data));
}

function cardCategory(data) {
  const items = data.items;
  containerBook.innerHTML = "";
  items.forEach((item) => {
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
    containerBook.appendChild(cardBook);

  

    const btnMoreDetail = cardBook.querySelector(".moreDetails");
    btnMoreDetail.addEventListener("click", () => moreDetails(item));
  });
}

function moreDetails(item) {
  const id = item.id; 
  console.log(id);

  const thumbnailUrl = item.volumeInfo.imageLinks
    ? item.volumeInfo.imageLinks.thumbnail
    : "assets/img/bookNotFound.jpg";


  main.innerHTML = "";
  const containerDetails = document.createElement("div");
  containerDetails.classList.add("containerDetails", "container");
  containerDetails.innerHTML = `
        <div class="imgBook">
        <a class="btnBack" href="/index.html"><i class="fa-solid fa-arrow-left"></i></a>
        <img src="${thumbnailUrl}" alt="">
      </div>
      <div class="ContentText">
        <div class="title">
          <h2>${item.volumeInfo.title}</h2>
          <h5>${item.volumeInfo.subtitle || ""}</h5>
        </div>
    
        <div class="description">
          <h3>Descrição</h3>
          <p>${item.volumeInfo.description}</p>
        </div>
          
        <div class="info">
          <h3>Informações adicionais</h3>
          <table class="tableInfo">
            <tbody>
<tr class="lineGray">
    <th>Titulo:</th>
    <td>${item.volumeInfo.title || "Not found"}</td>
  </tr>
  <tr class="lineBlack">
    <th>Subtitulo:</th>
    <td>${item.volumeInfo.subtitle || "Not found"}</td>
  </tr>
  <tr class="lineGray">
    <th>Autores:</th>
    <td>${item.volumeInfo.authors || "Not found"}</td>
  </tr>
  <tr class="lineBlack"> 
    <th>Editora:</th>
    <td>${item.volumeInfo.publisher || "Not found"}</td>
  </tr>
  <tr class="lineGray">
    <th>Publicação:</th>
    <td>${item.volumeInfo.publishedDate || "Not found"}</td>
  </tr>
  <tr class="lineBlack">
    <th>Nº paginas:</th>
    <td>${item.volumeInfo.pageCount || "Not found"}</td>
  </tr>
  <tr class="lineGray">
    <th>Categoria:</th>
    <td>${item.volumeInfo.categories || "Not found"}</td>
  </tr>
            </tbody>
          </table>
        </div>
      </div>`;

  addToList(item);

  main.appendChild(containerDetails);
  document.documentElement.scrollTop = 0;
}
