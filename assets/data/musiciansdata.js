const musiciansData = {
  category: "Musicians & Composers",
  timelineGroups: [
    {
      era: "Ancient & Classical Heritage (Sassanid–15th Century)",
      description:
        "The origins of Persian music — court composers, theorists, and masters whose melodies shaped the foundations of musical science in the East.",
      members: [
        {
          name: "Barbad (Barbad Marvazi)",
          century: "6th–7th Century",
          field: "Composer, Musician",
          birth: 580,
          death: 628,
          influence: { Composition: 100, Innovation: 94, Legacy: 96 },
          regions: ["Iran", "Mesopotamia"],
          image: "../images/people/barbad.jpg",
          summary:
            "The legendary court musician of Khosrow II, Barbad created the 7 royal modes and 30 melodies of Persian music, forming the theoretical foundation of Middle Eastern tonal systems."
        },
        {
          name: "Ziryab",
          century: "8th–9th Century",
          field: "Musician, Innovator",
          birth: 789,
          death: 857,
          influence: { MusicTheory: 95, CrossCulture: 98, Legacy: 90 },
          regions: ["Iran", "Spain", "North Africa"],
          image: "../images/people/ziryab.jpg",
          summary:
            "A Persian polymath and musician who migrated to Andalusia, Ziryab introduced new instruments, musical scales, and cultural innovations to Islamic Spain."
        },
        {
          name: "Safiy al-Din al-Urmawi",
          century: "13th Century",
          field: "Composer, Music Theorist",
          birth: 1216,
          death: 1294,
          influence: { Theory: 98, Notation: 92, Harmony: 90 },
          regions: ["Iran", "Iraq"],
          image: "../images/people/urmawi.jpg",
          summary:
            "Urmawi formalized the 17-tone scale and developed systematic notation in Persian-Arabic music, influencing Ottoman and Central Asian traditions."
        },
        {
          name: "Abd al-Qadir Maraghi",
          century: "14th–15th Century",
          field: "Composer, Theorist, Musician",
          birth: 1353,
          death: 1435,
          influence: { Composition: 98, MusicTheory: 96, Legacy: 94 },
          regions: ["Iran", "Central Asia"],
          image: "../images/people/maraghi.jpg",
          summary:
            "Maraghi, the last great theoretician of medieval Persian music, documented scales, rhythms, and modes that bridged ancient and modern theory."
        }
      ]
    },
    {
      era: "Renaissance to Modern Revival (19th–20th centuries)",
      description:
        "The rebirth of Persian music through Qajar courts, early recordings, and national revival movements that redefined classical and folk traditions.",
      members: [
        {
          name: "Abolhasan Saba",
          century: "20th Century",
          field: "Composer, Violinist, Educator",
          birth: 1902,
          death: 1957,
          influence: { Composition: 95, Teaching: 96, Tradition: 90 },
          regions: ["Iran"],
          image: "../images/people/saba.jpg",
          summary:
            "Abolhasan Saba codified Persian traditional music (Radif) for violin and set a standard for modern Iranian pedagogy in music."
        },
        {
          name: "Gholamhossein Banan",
          century: "20th Century",
          field: "Vocalist, Composer",
          birth: 1911,
          death: 1986,
          influence: { Vocal: 96, Emotion: 94, Legacy: 92 },
          regions: ["Iran"],
          image: "../images/people/banan.jpg",
          summary:
            "A golden voice of Iran, Banan’s unique phrasing and tone shaped Iranian classical singing, blending dignity with deep feeling."
        },
        {
          name: "Ruhollah Khaleqi",
          century: "20th Century",
          field: "Composer, Musicologist, Conductor",
          birth: 1906,
          death: 1965,
          influence: { Composition: 98, NationalMusic: 95, Education: 94 },
          regions: ["Iran"],
          image: "../images/people/khaleqi.jpg",
          summary:
            "Founder of the National Music School and composer of 'Ey Iran', Khaleqi modernized Iranian orchestration while preserving classical identity."
        },
        {
          name: "Ahmad Ebadi",
          century: "20th Century",
          field: "Setar Player, Composer",
          birth: 1906,
          death: 1993,
          influence: { Instrumentation: 94, Tradition: 92, Legacy: 90 },
          regions: ["Iran"],
          image: "../images/people/ebadi.jpg",
          summary:
            "Son of Mirza Abdollah, master of Setar; Ebadi’s delicate touch and improvisations embodied the soul of Persian Radif."
        }
      ]
    },
    {
      era: "Contemporary Masters (20th–21st centuries)",
      description:
        "The modern guardians of Iranian music — voices, composers, and instrumentalists who brought Persian art to the global stage.",
      members: [
        {
          name: "Mohammad-Reza Shajarian",
          century: "20th–21st Century",
          field: "Vocalist, Composer, Master of Persian Music",
          birth: 1940,
          death: 2020,
          influence: { Vocal: 100, Legacy: 98, Emotion: 96 },
          regions: ["Iran", "Europe", "USA"],
          image: "../images/people/shajarian.jpg",
          summary:
            "The most celebrated Persian vocalist of modern times, Shajarian’s powerful yet spiritual voice carried the legacy of classical music into the contemporary era."
        },
        {
          name: "Hossein Alizadeh",
          century: "20th–21st Century",
          field: "Composer, Tar & Setar Player",
          birth: 1951,
          death: null,
          influence: { Composition: 98, Instrumentation: 96, Innovation: 92 },
          regions: ["Iran", "Europe"],
          image: "../images/people/alizadeh.jpg",
          summary:
            "A leading composer and tar virtuoso, Alizadeh bridged folk and classical traditions, creating new Radif interpretations and collaborations worldwide."
        },
        {
          name: "Kayhan Kalhor",
          century: "20th–21st Century",
          field: "Composer, Kamancheh Player",
          birth: 1963,
          death: null,
          influence: { Fusion: 98, Innovation: 96, Legacy: 90 },
          regions: ["Iran", "Europe", "USA"],
          image: "../images/people/kalhor.jpg",
          summary:
            "A master of the kamancheh and Grammy-winning composer, Kalhor’s collaborations brought Persian music to international audiences, blending East and West."
        },
        {
          name: "Shahram Nazeri",
          century: "20th–21st Century",
          field: "Vocalist, Composer",
          birth: 1950,
          death: null,
          influence: { Vocal: 96, Mysticism: 94, Performance: 92 },
          regions: ["Iran", "Turkey", "Europe"],
          image: "../images/people/nazeri.jpg",
          summary:
            "Known as 'The Iranian Pavarotti', Nazeri merged Rumi’s poetry with Sufi music, pioneering spiritual fusion across generations."
        },
        {
          name: "Homayoun Shajarian",
          century: "20th–21st Century",
          field: "Vocalist, Musician",
          birth: 1975,
          death: null,
          influence: { Vocal: 94, Innovation: 90, GlobalReach: 88 },
          regions: ["Iran", "Europe"],
          image: "../images/people/homayoun.jpg",
          summary:
            "Son of Mohammad-Reza Shajarian, Homayoun continues the family’s vocal legacy with innovative cross-genre collaborations and international performances."
        },
        {
          name: "Majid Derakhshani",
          century: "20th–21st Century",
          field: "Composer, Tar Player",
          birth: 1957,
          death: null,
          influence: { Composition: 92, Tradition: 94, Teaching: 90 },
          regions: ["Iran", "Germany"],
          image: "../images/people/derakhshani.jpg",
          summary:
            "A composer and tar master, Derakhshani’s works connect Persian classical music with contemporary orchestration and pedagogy in Europe."
        }
      ]
    }
  ]
};
