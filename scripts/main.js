const updatedDate = "22. 4. 2021 v 10:37";
const vaccTotal = 1739419;
const vaccSevenDays = 285699;
const daysSinceStart = 116;
const population = 10_700_155;

function recalculate() {
  const percentage = document.getElementById("percentage-slider").value;

  document.getElementById("percentage").innerHTML = percentage + " %";
  
  const daysLeft = calculateDays(percentage / 100);

  let daysText = "dní";
  if (daysLeft == 1) {
    daysText = "den";
  }
  else if (daysLeft > 1 && daysLeft < 5) {
    daysText = "dny";
  }

  document.getElementById("days").innerHTML = "Za " + daysLeft + " " +  daysText + ".";
}

function calculateDays(perc) {
    const selected = document.querySelector('input[name="timescale"]:checked').value;

    let vaccPerDay;
    if (selected == "all-time") {
      vaccPerDay = vaccTotal / daysSinceStart;
    }
    else if (selected == "seven-days") {
      vaccPerDay = vaccSevenDays / 7;
    }

    let result = Math.ceil(((population * perc) - vaccTotal) / vaccPerDay);
    
    return Math.max(result, 0);
}

function updateDate() {
  document.getElementById("date").innerHTML = "Aktualizováno " + updatedDate + ".";
}