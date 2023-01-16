import {menuArray} from './data.js'
//elements
const products = document.getElementById('products')
const orders = document.getElementById('orders')
const currentTotal = document.getElementById('totalPrice')
const btnComplete = document.getElementById('btnComplete')
const paymentModal =  document.getElementById('paymentModal')
const btnPay = document.getElementById('btnPay')
const paidMessage = document.getElementById('paid')


let orderId = 0;



// add item btn sr listener
document.addEventListener('click', function(e){
    const selectedProduct = e.target.dataset.product
    if(e.target.dataset.product){
      
       addItemToOrder(selectedProduct)
       
       orders.style.display="flex"
    }
})
// remove listener
document.addEventListener('click', function(e){
    const selectedProduct = e.target.dataset.remove

    if(selectedProduct){
       removeOrderItem(selectedProduct)
    }

})

//order place listener
btnComplete.addEventListener('click', function(){
   paymentModal.style.display="unset"
})


//payment listener
btnPay.addEventListener('click', paid)

// add item to order list unction
function addItemToOrder(selectedItem){
    orderId++
    let html =''
   const itemToAdd = menuArray.filter(function(item){
        return item.id==selectedItem
    })[0];
    
    html += `
    <li class="order_item" data-item="${itemToAdd.id}" id="${orderId}">
    <p class="product_name">${itemToAdd.name} <span class="item-remove" data-remove="${orderId}" '>remove</span></p>
    <p class="product_price">$${itemToAdd.price}</p>
</li>`

    paidMessage.style.display="none"

document.getElementById('orderList').innerHTML+=html

totalPrice(itemToAdd.price)
}


//total price calculator
function totalPrice(price){
    
    const newPrice = Number(currentTotal.innerHTML )+ price
    currentTotal.textContent= newPrice
}



//remove item
function removeOrderItem(id){
    const item = document.getElementById(id)
   
    currentTotal.textContent = Number(currentTotal.textContent) - Number(item.lastElementChild.textContent.slice(1))
    item.innerHTML=''
    if(Number(currentTotal.textContent)==0){
        orders.style.display="none"
    
    }
}

// Payment complete Message
function paid(){
    paymentModal.style.display = 'none'
    orders.style.display="none"
    const name = document.getElementById('name').value
    paidMessage.innerText = `
    Thanks, ${name}! Your order on the way!`
    paidMessage.style.display = "block"
 
}


// Render products

function render(){

    let html = ''
menuArray.forEach(function(product){
    html+=
    `<div class="product">
    <img  src="${product.img}" class="product_img">
    <div class="product_details">
    <h3 class="product_name">${product.name}</h3>
    <p class="product_tags">${product.ingredients}</p>
    <p class="product_price">$${product.price}</p>
    </div>
    <button class="btn_add" data-product="${product.id}">+</button>
    
    </div>
    `
})

products.innerHTML = html
}


render()