$(function() {
  var productId = getProductId();

  var productRef = firebase.database().ref("/products/" + productId);
  productRef.on("value", function(snapshot) {
    var product = snapshot.val();

    $("#count").text(product.count);
  });

  $("form").on("submit", function(e) {
    e.preventDefault();

    var count = $("#add-count").val();

    productRef.update({
      count
    });
  });
});

function getProductId() {
  var params = new URLSearchParams(window.location.search);
  var prodcutId = params.get("id");

  return prodcutId;
}
