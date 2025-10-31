const architectsData = {
  category: "Architects & Builders",
  timelineGroups: [
    {
      era: "Ancient & Classical Architecture (Achaemenid–Sassanid Era)",
      description:
        "Architects and builders who defined the geometry and monumental identity of ancient Persia — from Persepolis to Ctesiphon.",
      members: [
        {
          name: "Unknown Achaemenid Master Builders",
          century: "6th–4th Century BC",
          field: "Architects, Engineers",
          birth: -550,
          death: -330,
          influence: { Architecture: 100, Engineering: 95, Legacy: 100 },
          regions: ["Iran", "Mesopotamia"],
          image: "../images/people/achaemenid-builders.jpg",
          summary:
            "The architects of Persepolis combined stone engineering, relief art, and symmetry to create one of humanity’s most enduring architectural wonders."
        },
        {
          name: "Mir Ganj Nameh Designers (Persepolis Inscription Team)",
          century: "5th Century BC",
          field: "Stone Engravers, Designers",
          birth: -480,
          death: -450,
          influence: { Design: 90, Symbolism: 88, Engineering: 92 },
          regions: ["Iran"],
          image: "../images/people/inscription-team.jpg",
          summary:
            "Creators of the royal inscriptions and symbolic bas-reliefs that documented Persian governance and cosmology in monumental art."
        },
        {
          name: "Roman & Persian Bridge Engineers",
          century: "3rd–6th Century AD",
          field: "Engineers, Bridge Architects",
          birth: 200,
          death: 600,
          influence: { Engineering: 94, Innovation: 90, Infrastructure: 92 },
          regions: ["Iran", "Mesopotamia"],
          image: "../images/people/bridge.jpg",
          summary:
            "Engineers of the Sassanid Empire developed bridges, domes, and vaults that influenced later Islamic architecture from Baghdad to Isfahan."
        }
      ]
    },
    {
      era: "Islamic Golden Era & Persian Aesthetic (9th–17th centuries)",
      description:
        "Masters of domes, tilework, and sacred geometry — building mosques and gardens that shaped Persian-Islamic architecture forever.",
      members: [
        {
          name: "Baha al-Din al-Amili (Sheikh Bahaei)",
          century: "16th–17th Century",
          field: "Architect, Mathematician, Theologian",
          birth: 1547,
          death: 1621,
          influence: { Architecture: 100, Science: 94, Geometry: 92 },
          regions: ["Iran"],
          image: "../images/people/sheikhbahaei.jpg",
          summary:
            "The visionary architect of Isfahan’s urban plan under Shah Abbas. His works include Naqsh-e Jahan’s geometry and the innovative heating system of the Shah Mosque."
        },
        {
          name: "Ostad Isa Shirazi",
          century: "16th Century",
          field: "Architect, Engineer",
          birth: 1550,
          death: 1620,
          influence: { DomeDesign: 98, Engineering: 94, Artistry: 90 },
          regions: ["Iran"],
          image: "../images/people/isa-shirazi.jpg",
          summary:
            "A legendary Persian architect credited with major mosque domes and tilework innovations, his influence extended into Ottoman design aesthetics."
        },
        {
          name: "Ostad Ali Akbar Isfahani",
          century: "17th Century",
          field: "Architect, Builder",
          birth: 1580,
          death: 1650,
          influence: { Architecture: 98, Engineering: 94, Artistry: 92 },
          regions: ["Iran"],
          image: "../images/people/aliakbar.jpg",
          summary:
            "Chief architect of the Imam Mosque in Isfahan, combining visual harmony, tile geometry, and acoustic perfection in a timeless masterpiece."
        },
        {
          name: "Ghiyath al-Din Jamshid al-Kashi",
          century: "15th Century",
          field: "Mathematician, Engineer",
          birth: 1380,
          death: 1429,
          influence: { Geometry: 98, Engineering: 90, Science: 94 },
          regions: ["Iran"],
          image: "../images/people/kashi.jpg",
          summary:
            "A mathematician and engineer whose geometric works guided architects of the Timurid and early Safavid eras in dome and tile proportion."
        }
      ]
    },
    {
      era: "Modern & Contemporary Architecture (19th–21st centuries)",
      description:
        "Iranian architects who merged tradition with modernism — shaping skylines from Tehran to global capitals through design and cultural symbolism.",
      members: [
        {
          name: "Andre Godard",
          century: "20th Century",
          field: "Architect, Archaeologist",
          birth: 1881,
          death: 1965,
          influence: { Restoration: 96, Design: 94, Preservation: 98 },
          regions: ["Iran", "France"],
          image: "../images/people/godard.jpg",
          summary:
            "A French-Iranian architect who restored ancient sites and designed the National Museum of Iran, reviving Persian motifs through modern structure."
        },
        {
          name: "Houshang Seyhoun",
          century: "20th Century",
          field: "Architect, Painter, Designer",
          birth: 1920,
          death: 2014,
          influence: { Modernism: 98, Symbolism: 96, Legacy: 92 },
          regions: ["Iran", "Canada"],
          image: "../images/people/seyhoun.jpg",
          summary:
            "Creator of Iran’s most iconic modern monuments — including the tombs of Hafez and Avicenna — Seyhoun fused modern minimalism with ancient symbolism."
        },
        {
          name: "Kamran Diba",
          century: "20th–21st Century",
          field: "Architect, Urban Planner",
          birth: 1937,
          death: null,
          influence: { UrbanDesign: 98, Modernism: 92, SocialArchitecture: 90 },
          regions: ["Iran", "Europe"],
          image: "../images/people/diba.jpg",
          summary:
            "Architect of the Tehran Museum of Contemporary Art, Kamran Diba integrated Persian courtyards and skylight geometry into modern public spaces."
        },
        {
          name: "Nader Ardalan",
          century: "20th–21st Century",
          field: "Architect, Theorist",
          birth: 1939,
          death: null,
          influence: { Theory: 96, Tradition: 92, Sustainability: 90 },
          regions: ["Iran", "USA"],
          image: "../images/people/ardalan.jpg",
          summary:
            "Author of 'The Sense of Unity', Ardalan redefined Iranian architectural identity through the lens of sacred geometry and sustainable modernity."
        },
        {
          name: "Zaha Hadid’s Iranian Collaborators (Milad Tower Project)",
          century: "21st Century",
          field: "Architects, Engineers",
          birth: 1970,
          death: null,
          influence: { Modernism: 94, Design: 90, GlobalImpact: 88 },
          regions: ["Iran", "Global"],
          image: "../images/people/miladteam.jpg",
          summary:
            "Contemporary Iranian architects collaborating on futuristic structures like Milad Tower, connecting digital design with cultural geometry."
        },
        {
          name: "Leila Araghian",
          century: "21st Century",
          field: "Architect, Designer",
          birth: 1983,
          death: null,
          influence: { Design: 100, Innovation: 96, Sustainability: 94 },
          regions: ["Iran"],
          image: "../images/people/araghian.jpg",
          summary:
            "Designer of Tehran’s Tabiat Bridge, Araghian symbolizes a new generation of Iranian architects merging nature, technology, and human connection."
        }
      ]
    }
  ]
};
