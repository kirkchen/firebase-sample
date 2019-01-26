$(function() {
  // 1. 取得商品資料
  $("#createProduct").on("submit", function(e) {
    e.preventDefault();

    var product = {
      title: $("#title").val(),
      price: +$("#price").val(),
      count: +$("#count").val(),
      description: $("#description").val()
    };

    console.log(product);
    createProduct(product);
  });
});

function createProduct(product) {
  var database = firebase.database();
  var productRef = database.ref('products');
  var key = productRef.push().key;

  productRef.child(key).set(product);
}
