async function searchUrl() {
    removeOldCards();
    AddSkeletonLoading();
    url = document.getElementById("urlImg").value;
    result = await fetchData(url);
    removeOldCards();
    await DrawCard(result);

}

function AddSkeletonLoading() {
    divCard = document.getElementById("anime-cards");
    for (let x = 0; x <= 10; x++) {
        card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("anime-card");
        card.style.width = '18rem';
        card.innerHTML = (`<div role="status" class="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700">
            <div class="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">
                <svg class="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
            </div>
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            
            <span class="sr-only">Loading...</span>
        </div>`);
        console.log(card);
        divCard.append(card);
    }

}

function removeOldCards() {
    divCard = document.getElementById("anime-cards");
    divCard.innerHTML = '';
}

async function fetchData(url) {


    try {
        let res = await fetch("/search?url=" + url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function AddErrorElement(errorMsg) {
    divCard = document.getElementById("anime-cards");
    card = document.createElement("div");
    card.classList.add("card");
    //card.classList.add("anime-card");
    card.style.width = 'auto';
    card.style.margin = '10%'
    card.innerHTML = (`<div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Alert!</span> ${errorMsg}.
        </div>
      </div>`);
    divCard.append(card);
}

async function DrawCard(data) {
    console.log(data);

    divCard = document.getElementById("anime-cards");

    // Check if request got error 
    if (data["error"] == true) {
        console.log("Oh! " + data["data"]);
        AddErrorElement("Oh! " + data["data"]);
        return;
    }
    data = data["data"];

    if (data != null) {
        data.forEach(row => {
            card = document.createElement("div");
            //< class="card anime-card" style="width: 18rem;">
            card.classList.add("card");
            card.classList.add("anime-card");
            card.classList.add("swiper-slide");
            card.style.width = '18rem';
            //row["img"]
            card.innerHTML = (`<div style="max-height: 400px;height: 400px;min-height: 400px;width:auto" class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <video class="w-96" controls>
                    <source src="${row["video"]}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${row["title"]}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${row["filename"]}</p>
            </div>
        </div>`);
            //console.log(card);
            divCard.append(card);
        });
    }
}



/* Upload Images to server  */
async function searchImage() {
    removeOldCards();
    AddSkeletonLoading();
    result = await uploadImage();
    removeOldCards();
    await DrawCard(result);

}

async function uploadImage() {
    let photo = document.getElementById("searchImage").files[0];
    let formData = new FormData();

    formData.append("photo", photo);
    let response = await fetch('/searchImage', {
        method: "POST",
        body: formData
    })


    return await response.json();
}



/* ******************************************Common *********************************************************** */
function pasteUrl() {
    input = document.getElementById('urlImg');
    navigator.clipboard
        .readText()
        .then(
            cliptext =>
            (input.value = cliptext),
            err => console.log(err)
        );
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

});