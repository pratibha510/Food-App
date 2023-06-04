

/*  Using fetch to get the food items from API
    On the load of the screen run this function */
async function getMenu() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
      const data = await response.json();
      console.log("Food Data");
      console.log(data);
      addFoodsToUI(data);
    } catch (error) {
      console.log('Error:', error);
    }
}

window.onload = getMenu();


//function to create food cards and add them to UI
const cardContainer = document.getElementsByClassName('card-container')[0];
function addFoodsToUI(foods)  {
    foods.forEach(food => {
        let div = document.createElement('div');
        div.setAttribute('data-item', food.id);
        div.classList.add('card');
        div.innerHTML = `<img src="${food.imgSrc}" alt="${food.name} image">
        <h3>${food.name}</h3>
        <div class="rating-container">
            <span>$${food.price}</span>
        </div>
        <button>Quick View</button>`;

        cardContainer.appendChild(div);
    });
}


/* This function should return a promise and shoud take 2500 milliseconds to resolve the order.
   Any 3 burgers randomly   */
function takeOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const burgers = ["Cheeseburger", "Veggie Burger", "Chicken Burger"];
        const order = {
          burgers: [burgers[Math.floor(Math.random() * 3)], burgers[Math.floor(Math.random() * 3)], burgers[Math.floor(Math.random() * 3)]]
        };
        resolve(order);
      }, 2500);
    });
}

/* This function also returns a promise and takes 1500 milliseconds to resolve and 
   the resolve should return {order_status:true; paid:false}   */
function orderPrep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({order_status: true, paid: false});
      }, 1500);
    });
}

/* This function also returns a promise and takes 1000 milliseconds to reolve and 
   the resolve returns the object {order_status:true; paid:true}*/
function payOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({order_status: true, paid: true});
      }, 1000);
    });
}


function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

  // Attach event listener to order button
const orderFoodBtn = document.getElementById("order-food");
orderFoodBtn.addEventListener("click", async () => {
    loadAmination();
    try {
      const order = await takeOrder();
      console.log("Order placed: ", order);

      const orderStatus = await orderPrep();
      console.log("Order status: ", orderStatus);

      const payment = await payOrder();
      console.log("Payment status: ", payment);

      if (payment.paid) {
        thankyouFnc();
      }
    } catch (error) {
      console.error(error);
    }
});

//function to load animation on UI when order begins to prepare
function loadAmination() {
    const loader = document.getElementById('page-loader');
    loader.style.display = 'flex';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 5000);
}
