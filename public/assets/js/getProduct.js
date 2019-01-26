$(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = "login.html";
    }

    var productId = getProductId();

    var productRef = firebase.database().ref("/products/" + productId);
    productRef.on("value", function(snapshot) {
      var product = snapshot.val();

      $("#title").text(product.title);
      $("#price").text(product.price);
      $("#description").text(product.description);
      $("#picture").attr("src", product.url);

      $addToCart = $("#add-to-cart");
      $soldout = $("#soldout");
      $addToCart.hide();
      $soldout.hide();
      if (product.count > 0) {
        $addToCart.show();
      } else {
        $soldout.show();
      }

      $(document).on("click", "#add-to-cart", function() {
        var count = $('#count').val();
        addProductIdToShoppingCart(user.uid, productId, count)
      });
    });
  });
});

function getProductId() {
  var params = new URLSearchParams(window.location.search);
  var prodcutId = params.get("id");

  return prodcutId;
}

function addProductIdToShoppingCart(userId, productId, count) {
  var shoppingCartRef = firebase.database().ref("shoppingCart");
  var shoppingCartItemRef = shoppingCartRef.child(userId).child(productId);

  shoppingCartItemRef.set(count);
}
