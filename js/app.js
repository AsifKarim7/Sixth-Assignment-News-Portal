// Load Categories from api
const loadCategories = () => {
  const url = 'https://openapi.programming-hero.com/api/news/categories';
  fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories => {
  const categoriesContainer = document.getElementById('categories-list');
  categories.forEach(category => {
    const categoryList = document.createElement('div');
    categoryList.innerHTML = `
        <li onclick= "getNews('${category.category_id}','${category.category_name}')" class="list-group-item, px-4">${category.category_name}</li>
        `;
    categoriesContainer.appendChild(categoryList);
  })

}

// get news Categories from api
const getNews = (News, name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${News}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data, name));
  toggleSpinner(true);
}

// toggle spinner
const toggleSpinner = isLoading => {
  const loadingSection = document.getElementById('loader');
  if (isLoading) {
    loadingSection.classList.remove('d-none')
  }
  else {
    loadingSection.classList.add('d-none');
  }
}

// display news from api
const displayNews = (news, name) => {
  console.log(news);
  if (news.length == 0) {
    toggleSpinner(false);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    const error = document.getElementById('error');
    error.innerText = "No items found."

    const footer = document.getElementById('footer');
    footer.classList.add('fixed-bottom');
  }
  else {
    const footer = document.getElementById('footer');
    footer.classList.remove('fixed-bottom');

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    // sort the news views
    news.sort((a, b) => b.total_view - a.total_view)

    news.forEach(showNews => {
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('row', 'border', 'rounded', 'mb-4', 'p-4');

      newsDiv.innerHTML = `
          
                    <div class="col-md-3">
                      <img src="${showNews.thumbnail_url}" class="news-img rounded" alt="image">
                    </div>
  
                    <div class="col-md-9">
                      <div class="card-body">
                        <h5 class="card-title fw-bolder pb-4">${showNews.title}</h5>
                        <p class="card-text text-secondary pb-3">${showNews.details.slice(0, 200)}</p>
                      
                        <div class = "d-flex justify-content-between pt-5">
                        <div class= "d-flex ">
                      <img  src="${showNews.author.img}" class=" author-img" alt="image">
  
                      <p class="card-text px-2"><small class="fw-bold">${showNews.author.name ? showNews.author.name : 'Not Found'}</small></p>
                      </div>
  
                      <div class= "d-flex">
                      <i class="bi bi-eye-fill px-2"></i>
                      <p class="card-text"><small class="fw-bold">${showNews.total_view ? showNews.total_view : 'no views'}</small></p>
                      </div>
  
                      <button onclick="loadNewsDetails('${showNews._id}')" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><small>Show Details</small></button>
                      
                        </div>
                      </div>
                    </div>
              
          `;

      newsContainer.appendChild(newsDiv);
      toggleSpinner(false);

      const error = document.getElementById('error');
      error.innerText = "";
    })
  }

  // show items found from category
  const categoryNumber = document.getElementById('category-number');
  categoryNumber.innerHTML = '';
  const numberDiv = document.createElement('div');
  numberDiv.classList.add('p-2', 'bg-white', 'rounded')
  numberDiv.innerHTML = `
      <p class='text-center fw-bold pt-2'>${news.length} items found for this ${name}</p>
  `;
  categoryNumber.appendChild(numberDiv);
}


// load news details from api
const loadNewsDetails = (details) => {
  const url = `https://openapi.programming-hero.com/api/news/${details}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data));
}


// display news details in modal
const displayNewsDetails = (showDetails) => {
  const modalTitle = document.getElementById('newsDetailModalLabel');
  modalTitle.innerText = showDetails[0].title;

  const newsDetails = document.getElementById('news-details');
  newsDetails.innerHTML = `
 <img class="my-4 w-100" src="${showDetails[0].thumbnail_url}"></img>
 <p>"${showDetails[0].details.slice(0, 100)}"</p>
 <p>Author Name: "${showDetails[0].author.name ? showDetails[0].author.name : 'Not Found'}"<p>
 <p>Published Date: "${showDetails[0].author.published_date ? showDetails[0].author.published_date : 'Not Found'}"</p>
  `;
}

loadCategories();
getNews();
