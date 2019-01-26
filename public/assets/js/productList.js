$(function() {
  var productsRef = firebase.database().ref("products");

  productsRef.on("value", function(snapshot) {
    var products = snapshot.val();

    var tmpl = $.templates('#product-item');
    var html = tmpl.render(products);

    $('#product-list').html(html);
  });
});
