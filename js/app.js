const loadCategories = () => {
  const url = 'https://openapi.programming-hero.com/api/news/categories';
  fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories => {
  const categoriesContainer = document.getElementById('categories');
  categories.forEach(category => {
    const categoryList = document.createElement('div');
    categoryList.innerHTML = `
        <li onclick= "getNews('${category.category_id}')" class="list-group-item, px-4">${category.category_name}</li>
        `;
    categoriesContainer.appendChild(categoryList);
  })

}

loadCategories();

const getNews = (News) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${News}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data));
}

const displayNews = news => {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ``;
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

                    <p class="card-text px-2"><small class="fw-bold">${showNews.author.name ? showNews.author.name : 'Unknown'}</small></p>
                    </div>

                    <div class= "d-flex">
                    <i class="bi bi-eye-fill px-2"></i>
                    <p class="card-text"><small class="fw-bold">${showNews.total_view ? showNews.total_view : 'no views'}</small></p>
                    </div>

                    <button onclick="loadNewsdetails()" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><small>Show Details</small></button>
                    
                      </div>
                    </div>
                  </div>
            
        `;
    newsContainer.appendChild(newsDiv);
  })
}

