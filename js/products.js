// The div where the products will be inserted in
let productDiv = document.querySelector('#projects-items');

// data from server side
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

    // for loop to get object's elements
    for (let i = 0; i < reqData.length; i++) {
      const product = reqData[i];
      
      // DOM element
      productDiv.innerHTML +=
    `
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