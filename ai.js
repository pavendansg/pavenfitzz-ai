const WORKER_URL = "https://pavenfitzz-ai.pavendansg.workers.dev";

async function callAI(prompt) {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text;
}

function showLoading(id) {
  const el = document.getElementById(id);
  el.classList.add("show");
  el.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`;
}

function showResult(id, html) {
  const el = document.getElementById(id);
  el.classList.add("show");
  el.innerHTML = html;
}

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
    showResult("workoutResult", `<div class="result-line" style="color:#ff4444;">⚠️ Error. Try again.</div>`);
  }

  btn.disabled = false;
  btn.innerText = "Generate Workout 💪";
}

async function generateMeal() {
  const foods = document.getElementById("foods").value.trim();
  const btn   = document.getElementById("mealBtn");

  if (!foods) { alert("Enter the foods you have ⚠️"); return; }

  btn.disabled = true;
  btn.innerText = "Generating...";
  showLoading("mealResult");

  const prompt = `You are a nutrition expert. The person has these foods: ${foods}.
Create a full day meal plan (Breakfast, Lunch, Snack, Dinner) using ONLY these foods.
High protein, practical. Add calories per meal. Use emojis. Indian diet style.`;

  try {
    const text = await callAI(prompt);
    const lines = text.split("\n").filter(l => l.trim());
    const html = lines.map(line =>
      `<div class="result-line"><span>${line}</span></div>`
    ).join("");
    showResult("mealResult", html);
  } catch(e) {
    showResult("mealResult", `<div class="result-line" style="color:#ff4444;">⚠️ Error. Try again.</div>`);
  }

  btn.disabled = false;
  btn.innerText = "Generate Meal Plan 🍗";
}

async function generateBudget() {
  const budget = document.getElementById("budget").value;
  const btn    = document.getElementById("budgetBtn");

  if (!budget || budget < 1) { alert("Enter valid budget ⚠️"); return; }

  btn.disabled = true;
  btn.innerText = "Generating...";
  showLoading("budgetResult");

  const prompt = `You are a budget nutrition expert in India.
Create a high protein muscle building diet for ₹${budget} per day.
List foods with prices in rupees. Full day plan: Breakfast, Lunch, Snack, Dinner.
Stay within ₹${budget}. Use emojis. Practical for Indian markets.`;

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
    showResult("budgetResult", `<div class="result-line" style="color:#ff4444;">⚠️ Error. Try again.</div>`);
  }

  btn.disabled = false;
  btn.innerText = "Generate Budget Plan 💰";
}
