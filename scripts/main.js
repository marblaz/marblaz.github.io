const updatedDate = "23. 4. 2021 v 14:36";
const vaccTotal = 1794701;
const vaccSevenDays = 301860;
const daysSinceStart = 117;
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