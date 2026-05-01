// ============================================
// 🔥 PAVENFITZZ AI COACH — ai.js
// ============================================

const API_URL = "https://api.anthropic.com/v1/messages";

async function callAI(prompt) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Could not generate plan. Try again.";
}

function showLoading(id) {
  const el = document.getElementById(id);
  el.classList.add("show");
  el.innerHTML = `
    <div class="loading-dots">
      <span></span><span></span><span></span>
    </div>
  `;
}

function showResult(id, html) {
  const el = document.getElementById(id);
  el.classList.add("show");
  el.innerHTML = html;
}

// ============================================
// 💪 WORKOUT GENERATOR
// ============================================
async function generateWorkout() {
  const goal  = document.getElementById("goal").value;
  const level = document.getElementById("level").value;
  const split = document.getElementById("split").value;
  const btn   = document.getElementById("workoutBtn");

  btn.disabled = true;
  btn.innerText = "Generating...";
  showLoading("workoutResult");

  const prompt = `You are an expert fitness coach. Create a ${split} workout plan for a ${level} level person with goal: ${goal}.
Give exactly 4-6 days. For each day give: day name, 4-5 exercises with sets x reps.
Format as plain text. Use emojis. Keep it concise and practical for Indians.
End with one motivational tip.`;

  try {
    const text = await callAI(prompt);
    const lines = text.split("\n").filter(l => l.trim());
    const html = lines.map(line => {
      if (line.match(/day\s*\d/i) || line.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i)) {
        return `<div class="result-day"><div class="result-day-title">${line}</div></div>`;
      }
      return `<div class="result-line"><span>${line}</span></div>`;
    }).join("");

    showResult("workoutResult",
      `<div style="margin-bottom:10px;">
        <span class="tag tag-gold">${goal}</span>
        <span class="tag tag-green">${level}</span>
        <span class="tag tag-gold">${split}</span>
      </div>` + html
    );
  } catch(e) {
    showResult("workoutResult",
      `<div class="result-line" style="color:#ff4444;">
        ⚠️ Error generating plan. Check connection.
      </div>`
    );
  }

  btn.disabled = false;
  btn.innerText = "Generate Workout 💪";
}

// ============================================
// 🍽️ MEAL GENERATOR
// ============================================
async function generateMeal() {
  const foods = document.getElementById("foods").value.trim();
  const btn   = document.getElementById("mealBtn");

  if (!foods) { alert("Enter the foods you have at home ⚠️"); return; }

  btn.disabled = true;
  btn.innerText = "Generating...";
  showLoading("mealResult");

  const prompt = `You are a nutrition expert. The person has these foods at home: ${foods}.
Create a full day meal plan (Breakfast, Lunch, Snack, Dinner) using ONLY these foods.
Make it high protein and practical. Add calories estimate per meal.
Keep it short, use emojis, format for Indian diet preferences.`;

  try {
    const text = await callAI(prompt);
    const lines = text.split("\n").filter(l => l.trim());
    const html = lines.map(line =>
      `<div class="result-line"><span>${line}</span></div>`
    ).join("");
    showResult("mealResult", html);
  } catch(e) {
    showResult("mealResult",
      `<div class="result-line" style="color:#ff4444;">⚠️ Error. Try again.</div>`
    );
  }

  btn.disabled = false;
  btn.innerText = "Generate Meal Plan 🍗";
}

// ============================================
// 💰 BUDGET DIET PLANNER
// ============================================
async function generateBudget() {
  const budget = document.getElementById("budget").value;
  const btn    = document.getElementById("budgetBtn");

  if (!budget || budget < 1) { alert("Enter a valid budget ⚠️"); return; }

  btn.disabled = true;
  btn.innerText = "Generating...";
  showLoading("budgetResult");

  const prompt = `You are a budget nutrition expert in India. 
Create a high protein muscle building diet plan for ₹${budget} per day budget.
List exact foods to buy with approximate prices in rupees.
Give full day meal plan: Breakfast, Lunch, Snack, Dinner.
Total should stay within ₹${budget}. Use emojis. Keep it practical for Indian markets.`;

  try {
    const text = await callAI(prompt);
    const lines = text.split("\n").filter(l => l.trim());
    const html = lines.map(line =>
      `<div class="result-line"><span>${line}</span></div>`
    ).join("");
    showResult("budgetResult",
      `<div style="margin-bottom:10px;">
        <span class="tag tag-green">Budget: ₹${budget}/day</span>
      </div>` + html
    );
  } catch(e) {
    showResult("budgetResult",
      `<div class="result-line" style="color:#ff4444;">⚠️ Error. Try again.</div>`
    );
  }

  btn.disabled = false;
  btn.innerText = "Generate Budget Plan 💰";
}
