
var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:
$(function(){

    function update_params() {
       /*  var search_params = {
            "quantity": $("#quantity").val(),
            "color": $("#color .option-button.selected").attr("id"),
            "quality": $("#quality .option-button.selected").attr("id"),
            "style": $("#style").val() ,
        } */
    search_params.quantity = $("#quantity").val();
    search_params.color = $("#color .option-button.selected").attr("id");
    search_params.quality = $("#quality .option-button.selected").attr("id");
    search_params.style = $("#style").val();
    console.log(search_params);
    update_order_details();
  
    }

    //function to update the order details in their respective ids
    function update_order_details() {
        $(".refresh-loader").show();
        $("#result-quantity").html(parseInt(search_params.quantity));

        var colorId = "#" + search_params.color;
        $("#result-color").html( $(colorId).text() );

        var qualityId = "#" + search_params.quality;
        $("#result-quality").html( $(qualityId).text() );

        var styleId = "#style option[value =" + search_params.style + "]";
        $("#result-style").html( $(styleId).text() );

        //calling the calculate_price function in another function for it to work
        var total_order = calculate_price();
            
       //updating the photo in the site
       var photoUrl = "img/" + products[search_params.color][search_params.style].photo;
        $("#photo-product").attr("src", photoUrl);

       //this is to set how long it will take for the hide method to start - 200ms
        setTimeout(function() {
            $(".refresh-loader").hide();
        }, 200); 
        
    }

    //logic behind calculating the price using the instructions given to us
    function calculate_price() {
        var unitPrice = products[search_params.color][search_params.style].unit_price;
        console.log(unitPrice);

        if (search_params.quality == "q190") {
            unitPrice *= 1.12;
        }

        var total = (unitPrice * search_params.quantity);

        if( search_params.quantity >= 1000) {
            total *= 0.8;
        }else if( search_params.quantity >= 500) {
            total *= 0.88;
        }else if( search_params.quantity >= 100) {
            total *= 0.95;
        }
       // var totalString = total.toLocaleString("en-US", {style: "currency", currency: "USD"});
        //return total;
       $("#total-price").text( total.toLocaleString("en-US", {style: "currency", currency: "USD"}) );

    }

    $("#quantity").change(function() {
        search_params.quantity = $("#quantity").val();
        update_order_details();
    });

    $("#style").change(function() {
        search_params.style = $("#style").val(); 
        update_order_details();
    });

    $(".option-button").click(function() {

    var idbutton = $(this).parent().attr("id"); // the this helps to get the id of the parent of the selected child class
    var childSelector = "#" + idbutton + " .option-button"; // the id is then used to get the selected child class of the parent id
    $(childSelector).toggleClass("selected"); //this removes the selected class from it if there is any applied on it
   /*  $(this).addClass("selected"); // with the help of the "this" it adds the selected class to the clicked selected button 
   */
    var selectedChild = "#" + idbutton + " .option-button.selected";
    search_params[idbutton] = $(selectedChild).attr("id");
    update_order_details();

    });

    update_params();

    //#result-product 
    //#result-style
    //#result-color
    //#result-quality
    //#result-quantity


});










