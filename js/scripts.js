

//business logic
//------------------------------------------------------------------------------
//pizza object
function Pizza() {
  this.size = "reg" //other size options, "sm", "l", "xl"
  this.toppings = ["cheese"]; //other options "pepperoni", "chicken", "mushrooms", "olives", "red_onions", "bell_peppers"
}
//does pizza have a certain topping
Pizza.prototype.hasTopping = function(topping) {
  return this.toppings.includes(topping);
}
//add a topping
Pizza.prototype.addTopping = function(newTopping) {
  //if topping to be added already exists in array, don't add it
  if (this.toppings.includes(newTopping)) {
    return false;
  }
  else {
    this.toppings.push(newTopping);
    return true;
  }
}
//remove a topping
Pizza.prototype.removeTopping = function (removedTopping) {
  //get index of topping
  var index = this.toppings.indexOf(removedTopping);
  //remove topping from array
  this.toppings.splice(index, 1);
}
//get cost of pizza
Pizza.prototype.getCost = function () {
  var cost = 0;
  //check for pizza size
  if (this.size === "sm")       {cost = 6;}
  else if (this.size === "reg") {cost = 8;}
  else if (this.size === "l")   {cost = 10;}
  else if (this.size === "xl")  {cost = 14;}
  //check for toppings
  if(this.toppings.includes("pepperoni"))   {cost += 1;}
  if(this.toppings.includes("chicken"))     {cost += 1;}
  if(this.toppings.includes("cheese"))      {cost += 1;}
  if(this.toppings.includes("mushrooms"))   {cost += 0.5;}
  if(this.toppings.includes("olives"))      {cost += 0.5;}
  if(this.toppings.includes("red_onions"))  {cost += 0.5;}
  if(this.toppings.includes("bell_peppers")){cost += 0.5;}
  return cost;
}

//user interface logic
//------------------------------------------------------------------------------
//gets total cost of order
function getTotalCost (pizzas) {
  var totalCost = 0;
  pizzas.forEach(function (pizza) {
    totalCost += pizza.getCost();
  });
  return totalCost;
}
//redraws borders around ingredient pictures
function redrawBorders(toppings, pizzas) {
  //redraw all img borders black
  $(".topping").css("border", "5px solid black");
  //parse toppings and turn appropriate borders green
  toppings.forEach(function (item) {
    if(pizzas[thisPizza()].hasTopping(item)) {
      $("#" + item).css("border", "5px solid #32CD32");
    }
  });
}
//gets the index of the pizza currently being altered
function thisPizza() {
  return parseInt($("#pizzaNumber").val());
}
//print out order summary
function orderSummary(pizzas) {
  $("#orderList").html("");
  for(index = 0; index < pizzas.length; index++){
    $("#orderList").append("<li>Pizza " + (index+1) + ":<br>Size: " + pizzas[index].size + "<br>Toppings: " + pizzas[index].toppings.join(", ") + "<br>Price: $" + pizzas[index].getCost().toFixed(2) + "</li>");
  }
  $("#orderSummaryBtn").text("Update Order Summary");
}

$(document).ready(function(){
var availableToppings = ["pepperoni","chicken","cheese","mushrooms","olives","red_onions","bell_peppers"];
var pizzaAmount = 0;
var pizzas = [];

  //anytime the pizza amount is changed, clear everything and create new pizza objects
  $("#pizzaAmount").change(function(){
    //clear previous pizzas
    pizzas = [];
    //get number of pizzas to create
    pizzaAmount = parseInt($("#pizzaAmount").val());
    //clear list
    $("#pizzaNumber").html("");
    for (i = 0; i < pizzaAmount; i++) {
      //create pizza objects
      pizzas.push(new Pizza());
      //update list
      $("#pizzaNumber").append("<option value='" + i + "''>Pizza " + (i+1) + "</option>");
    }
    //draw borders for first pizza
    redrawBorders(availableToppings, pizzas);
    //update cost for first pizzaSize
    $("#pizzaCost").text("$" + pizzas[thisPizza()].getCost().toFixed(2));
    //update total cost
    $("#totalPrice").text("$" + getTotalCost(pizzas).toFixed(2));
    //show main content
    $("#mainContent").show();
    $("#total").show();
  });

  //anytime the pizza selected is changed, switch to that set of toppings
  $("#pizzaNumber").change(function(){
    //redraws borders
    redrawBorders(availableToppings, pizzas);
    //change size shown
    $("#pizzaSize").val(pizzas[thisPizza()].size);
    //get cost and display
    $("#pizzaCost").text("$" + pizzas[thisPizza()].getCost().toFixed(2));
  });

  //anytime the pizza size is changed
  $("#pizzaSize").change(function(){
    //set new pizza size for the selected pizza
    pizzas[thisPizza()].size = $("#pizzaSize").val();
    //print new cost
    $("#pizzaCost").text("$" + pizzas[thisPizza()].getCost().toFixed(2));
    //update total cost
    $("#totalPrice").text("$" + getTotalCost(pizzas).toFixed(2));
  });

  //when an ingredient is clicked
  $("#pizzaOptions img").click(function(){
    var topping = this.closest("div").id;
    //check if topping is in pizza
    if (pizzas[thisPizza()].hasTopping(topping)) {
      //if already in pizza, remove
      pizzas[thisPizza()].removeTopping(topping);
    }
    else {
      //if not, add
      pizzas[thisPizza()].addTopping(topping)
    }
    //redraw borders
    redrawBorders(availableToppings, pizzas);
    //print cost
    $("#pizzaCost").text("$" + pizzas[thisPizza()].getCost().toFixed(2));
    //update total cost
    $("#totalPrice").text("$" + getTotalCost(pizzas).toFixed(2));
  });

  $("#orderSummaryBtn").click(function(){
    orderSummary(pizzas);
    $("#orderSummary").show();
  });
});
