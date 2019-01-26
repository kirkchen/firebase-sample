$(function() {
  var productId = getProductId();

  var productRef = firebase.database().ref("/products/" + productId);
  productRef.on("value", function(snapshot) {
    var product = snapshot.val();

    $("#title").text(product.title);
    $("#price").text(product.price);
    $("#count").text(product.count);
    $("#description").text(product.description);
    $("#picture").attr('src', product.url);

    $addToCart = $("#add-to-cart");
    $soldout = $("#soldout");
    $addToCart.hide();
    $soldout.hide();
    if (product.count > 0) {
      $addToCart.show();
    } else {
      $soldout.show();
    }
  });
});

function getProductId() {
  var params = new URLSearchParams(window.location.search);
  var prodcutId = params.get("id");

  return prodcutId;
}
