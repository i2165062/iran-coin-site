const scientistsData = {
  category: "Scientists & Innovators",
  timelineGroups: [
    {
      era: "Classical Scholars & Scientists (9th–15th centuries)",
      description:
        "The pioneers of Persian science and discovery — astronomers, physicians, mathematicians, and engineers whose ideas shaped global knowledge.",
      members: [
        {
          name: "Al-Khwarizmi",
          century: "9th Century",
          field: "Mathematician, Astronomer, Geographer",
          birth: 780,
          death: 850,
          influence: { Mathematics: 100, Astronomy: 92, Geography: 88 },
          regions: ["Iran", "Central Asia", "Europe"],
          image: "../images/people/khwarizmi.jpg",
          summary:
            "Known as the father of algebra, Al-Khwarizmi introduced systematic solutions of linear and quadratic equations. His works introduced the decimal positional system to the West, giving rise to the word 'algorithm'."
        },
        {
          name: "Avicenna (Ibn Sina)",
          century: "10th–11th Century",
          field: "Physician, Philosopher, Scientist",
          birth: 980,
          death: 1037,
          influence: { Medicine: 100, Philosophy: 95, Science: 94 },
          regions: ["Iran", "Europe", "Middle East"],
          image: "../images/people/avicenna.jpg",
          summary:
            "Avicenna's 'Canon of Medicine' was the medical authority in Europe for centuries. He united scientific rationalism with metaphysical inquiry, bridging philosophy and empirical science."
        },
        {
          name: "Al-Razi (Rhazes)",
          century: "9th–10th Century",
          field: "Physician, Chemist, Philosopher",
          birth: 865,
          death: 925,
          influence: { Medicine: 98, Chemistry: 96, Ethics: 88 },
          regions: ["Iran", "Middle East"],
          image: "../images/people/razi.jpg",
          summary:
            "A pioneering physician and chemist, Al-Razi distinguished smallpox from measles and advanced experimental methods in chemistry. His ethics in medicine inspired the concept of patient care."
        },
        {
          name: "Omar Khayyam",
          century: "11th–12th Century",
          field: "Mathematician, Astronomer, Poet",
          birth: 1048,
          death: 1131,
          influence: { Mathematics: 96, Astronomy: 92, Philosophy: 90 },
          regions: ["Iran", "Europe"],
          image: "../images/people/khayyam.jpg",
          summary:
            "Khayyam reformed the Persian calendar with remarkable precision and contributed to cubic equations. His poetic reflections paralleled his scientific genius."
        },
        {
          name: "Nasir al-Din Tusi",
          century: "13th Century",
          field: "Astronomer, Mathematician, Philosopher",
          birth: 1201,
          death: 1274,
          influence: { Astronomy: 98, Geometry: 94, Ethics: 90 },
          regions: ["Iran"],
          image: "../images/people/tusi.jpg",
          summary:
            "Tusi established the Maragha observatory and formulated the 'Tusi couple', a model later used by Copernicus. His writings bridged astronomy and moral philosophy."
        },
        {
          name: "Al-Biruni",
          century: "10th–11th Century",
          field: "Scientist, Geographer, Historian",
          birth: 973,
          death: 1048,
          influence: { Geography: 96, Physics: 90, Rationalism: 94 },
          regions: ["Iran", "India"],
          image: "../images/people/biruni.jpg",
          summary:
            "Biruni measured the Earth's circumference with remarkable accuracy and wrote comparative studies of cultures, anticipating anthropology and scientific method."
        },
        {
          name: "Qutb al-Din Shirazi",
          century: "13th Century",
          field: "Astronomer, Physician, Philosopher",
          birth: 1236,
          death: 1311,
          influence: { Optics: 92, Astronomy: 94, Philosophy: 90 },
          regions: ["Iran"],
          image: "../images/people/shirazi.jpg",
          summary:
            "A polymath who explained the rainbow’s formation and improved astronomical models. His synthesis of science and mysticism enriched Islamic intellectual tradition."
        }
      ]
    },
    {
      era: "Renaissance & Modern Transition (16th–19th centuries)",
      description:
        "From the Safavid scientific revival to the Qajar reforms, Iranian thinkers kept science alive amid political shifts and Western encounters.",
      members: [
        {
          name: "Mulla Sadra",
          century: "16th–17th Century",
          field: "Philosopher, Theologian, Metaphysicist",
          birth: 1571,
          death: 1640,
          influence: { Metaphysics: 98, Philosophy: 95, Science: 80 },
          regions: ["Iran"],
          image: "../images/people/mullasadra.jpg",
          summary:
            "A visionary philosopher bridging faith and reason. His transcendental theosophy influenced both spiritual and scientific thinking in Safavid Iran."
        },
        {
          name: "Hadi Sabzavari",
          century: "19th Century",
          field: "Philosopher, Logician",
          birth: 1797,
          death: 1873,
          influence: { Logic: 90, Metaphysics: 92, Education: 86 },
          regions: ["Iran"],
          image: "../images/people/sabzavari.jpg",
          summary:
            "A major figure of the Qajar era, Sabzavari revived Sadrian philosophy and logic, training generations of scholars who carried classical science into modernity."
        },
        {
          name: "Mirza Taghi Khan Farahani (Amir Kabir)",
          century: "19th Century",
          field: "Reformer, Statesman, Innovator",
          birth: 1807,
          death: 1852,
          influence: { Reform: 98, Education: 94, Technology: 88 },
          regions: ["Iran"],
          image: "../images/people/amirkabir.jpg",
          summary:
            "Founder of Dar al-Fonun, Iran’s first modern polytechnic, Amir Kabir laid the foundation for scientific education and modernization in 19th-century Persia."
        }
      ]
    },
    {
      era: "Contemporary Innovators & Scientists (20th–21st centuries)",
      description:
        "From nuclear physics to computer science, Iranian minds continue to shape global progress — blending ancient curiosity with modern discovery.",
      members: [
        {
          name: "Mohammad Abdus Salam",
          century: "20th Century",
          field: "Physicist, Nobel Laureate",
          birth: 1926,
          death: 1996,
          influence: { Physics: 100, Education: 94, Legacy: 92 },
          regions: ["Iran", "Pakistan", "Europe"],
          image: "../images/people/abdus-salam.jpg",
          summary:
            "Theoretical physicist and Nobel Laureate in Electroweak Theory, Abdus Salam championed scientific collaboration among developing nations. Of Persian heritage, his work united science and ethics."
        },
        {
          name: "Maryam Mirzakhani",
          century: "20th–21st Century",
          field: "Mathematician, Fields Medalist",
          birth: 1977,
          death: 2017,
          influence: { Mathematics: 100, Geometry: 98, Inspiration: 100 },
          regions: ["Iran", "USA"],
          image: "../images/people/mirzakhani.jpg",
          summary:
            "The first woman to win the Fields Medal, Mirzakhani’s pioneering work in Riemann surfaces and geometry inspired generations of women in science worldwide."
        },
        {
          name: "Ali Javan",
          century: "20th Century",
          field: "Physicist, Inventor",
          birth: 1926,
          death: 2016,
          influence: { Physics: 96, Innovation: 94, GlobalImpact: 92 },
          regions: ["Iran", "USA"],
          image: "../images/people/javan.jpg",
          summary:
            "Inventor of the gas laser, Ali Javan revolutionized optical physics and telecommunications, marking one of the most important inventions of the 20th century."
        },
        {
          name: "Lotfi A. Zadeh",
          century: "20th–21st Century",
          field: "Computer Scientist, Mathematician",
          birth: 1921,
          death: 2017,
          influence: { AI: 96, Logic: 100, Systems: 94 },
          regions: ["Iran", "USA"],
          image: "../images/people/zadeh.jpg",
          summary:
            "Founder of fuzzy logic and fuzzy set theory, Lotfi Zadeh revolutionized computer science and artificial intelligence, shaping modern control systems worldwide."
        },
        {
          name: "Cyrus Habib",
          century: "21st Century",
          field: "Engineer, Innovator, Technologist",
          birth: 1981,
          death: null,
          influence: { Technology: 92, Entrepreneurship: 90, Inspiration: 88 },
          regions: ["Iran", "USA"],
          image: "../images/people/habib.jpg",
          summary:
            "A representative of Iran’s modern innovators in the digital age, focusing on sustainability, green tech, and AI-driven social applications."
        }
      ]
    }
  ]
};
