$(function() {
  firebase.auth().onAuthStateChanged(async function(user) {
    if (!user) {
      window.location.href = "login.html";
    }

    var shoppingCart = await getShoppingCart(user.uid);

    var cart = {};
    var totalPrice = 0;
    for(var productId in shoppingCart) {
        var product = await getProduct(productId);
        product.qty = shoppingCart[productId];
       
        totalPrice += +product.qty * +product.price;

        cart[productId] = product;
    }

    var tmpl = $.templates('#shopping-cart');
    var html = tmpl.render(cart);

    $('#cart').html(html);
    $('#total-price').html(totalPrice);
  });
});

async function getShoppingCart(userId) {
  var shoppingCartRef = firebase.database().ref("shoppingCart/" + userId);
  var snapshot = await shoppingCartRef.once("value");

  return snapshot.val();
}

async function getProduct(productId) {
  var productRef = firebase.database().ref('products/' + productId);
  var snapshot = await productRef.once("value");

  return snapshot.val();
}
