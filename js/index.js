
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
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
    await displayCategorieDetails(data.data);
    // console.log('get details', category_id);
}


const displayCategorieDetails = async categoryData => {
    console.log('categoryData', categoryData);

    const categoryDetails = document.getElementById('category-details');
    categoryData.forEach(cat => {
        console.log('cat', cat)
        const catDiv = document.createElement('div');
        catDiv.classList.add('row');

        catDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
            <div class="col-md-4">
            <img src="${cat.thumbnail_url}" class="img-fluid rounded-start" alt="...">
           </div>
        <div class="col-md-8">
            <div class="card-body">
               <h5 class="card-title">Card title</h5>
               <p class="card-text">This is a wider card with supporting text below as a natural
               lead-in to additional content. This content is a little bit longer.
               </p>
               <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
           </div>
        </div>
        </div>
                </div>

        `;

        categoryDetails.appendChild(document.createElement('div'));
        categoryDetails.appendChild(catDiv);



    })




    // category.forEach(category => {



    // })

}
loadCategories();