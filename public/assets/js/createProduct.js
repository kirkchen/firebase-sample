$(function() {
  // 1. 取得商品資料
  $("#createProduct").on("submit", function(e) {
    e.preventDefault();

    var key = createProductKey();

    var picture = $("#picture").get(0).files[0];
    var productImageRef = firebase
      .storage()
      .ref("productImages/" + key)
      .child(picture.name);

    productImageRef.put(picture).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        var product = {
          title: $("#title").val(),
          price: +$("#price").val(),
          count: +$("#count").val(),
          description: $("#description").val(),
          url: url
        };

        console.log(product);
        createProduct(key, product);
      });
    });
  });
});

function createProductKey() {
  var database = firebase.database();
  var productRef = database.ref("products");
  var key = productRef.push().key;

  return key;
}

function createProduct(key, product) {
  var database = firebase.database();
  var productRef = database.ref("products");

  productRef.child(key).set(product);
}
