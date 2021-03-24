// Go to products page
function productsPage() {
  window.location = "pages/products.html";
}

// Products section
// The div where the products will be inserted in
let homeProductDiv = document.querySelector("#Products-items");

// this's a request
var serverReq = new XMLHttpRequest();

// when the request is ready do this function
serverReq.onreadystatechange = function () {
  //readyState is the step of the request
  // status is the status of the request
  if (this.readyState === 4 && this.status === 200) {
    // store the data on variable
    // and covert it into objects
    let reqData = JSON.parse(serverReq.responseText);

    // To catch last 4 objects from Json file
    let last4Products = reqData.length - 4;

    // for loop to get object's elements
    for (let i = last4Products; i < reqData.length; i++) {
      // catch only one element by its ordre in array
      const product = reqData[i];

      // DOM element
      homeProductDiv.innerHTML += `
        <div class="item TRotateDiv">
            <div class="item-img">
                <img src="../${product.imgUrl}" alt="web design">
            </div>
            <h2 class="item-title">${product.name}</h2>
            <p class="item-desc">${product.descr}</p>
            <a class="item-link" href="#">read more</a>
            </div>
    `;
    }
  }
};

serverReq.open("GET", "../data/products.json", true);
serverReq.send();

// Reviews section
// The div where the products will be inserted in
let homeReviewsDiv = document.querySelector("#Reviews-items");
var reviewsReq = new XMLHttpRequest();
var reqReviewsData;

reviewsReq.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    reqReviewsData = JSON.parse(reviewsReq.responseText);
    
    function showPosts() {
        // Every time you do this make the container empty
        homeReviewsDiv.innerHTML = "";
    
        // Remove first item from the array
        let removeItem = reqReviewsData.shift();
    
        // Add first removed item to the end of the array
        let addItem = reqReviewsData.push(removeItem);
    
        // Repeat every one sacond
        setTimeout(() => {
            showPosts();
        }, 4000);
        
        // Show the items in the div
        for (let i = 0; i < reqReviewsData.length; i++) {
            const myelement = reqReviewsData[i];
            
            homeReviewsDiv.innerHTML +=
              `
                <div class="item mySlides TRotateDiv hover-link-border fade">
                  <div class="item-img">
                    <img src="../${myelement.imgUrl}" alt="UserImage">
                  </div>
                  <div class="item-descr">
                    <p >${myelement.comment}</p>
                    <p class="txt-change-color">${myelement.username}</p>
                  </div>
                </div>
              `;
        }
    
        // To show only two items
        let slides = document.querySelectorAll('.mySlides');
        /* The specific items = slides.length - 3 */
    
        for (let a = 0; a < slides.length - 2; a++) {
            const slide = slides[a];
            // Hide the rest
            slide.style.display = "none";
        }
    } // function showPosts
    setTimeout(() => {
        showPosts();
    }, 1000);       
  }
};

reviewsReq.open("GET", "../data/Reviews.json", true);
reviewsReq.send();
