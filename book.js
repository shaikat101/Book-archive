// error hide
document.getElementById('error-text').style.display = 'none';

// search button click
const searchBook = () => {
  const searchResult = document.getElementById('search-result');
    searchResult.textContent='';
  const search = document.getElementById('error-text');
    search.textContent='';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';

      // Empty Search Error handle
    if (searchText == '') {
        document.getElementById('error-text').style.display = 'block';
        document.getElementById('error-text').style.color = "red";
        const error = document.getElementById('error-text');
        error.innerText=' Search Field cannot be empty';
        return;
    }

 else{
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs,data.numFound));

 }
}

//display books 
const displaySearchResult = (books,data) =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent='';
    // handle no results error
    if(books.length===0){
      document.getElementById('error-text').style.display = 'block';
      document.getElementById('error-text').style.color = "red";
      const error = document.getElementById('error-text');
      error.innerText=' No Result Found';
      return;
    }
    document.getElementById('error-text').style.display = 'block';
    document.getElementById('error-text').style.color = "green";
    const error = document.getElementById('error-text');
    error.innerText=` Total search result: ${data}  `;

    
    books.forEach(book=> {
        console.log(book);

        const div = document.createElement('div');
        div.classList.add('col');
       if(book.cover_i==null){
        div.innerHTML =  `
        <div class="container card h-100">
        <img width="100%" height="450px" class="mx-auto" height="176px"  src="./image/logo.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Book: ${book.title}</h5>
          <p class="card-title fw-bolder">Writter: ${book.author_name}</p>
          <hr>
          <p class="card-text fw-bolder">Publisher: ${book.publisher}</p>
          <hr>
          <p class="fw-bolder">First Publish: ${book.first_publish_year}</p>
        </div>
      </div>
        `
       }
       else{
        div.innerHTML =  `
        <div class="container card h-100">
        <img height="450px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">Book: ${book.title}</h5>
          <p class="card-title fw-bolder">Writter: ${book.author_name}</p>
          <hr>
          <p class="card-text fw-bolder">Publisher: ${book.publisher}</p>
          <hr>
          <p class="fw-bolder">First Publish: ${book.first_publish_year}</p>
        </div>
      </div>
        `;
       }
        searchResult.appendChild(div);
    })
}