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


