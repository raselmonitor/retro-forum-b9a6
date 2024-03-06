const cardContainer = document.getElementById('card-container');
const latestPostContainer = document.getElementById('latest-post-container');

// all data from  the API will be stored in this array

const allData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await response.json()
    const allPost = data.posts
    // console.log(allPost)
    allPost.forEach(post => {
        // console.log(post);

        // cardContainer.textContent = "";

        const card = document.createElement('div');
        card.innerHTML = `
        <div class="flex gap-4 bg-[#F2F2FF] p-6 rounded-3xl border border-[#797DFC] shadow-xl">
                            <div>
                                <img class="rounded-2xl object-cover h-[72px] w-[72px]" src=${post.image} alt="">
                                <div class="translate-y-[-80px] translate-x-8 lg:translate-x-12 h-5 w-5 ${post.isActive ? "bg-green-600" : "bg-red-600"} rounded-full"></div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex gap-10">
                                    <p># <span>${post.category}</span></p>
                                    <p><span>Author : </span>${post.author.name}</p>
                                </div>
                                <h3 class="text-xl font-bold text-[#12132D]">${post.title}
                                </h3>
                                <p>${post.description}</p>
                                <hr class="border border-dashed border-[#12132D40]">
                                <div class="flex lg:gap-[245px] justify-between items-center">
                                    <div class="flex gap-10">
                                        <div>
                                            <i class="fa-regular fa-message"></i>
                                            <span>${post.comment_count}</span>
                                        </div>
                                        <div>
                                            <i class="fa-regular fa-eye"></i>
                                            <span>${post.view_count}</span>
                                        </div>
                                        <div>
                                            <i class="fa-regular fa-clock"></i> 
                                            <span>${post.posted_time} min</span> 
                                        </div>
                                    </div>
                                    <button onclick="selectBtn('${post.title}', ${post.view_count})" class="btn bg-[#10B981] text-white p-4 rounded-full"><i
                                            class="fa-solid fa-envelope-open"></i></button>
                                    </div>
                            </div>
                        </div>
        `
        cardContainer.appendChild(card);

    });


}

// searching data related js

const loadData = async (value) => {
    cardContainer.innerHTML = "";
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`)
    const data = await response.json()
    const allPost = data.posts
    // console.log(allPost)
    allPost.forEach(post => {
        // console.log(post);
        const card = document.createElement('div');

        card.innerHTML = `
        <div class="flex gap-4 bg-[#F2F2FF] p-2 lg:p-6 rounded-3xl border border-[#797DFC] shadow-xl">
                            <div>
                                <img class="rounded-2xl object-cover h-[72px] w-[72px]" src=${post.image} alt="">
                                <div class="translate-y-[-80px] translate-x-14 h-5 w-5 ${post.isActive ? "bg-green-600" : "bg-red-600"} rounded-full"></div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex gap-10">
                                    <p># <span>${post.category}</span></p>
                                    <p><span>Author : </span>${post.author.name}</p>
                                </div>
                                <h3 class="text-xl font-bold text-[#12132D]">${post.title}
                                </h3>
                                <p>${post.description}</p>
                                <hr>
                                <div class="flex justify-between items-center">
                                    <div class="flex gap-10">
                                        <div>
                                            <i class="fa-regular fa-message"></i>
                                            <span>${post.comment_count}</span>
                                        </div>
                                        <div>
                                            <i class="fa-regular fa-eye"></i>
                                            <span>${post.view_count}</span>
                                        </div>
                                        <div>
                                            <i class="fa-regular fa-clock"></i> 
                                            <span>${post.posted_time} min</span> 
                                        </div>
                                    </div>
                                    <button onclick="selectBtn('${post.title}', ${post.view_count})" class="btn bg-[#10B981] text-white p-4 rounded-full"><i
                                            class="fa-solid fa-envelope-open"></i></button>
                                    </div>
                            </div>
                        </div>
        `
        cardContainer.appendChild(card);

    });

    setTimeout(() => {
        spinningToggleHandler(false);
    }, 2000);
    // spinningToggleHandler(false);
}

// search button related js

const searchBtn = () => {
    spinningToggleHandler(true);
    const inputValue = document.getElementById('searchInput').value;
    loadData(inputValue)
}

// spinning toggle show /hide handler

const spinningToggleHandler = (isToggle) => {
    const loader = document.getElementById('sining-handler');
    if (isToggle) {
        loader.classList.remove('hidden')
    }
    else {
        loader.classList.add('hidden')
    }
}



// card append related js

const selectedCard = document.getElementById('selected-card-container');
let count = 0;

const selectBtn = (title, view) => {
    const cardCount = document.getElementById('card-count').innerText = count + 1;
    count++
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-between gap-5 bg-white p-5 rounded-xl">
                                <h3 class="text-xl font-bold text-[#12132D]">${title}
                                </h3>
                                <div class="flex justify-center items-center gap-2">
                                    <i class="fa-regular fa-eye"></i>
                                    <span>${view}</span>
                                </div>
                            </div>
        `
    selectedCard.appendChild(div);
}



// latest post related js

const loadData2 = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await response.json()
    data.forEach(post => {
        // console.log(post);
        const latestPost = document.createElement('div');
        latestPost.className = `card bg-base-100 shadow-xl border`
        latestPost.innerHTML = `
                        <figure class="px-10 pt-10">
                          <img src=${post.cover_image} alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="card-body ">
                          <div>
                            <i class="fa-solid fa-calendar-days"></i> <span>${post?.author?.posted_date || "No publish date"}</span>
                          </div>
                          <h4 class="text-lg font-extrabold text-[#12132D]">${post.title}</h4>
                          <p>${post.description}</p>
                          <div class="flex gap-4">
                            <div><img class="h-11 w-11 rounded-full" src=${post.profile_image} alt=""></div>
                            <div>
                                <h5 class="font-bold text-[#12132D]">${post.author.name}</h5>
                                <p>${post?.author?.designation || "Unknown"}</p>
                            </div>
                          </div>
                        </div>
        `
        latestPostContainer.appendChild(latestPost);

    });


}


loadData2()
allData()
loadData()