// ai.js

function generateWorkout(){
let goal=document.getElementById("goal").value;
let level=document.getElementById("level").value;
let split=document.getElementById("split").value;

document.getElementById("workoutResult").innerHTML=
"🔥 Goal: "+goal+"<br>" +
"📈 Level: "+level+"<br>" +
"🏋️ Split: "+split+"<br><br>" +
"Day 1: Chest + Triceps<br>" +
"Day 2: Back + Biceps<br>" +
"Day 3: Legs + Core<br>" +
"Progressive overload weekly.";
}

function generateMeal(){
let foods=document.getElementById("foods").value;

document.getElementById("mealResult").innerHTML=
"🍳 Breakfast: Eggs + Banana<br>" +
"🍛 Lunch: Rice + Chicken<br>" +
"🥜 Snack: Nuts + Milk<br>" +
"🍽 Dinner: "+foods+"<br>" +
"💧 Drink plenty of water.";
}

function generateBudget(){
let budget=document.getElementById("budget").value;

document.getElementById("budgetResult").innerHTML=
"💰 Budget ₹"+budget+" Plan:<br>" +
"🥚 Eggs<br>" +
"🍚 Rice<br>" +
"🥜 Peanuts<br>" +
"🍌 Banana<br>" +
"🥛 Milk<br>" +
"Best muscle gain on budget.";
}
