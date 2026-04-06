let data = [];

async function loadCSV() {
  const res = await fetch("./data/contacts.csv");
  const text = await res.text();

  const rows = text.split("\n").slice(1); // skip header

  data = rows.map(row => {
    const cols = row.split(",");

    return {
      name: cols[0] || "",
      company: cols[1] || "",
      position: cols[2] || "",
      priority: "medium", // default
      score: 3
    };
  });

  autoScore();
  render();
}

function autoScore() {
  data = data.map(person => {
    let p = person.position.toLowerCase();

    if (p.includes("ceo") || p.includes("founder")) {
      person.priority = "high";
      person.score = 5;
    } else if (p.includes("manager") || p.includes("head")) {
      person.priority = "medium";
      person.score = 3;
    } else {
      person.priority = "low";
      person.score = 1;
    }

    return person;
  });
}

loadCSV();