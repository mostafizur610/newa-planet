
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        // console.log(data);
        displayCategories(data.data.news_category);
    } catch (error) {
        console.log('error', error);
    }

}


const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `
             <button onclick="loadCategoryDetails('${category.category_id}')" class="btn btn-link text-decoration-none">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
}


const loadCategoryDetails = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    const sortData = data.data.sort((a, b) => b.total_view - a.total_view);
    await displayCategorieDetails(sortData);
    // console.log('get details', category_id);
}


const displayCategorieDetails = async categoryData => {
    // console.log('categoryData', categoryData);
    const totalCat = categoryData.length === 0 ? 'No News Found' : `${categoryData.length}  items found`;
    // console.log('totalCat', totalCat);
    const totalLength = document.getElementById('total-length');
    totalLength.innerHTML = `
    <p class="text-center p-4">${totalCat}</p>
`;
    const categoryDetails = document.getElementById('category-details');
    categoryDetails.innerHTML = '';

    categoryData.forEach(cat => {
        // console.log('cat', cat)
        const catDiv = document.createElement('div');
        catDiv.classList.add('row');

        catDiv.innerHTML = `
        <div class="card mb-3 container">
                    <div class="row g-0">
            <div class="col-md-4">
            <img src="${cat.thumbnail_url}" class="img-fluid rounded-start" alt="...">
           </div>
        <div class="col-md-8">
            <div class="card-body">
               <h5 class="card-title">${cat.title}</h5>
               <p class="card-text">${cat.details.length > 200 ? cat.details.slice(0, 200) + '...' : 'cat.details'}</p>

        <div class="d-flex justify-content-between">             
               <div class="d-flex justify-content-between">
               <img src="${cat.author.img}" class="rounded-circle img-author" alt="">
               <div>
               <p class="card-text"><small class="text-muted">${cat.author.name}</small></p>
               <p class="card-text"><small class="text-muted">${cat.author.published_date}</small></p>
        </div>

</div>
            
         <p class="card-text">${cat.total_view} Views</p>
        <button onclick="loadnNewsDetails('${cat._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
        <div>
        
    </div>

              
           </div>
        </div>
        </div>
                </div>

        `;

        categoryDetails.appendChild(catDiv);



    })
}

const loadnNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    dispayLoadNewsDetails(data.data[0]);
}

const dispayLoadNewsDetails = news => {
    // console.log(news)
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img class="w-100 py-3" src="${news.thumbnail_url}" alt="">
    <p>${news.details}</p>
    <p>${news.author.name ? news.author.name : 'no author found'
        }</p>
    `;
}

loadCategories();





