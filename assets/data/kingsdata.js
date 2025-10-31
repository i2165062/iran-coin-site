const kingsData = {
  category: "Kings & Historical Figures",
  timelineGroups: [
    {
      era: "Ancient Empires (Achaemenid to Sassanid, 6th BC – 7th AD)",
      description:
        "The era of Iran’s ancient empires — visionary rulers who built one of the most advanced civilizations of the ancient world.",
      members: [
        {
          name: "Cyrus the Great",
          century: "6th Century BC",
          field: "King, Founder of Empire",
          birth: -600,
          death: -530,
          influence: { Governance: 100, Tolerance: 98, Legacy: 100 },
          regions: ["Iran", "Mesopotamia", "Anatolia"],
          image: "../images/people/cyrus.jpg",
          summary:
            "Founder of the Achaemenid Empire, Cyrus the Great created the world’s first declaration of human rights and a model of just governance that influenced history for millennia."
        },
        {
          name: "Darius the Great",
          century: "6th–5th Century BC",
          field: "King, Administrator, Builder",
          birth: -550,
          death: -486,
          influence: { Architecture: 98, Governance: 96, Economy: 95 },
          regions: ["Iran", "Egypt", "India"],
          image: "../images/people/darius.jpg",
          summary:
            "Darius I expanded the empire to its peak, introduced efficient administration, the Royal Road, and monumental architecture such as Persepolis."
        },
        {
          name: "Xerxes I",
          century: "5th Century BC",
          field: "King, Military Leader",
          birth: -519,
          death: -465,
          influence: { Military: 94, Architecture: 92, Legacy: 88 },
          regions: ["Iran", "Greece", "Egypt"],
          image: "../images/people/xerxes.jpg",
          summary:
            "Xerxes I, known for his wars against Greece, embodied imperial grandeur and architectural magnificence, extending Achaemenid cultural influence."
        },
        {
          name: "Ardashir I",
          century: "3rd Century AD",
          field: "King, Founder of Dynasty",
          birth: 180,
          death: 242,
          influence: { Statecraft: 94, Religion: 90, Legacy: 92 },
          regions: ["Iran", "Mesopotamia"],
          image: "../images/people/ardashir.jpg",
          summary:
            "Founder of the Sassanid Empire, Ardashir revived Persian identity, centralized power, and made Zoroastrianism the state religion."
        },
        {
          name: "Khosrow I (Anushirvan)",
          century: "6th Century AD",
          field: "King, Reformer",
          birth: 501,
          death: 579,
          influence: { Justice: 98, Reform: 96, Philosophy: 92 },
          regions: ["Iran", "Byzantium", "India"],
          image: "../images/people/khosrow.jpg",
          summary:
            "Khosrow I, 'The Just', modernized the Sassanid Empire with fair governance, education reforms, and patronage of science and philosophy."
        }
      ]
    },
    {
      era: "Islamic Dynasties & Medieval Heroes (7th–18th centuries)",
      description:
        "From the fall of Sassanids to the rise of Persian-Islamic empires, Iran’s spirit endured through statesmen, conquerors, and cultural patrons.",
      members: [
        {
          name: "Rudabeh of Samanid Court",
          century: "9th Century",
          field: "Queen, Patron of Arts",
          birth: 840,
          death: 900,
          influence: { Culture: 90, Patronage: 88, Symbolism: 85 },
          regions: ["Iran", "Central Asia"],
          image: "../images/people/rudabeh.jpg",
          summary:
            "A noblewoman of the Samanid court, Rudabeh was a symbol of Persian revival in art and literature after the Arab conquest."
        },
        {
          name: "Mahmud of Ghazni",
          century: "10th–11th Century",
          field: "King, Conqueror, Patron of Arts",
          birth: 971,
          death: 1030,
          influence: { Expansion: 96, Patronage: 94, Military: 92 },
          regions: ["Iran", "India", "Central Asia"],
          image: "../images/people/mahmud.jpg",
          summary:
            "Founder of the Ghaznavid Empire, Mahmud expanded Persian culture across the Islamic world and supported poets like Ferdowsi and Unsuri."
        },
        {
          name: "Nizam al-Mulk",
          century: "11th Century",
          field: "Vizier, Political Theorist",
          birth: 1018,
          death: 1092,
          influence: { Politics: 96, Education: 92, Philosophy: 88 },
          regions: ["Iran", "Iraq"],
          image: "../images/people/nizam.jpg",
          summary:
            "The great vizier of the Seljuks, Nizam al-Mulk established the Nizamiyyah schools and authored 'Siyasat-nama', shaping governance across centuries."
        },
        {
          name: "Nader Shah Afshar",
          century: "18th Century",
          field: "King, Military Genius",
          birth: 1688,
          death: 1747,
          influence: { Military: 100, Strategy: 96, Legacy: 90 },
          regions: ["Iran", "India", "Caucasus"],
          image: "../images/people/nader.jpg",
          summary:
            "A tactical genius known as the 'Napoleon of the East', Nader Shah restored Iran’s borders and brought the Mughal treasures of Delhi home."
        },
        {
          name: "Abbas I (Shah Abbas the Great)",
          century: "16th–17th Century",
          field: "King, Builder, Reformer",
          birth: 1571,
          death: 1629,
          influence: { Architecture: 100, Reform: 94, Diplomacy: 92 },
          regions: ["Iran", "Caucasus", "Europe"],
          image: "../images/people/abbas.jpg",
          summary:
            "The greatest Safavid monarch, Shah Abbas transformed Isfahan into a cultural capital, reformed the army, and opened trade with Europe."
        }
      ]
    },
    {
      era: "Modern Era & Nation Builders (19th–20th centuries)",
      description:
        "The leaders who rebuilt Iran amid modernization, colonial pressure, and national awakening — from Qajar diplomacy to Pahlavi reforms.",
      members: [
        {
          name: "Agha Mohammad Khan Qajar",
          century: "18th–19th Century",
          field: "King, Founder of Dynasty",
          birth: 1742,
          death: 1797,
          influence: { Unification: 96, Politics: 90, Legacy: 88 },
          regions: ["Iran", "Caucasus"],
          image: "../images/people/aghamohammad.jpg",
          summary:
            "Founder of the Qajar dynasty, Agha Mohammad Khan reunited Iran after chaos, establishing a new centralized monarchy in Tehran."
        },
        {
          name: "Naser al-Din Shah Qajar",
          century: "19th Century",
          field: "King, Reformer",
          birth: 1831,
          death: 1896,
          influence: { Modernization: 88, Diplomacy: 90, Culture: 86 },
          regions: ["Iran", "Europe"],
          image: "../images/people/naser.jpg",
          summary:
            "A modernizer who opened Iran to photography, printing, and diplomacy with Europe, though his long reign faced internal resistance and reformist calls."
        },
        {
          name: "Reza Shah Pahlavi",
          century: "20th Century",
          field: "King, Reformer, Nation Builder",
          birth: 1878,
          death: 1944,
          influence: { Modernization: 100, Infrastructure: 98, Education: 92 },
          regions: ["Iran"],
          image: "../images/people/rezashah.jpg",
          summary:
            "Founder of the Pahlavi dynasty, Reza Shah industrialized Iran, built modern infrastructure, and established secular education and legal systems."
        },
        {
          name: "Mohammad Reza Shah Pahlavi",
          century: "20th Century",
          field: "King, Modernizer",
          birth: 1919,
          death: 1980,
          influence: { Reform: 92, Diplomacy: 94, Modernization: 90 },
          regions: ["Iran", "Europe", "USA"],
          image: "../images/people/mohammadreza.jpg",
          summary:
            "The last monarch of Iran, Mohammad Reza Shah’s White Revolution brought rapid modernization and education reforms before his overthrow in 1979."
        },
        {
          name: "Dr. Mohammad Mossadegh",
          century: "20th Century",
          field: "Prime Minister, National Leader",
          birth: 1882,
          death: 1967,
          influence: { Democracy: 100, Nationalism: 96, Legacy: 94 },
          regions: ["Iran", "Global"],
          image: "../images/people/mossadegh.jpg",
          summary:
            "The champion of Iran’s national sovereignty and oil nationalization, Mossadegh became a global symbol of democracy and anti-colonial resistance."
        }
      ]
    }
  ]
};
