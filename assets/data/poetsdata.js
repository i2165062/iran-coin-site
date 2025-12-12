const poetsData = {
  category: "Poets & Philosophers",
  timelineGroups: [
    {
      era: "Classical Persian Poetry (9th–15th centuries)",
      description:
        "The golden era of Persian literature — from the dawn of Persian verse to the heights of mystical poetry and human wisdom.",
      members: [
        {
          name: "Rudaki",
          century: "9th–10th Century",
          field: "Poet, Musician",
          birth: 858,
          death: 941,
          influence: { Poetry: 95, Innovation: 88, Language: 90 },
          regions: ["Iran", "Central Asia"],
          image: "../images/poets/rudaki.png",
          summary:
            "Rudaki, the father of Persian poetry, was among the first to write in New Persian. His melodies and verses shaped the foundation of Persian lyrical tradition and court poetry."
        },
        {
          name: "Ferdowsi",
          century: "10th–11th Century",
          field: "Epic Poet",
          birth: 940,
          death: 1020,
          influence: { Epic: 100, Language: 98, Identity: 96 },
          regions: ["Iran"],
          image: "../images/poets/ferdowsi.png",
          summary:
            "Author of the Shahnameh, Ferdowsi revived the Persian language and identity after centuries of Arab domination. His poetic epic defined the national consciousness of Iran."
        },
        {
          name: "Omar Khayyam",
          century: "11th–12th Century",
          field: "Poet, Philosopher, Mathematician",
          birth: 1048,
          death: 1131,
          influence: { Philosophy: 92, Mathematics: 95, Poetry: 94 },
          regions: ["Iran", "Europe"],
          image: "../images/poets/khayyam.jpg",
          summary:
            "Khayyam was a polymath whose quatrains questioned fate, faith, and mortality. His Rubaiyat became world-famous for its skeptical yet deeply human voice."
        },
        {
          name: "Nezami Ganjavi",
          century: "12th Century",
          field: "Poet, Storyteller",
          birth: 1141,
          death: 1209,
          influence: { Romance: 96, Narrative: 92, Legacy: 94 },
          regions: ["Iran", "Caucasus"],
          image: "../images/people/nezami.jpg",
          summary:
            "Nezami, master of romantic epics like 'Khosrow and Shirin', blended myth, history, and moral philosophy with exquisite poetic form, inspiring Persian and world literature."
        },
        {
          name: "Attar of Nishapur",
          century: "12th–13th Century",
          field: "Mystic, Poet",
          birth: 1145,
          death: 1221,
          influence: { Mysticism: 98, Poetry: 94, Philosophy: 90 },
          regions: ["Iran"],
          image: "../images/people/attar.jpg",
          summary:
            "Farid al-Din Attar’s 'Conference of the Birds' is a parable of the soul’s journey toward divine truth — a cornerstone of Persian mystical thought and poetry."
        },
        {
          name: "Rumi",
          century: "13th Century",
          field: "Poet, Mystic, Philosopher",
          birth: 1207,
          death: 1273,
          influence: { Mysticism: 100, Philosophy: 95, Poetry: 98 },
          regions: ["Iran", "Turkey", "Europe"],
          image: "../images/people/rumi.jpg",
          summary:
            "Jalal al-Din Rumi, known as the poet of love, expressed the divine unity of existence through ecstatic verse. His Masnavi is revered worldwide for its spiritual insight."
        },
        {
          name: "Saadi Shirazi",
          century: "13th Century",
          field: "Poet, Philosopher",
          birth: 1210,
          death: 1291,
          influence: { Ethics: 96, Storytelling: 94, Language: 90 },
          regions: ["Iran", "Middle East"],
          image: "../images/people/saadi.jpg",
          summary:
            "Author of 'Gulistan' and 'Bustan', Saadi united wisdom with wit. His prose and verse, emphasizing morality and tolerance, remain proverbial in Persian and world culture."
        },
        {
          name: "Hafez Shirazi",
          century: "14th Century",
          field: "Poet, Mystic",
          birth: 1325,
          death: 1390,
          influence: { Poetry: 100, Mysticism: 96, Language: 95 },
          regions: ["Iran", "Europe", "India"],
          image: "../images/people/hafez.jpg",
          summary:
            "Hafez is the unrivaled master of Persian ghazal. His verse embodies divine love, irony, and existential joy — interpreted across centuries by mystics and philosophers alike."
        },
        {
          name: "Jami",
          century: "15th Century",
          field: "Poet, Theologian, Philosopher",
          birth: 1414,
          death: 1492,
          influence: { Mysticism: 94, Scholarship: 90, Language: 88 },
          regions: ["Iran", "Central Asia"],
          image: "../images/people/jami.jpg",
          summary:
            "Jami was the last great classical poet of Persia and a scholar of Sufism. His works bridge mystical devotion with intellectual grace, admired from Herat to Istanbul."
        },
        {
          name: "Mohammad-Hossein Shahriar",
          century: "20th Century",
          field: "Poet, Lyricist",
          birth: 1906,
          death: 1988,
          influence: { Poetry: 95, Culture: 90, Identity: 88 },
          regions: ["Iran", "Azerbaijan"],
          image: "../images/people/shahriar.jpg",
          summary:
            "Shahriar, bilingual poet of Persian and Azeri verse, wrote 'Heydar Baba Salam' and revived lyrical poetry in modern Iran — bridging regional and national identity."
        }
      ]
    },
    {
      era: "Philosophers & Scholars (10th–18th centuries)",
      description:
        "Thinkers who shaped Islamic philosophy, science, and metaphysics, from Avicenna’s rationalism to Mulla Sadra’s transcendental wisdom.",
      members: [
        {
          name: "Avicenna (Ibn Sina)",
          century: "10th–11th Century",
          field: "Philosopher, Physician",
          birth: 980,
          death: 1037,
          influence: { Philosophy: 100, Science: 98, Medicine: 96 },
          regions: ["Iran", "Europe"],
          image: "../images/people/avicenna.jpg",
          summary:
            "Avicenna was a polymath who systematized Greek and Islamic philosophy. His 'Canon of Medicine' and 'Book of Healing' influenced both Eastern and Western thought for centuries."
        },
        {
          name: "Al-Farabi",
          century: "9th–10th Century",
          field: "Philosopher, Music Theorist",
          birth: 872,
          death: 950,
          influence: { Philosophy: 95, Logic: 90, ArtTheory: 88 },
          regions: ["Iran", "Central Asia"],
          image: "../images/people/farabi.jpg",
          summary:
            "Known as the 'Second Teacher' after Aristotle, Farabi developed theories on logic, ethics, and the ideal society, blending Greek reason with Persian metaphysics."
        },
        {
          name: "Suhrawardi",
          century: "12th Century",
          field: "Philosopher, Mystic",
          birth: 1154,
          death: 1191,
          influence: { Philosophy: 95, Mysticism: 94, Influence: 90 },
          regions: ["Iran", "Middle East"],
          image: "../images/people/suhrawardi.jpg",
          summary:
            "Founder of the 'Illuminationist' school (Hikmat al-Ishraq), Suhrawardi united Persian symbolism with Greek metaphysics, inspiring Islamic and Western mysticism alike."
        },
        {
          name: "Mulla Sadra",
          century: "16th–17th Century",
          field: "Philosopher, Theologian",
          birth: 1571,
          death: 1640,
          influence: { Philosophy: 100, Metaphysics: 96, Theology: 90 },
          regions: ["Iran"],
          image: "../images/people/mullasadra.jpg",
          summary:
            "Mulla Sadra’s 'Transcendent Theosophy' (Hikmat al-Muta’aliya) revolutionized Islamic philosophy, blending reason, revelation, and mysticism in a unified metaphysical system."
        },
        {
          name: "Nasir al-Din Tusi",
          century: "13th Century",
          field: "Philosopher, Mathematician, Astronomer",
          birth: 1201,
          death: 1274,
          influence: { Science: 95, Philosophy: 92, Ethics: 90 },
          regions: ["Iran"],
          image: "../images/people/tusi.jpg",
          summary:
            "A polymath who wrote on ethics, logic, and astronomy; Tusi founded the Maragha observatory and advanced planetary models later used by Copernicus."
        },
        {
          name: "Biruni",
          century: "10th–11th Century",
          field: "Scientist, Philosopher, Historian",
          birth: 973,
          death: 1048,
          influence: { Science: 98, Geography: 95, Rationalism: 92 },
          regions: ["Iran", "India"],
          image: "../images/people/biruni.jpg",
          summary:
            "Abu Rayhan al-Biruni combined science and philosophy, calculating Earth's circumference, studying cultures, and advocating for objective inquiry."
        }
      ]
    },
    {
      era: "Modern Poets & Thinkers (19th–20th centuries)",
      description:
        "The modern voice of Iran — reformists, modernists, and poets who bridged tradition with revolution, philosophy with humanity.",
      members: [
        {
          name: "Mohammad-Taqi Bahar",
          century: "19th–20th Century",
          field: "Poet, Historian, Politician",
          birth: 1886,
          death: 1951,
          influence: { Poetry: 92, Reform: 90, Scholarship: 88 },
          regions: ["Iran"],
          image: "../images/people/bahar.jpg",
          summary:
            "Known as 'Malek o-Shoara', Bahar revived classical prosody for modern themes. A poet and statesman, he balanced tradition and reform."
        },
        {
          name: "Nima Yooshij",
          century: "20th Century",
          field: "Poet, Modernist",
          birth: 1897,
          death: 1960,
          influence: { Innovation: 98, Poetry: 96, Modernism: 95 },
          regions: ["Iran"],
          image: "../images/people/nima.jpg",
          summary:
            "Nima introduced free verse to Persian poetry, breaking classical meters and redefining poetic vision — the father of Iran’s modern verse movement."
        },
        {
          name: "Ahmad Shamlou",
          century: "20th Century",
          field: "Poet, Translator",
          birth: 1925,
          death: 2000,
          influence: { Poetry: 98, Humanism: 94, Freedom: 96 },
          regions: ["Iran", "Europe"],
          image: "../images/people/shamlou.jpg",
          summary:
            "Ahmad Shamlou’s free verse poetry fused myth, politics, and humanism. His works embody the voice of modern Iranian conscience."
        },
        {
          name: "Forugh Farrokhzad",
          century: "20th Century",
          field: "Poet, Filmmaker",
          birth: 1934,
          death: 1967,
          influence: { Feminism: 100, Modernism: 92, Cinema: 88 },
          regions: ["Iran", "Europe"],
          image: "../images/people/forugh.jpg",
          summary:
            "A revolutionary female poet and filmmaker, Forugh gave voice to emotion, sensuality, and rebellion in post-war Iran."
        },
        {
          name: "Sohrab Sepehri",
          century: "20th Century",
          field: "Poet, Painter",
          birth: 1928,
          death: 1980,
          influence: { Mysticism: 92, Nature: 94, Simplicity: 90 },
          regions: ["Iran", "Asia"],
          image: "../images/people/sepehri.jpg",
          summary:
            "A poet-painter whose serene verses merge Eastern mysticism with modern minimalism — turning simplicity into transcendence."
        },
        {
          name: "Ali Shariati",
          century: "20th Century",
          field: "Philosopher, Sociologist",
          birth: 1933,
          death: 1977,
          influence: { Philosophy: 96, Reform: 95, Influence: 98 },
          regions: ["Iran", "Europe"],
          image: "../images/people/shariati.jpg",
          summary:
            "Dr. Shariati redefined religion as a force for social justice. His lectures inspired Iran’s intellectual awakening and modern reformist thought."
        }
      ]
    }
  ]
};
