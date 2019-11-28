
var plus = function () {
    var Quantity = parseFloat($("#qty").val());
    $("#qty").val(Quantity + 0.5);
}

var minus = function () {
    var Quantity = parseFloat($("#qty").val());
    if (Quantity > 0.5)
        $("#qty").val(Quantity - 0.5);
}

var validateInput = function (productId) {
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();

    if (fromDate != "" && toDate != "") {
        $("#errorMessage").text("");
        return true;
    }
    else if (fromDate == "" || fromDate == "undefined") {
        $("#errorMessage").text("*please select fromDate");
        return false;


    }
    else if (toDate == "" || toDate == "undefined") {
        $("#errorMessage").text("*please select toDate");
        return false;


    }
}

var removeCartItem = function (item, totalPrice, productId, ProductAmount) {
    item.parent().parent().hide(800);
    //item.parent().parent().addClass("animated fadeOut");
    var products = getProductFromCookie();

    for (var i = 0; i < products.length; i++) {
        if (products[i].productId == productId) {
            products.splice(i, 1);
            addProductToCookie(products);
            //var total = totalPrise - ProductAmount;

            var total = parseFloat($("#total").text()) - ProductAmount;

            $("#total").text(total);
            break;
        }
    }
}

var addProductToCookie = function (products) {
    $.cookie("products", JSON.stringify(products), { path: '/', expires: 7 });
    updateCartItemCount();

}

var getProductFromCookie = function () {
    var products = JSON.parse($.cookie("products"));
    return products;
}

var isCartEmpty = function () {
    var products = getProductFromCookie();
    if (products != null && products.length > 0) {
        return false;
    }
    else {
        return true;
    }
}

var addProductToCart = function (productId) {
    //$("#AddToCartButton").addClass("animated fadeOutUp");

    if (validateInput()) {

        var item = { "productId": productId, "productQuantity": $("#qty").val(), "fromDate": $("#fromDate").val(), "toDate": $("#toDate").val() }
        if (isCartEmpty()) {
            var products = [item];
            addProductToCookie(products);

            $("#cartProductCount").addClass("flipinX").text(products.length);
        }
        else {
            var products = getProductFromCookie();
            if (!checkDuplicateProductInCart(item, products)) {
                products.push(item);
                addProductToCookie(products);

            }
        }
    }

}

var updateCartItemCount = function () {
    $("#cartProductCount").addClass("animated shake").text(getProductFromCookie().length);

}

var checkDuplicateProductInCart = function (item, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].productId == item.productId) {
            list[i].productQuantity = item.productQuantity;
            list[i].fromDate = item.fromDate;
            list[i].toDate = item.toDate;
            addProductToCookie(list);
            return true;
        }
    }
    return false;
}

var openCart = function () {
    var products = getProductFromCookie();


}

var GetCartTotalAmount = function (productDetails) {
    var products = getProductFromCookie();

    var totalAmount = 0;

    for (var i = 0; i < products.length; i++) {
        //products[i].Quantity * ()
    }

}

var addUserTokenToCookie = function (token) {
    $.cookie("userToken", token, { path: '/', expires: 350 });
}

var logout = function () {
    $.cookie("userToken", null, { path: '/', expires: 350 });
    $("#dropdownaccount").hide();
    $("#account").show();
    window.location.href = "/Home/Index";

}

var selectAddress = function (addressId) {
    $.cookie("addressId", JSON.stringify(addressId), { path: '/', expires: 7 });
    window.location.href = "/Home/Checkout";
}


var paymentMethodChange = function () {
    var paymentMethod = $("name=paymentMethod:checked").val();
    if (paymentMethod == "OP") {
        $.cookie("paymentMethod", JSON.stringify("OP"), { path: '/', expires: 256 });
        $("#CashOnDelivery").hide();
        $("#OnlinePayment").show();
    }
    else {
        $.cookie("paymentMethod", JSON.stringify("COD"), { path: '/', expires: 256 });
        $("#CashOnDelivery").show();
        $("#OnlinePayment").hide();
    }
}

