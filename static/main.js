async function searchUrl() {
    url = document.getElementsByName("url")[0].value;
    result = await fetchData(url);
    await DrawCard(result);

}

async function fetchData(url) {
    /*await fetch(
        `/search?url=${encodeURIComponent(
          url
        )}`
    ).then((e) => {
        return e.json()
    });*/

    try {
        let res = await fetch("/search?url=" + url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function DrawCard(data) {
    console.log(data);

    divCard = document.getElementById("anime-cards");

    // Check if request got error 
    if (data["error"] == true) {
        console.log("Oh! " + data["data"]);
        return;
    }
    data = data["data"];

    if (data != null) {
        data.forEach(row => {
            card = document.createElement("div");
            //< class="card anime-card" style="width: 18rem;">
            card.classList.add("card");
            card.classList.add("anime-card");
            card.style.width = '18rem';

            card.innerHTML = (`
            <img src="${row["img"]}" class="card-img-top image-anime" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>`);
            console.log(card);
            divCard.append(card);
        });
    }
}