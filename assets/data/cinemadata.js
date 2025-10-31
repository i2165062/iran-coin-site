const cinemaData = {
  category: "Cinema & Filmmakers",
  timelineGroups: [
    {
      era: "Pioneers of Iranian Cinema (1940s–1970s)",
      description:
        "The first generation who built Iran’s cinematic identity — from poetic realism to social storytelling before the revolution.",
      members: [
        {
          name: "Ebrahim Golestan",
          century: "20th Century",
          field: "Filmmaker, Writer, Producer",
          birth: 1922,
          death: 2023,
          influence: { Cinema: 94, Literature: 90, Legacy: 88 },
          regions: ["Iran", "UK"],
          image: "../images/people/golestan.jpg",
          summary:
            "A pioneer of poetic realism, Golestan bridged literature and cinema with works like 'Brick and Mirror', blending existential themes with social critique."
        },
        {
          name: "Forugh Farrokhzad",
          century: "20th Century",
          field: "Poet, Filmmaker",
          birth: 1934,
          death: 1967,
          influence: { Poetry: 96, Cinema: 94, Feminism: 98 },
          regions: ["Iran", "Europe"],
          image: "../images/people/forugh.jpg",
          summary:
            "The visionary poet-filmmaker whose short film 'The House is Black' redefined Iranian documentary cinema and became a symbol of artistic rebellion."
        },
        {
          name: "Masoud Kimiai",
          century: "20th Century",
          field: "Director, Screenwriter",
          birth: 1941,
          death: null,
          influence: { Cinema: 92, Culture: 90, Style: 88 },
          regions: ["Iran"],
          image: "../images/people/kimiai.jpg",
          summary:
            "A founder of Iran’s new wave cinema, Kimiai’s 'Qeysar' reshaped masculinity, revenge, and social realism on screen."
        },
        {
          name: "Bahram Beyzai",
          century: "20th–21st Century",
          field: "Director, Playwright, Scholar",
          birth: 1938,
          death: null,
          influence: { Cinema: 96, Mythology: 92, Theater: 94 },
          regions: ["Iran", "USA"],
          image: "../images/people/beyzai.jpg",
          summary:
            "Beyzai’s poetic and mythological cinema, including 'Bashu, the Little Stranger', explores identity, exile, and the power of storytelling."
        }
      ]
    },
    {
      era: "Post-Revolution Masters (1980s–2000s)",
      description:
        "The renaissance of Iranian cinema — filmmakers who turned simplicity, poetry, and humanism into universal art.",
      members: [
        {
          name: "Abbas Kiarostami",
          century: "20th–21st Century",
          field: "Director, Photographer, Poet",
          birth: 1940,
          death: 2016,
          influence: { Cinema: 100, Poetry: 96, GlobalImpact: 98 },
          regions: ["Iran", "France", "Global"],
          image: "../images/people/kiarostami.jpg",
          summary:
            "Kiarostami revolutionized world cinema with minimalist realism and profound humanism in films like 'Taste of Cherry' and 'Close-Up'."
        },
        {
          name: "Mohsen Makhmalbaf",
          century: "20th–21st Century",
          field: "Director, Writer, Producer",
          birth: 1957,
          death: null,
          influence: { Cinema: 96, Symbolism: 92, Activism: 90 },
          regions: ["Iran", "Europe"],
          image: "../images/people/makhmalbaf.jpg",
          summary:
            "Founder of the Makhmalbaf Film House, he explored freedom and illusion through visual storytelling, influencing global independent cinema."
        },
        {
          name: "Rakhshan Banietemad",
          century: "20th–21st Century",
          field: "Director, Screenwriter",
          birth: 1954,
          death: null,
          influence: { SocialCinema: 98, Feminism: 94, Realism: 92 },
          regions: ["Iran", "Europe"],
          image: "../images/people/banietemad.jpg",
          summary:
            "The 'First Lady of Iranian Cinema', Banietemad portrays women, urban struggles, and social justice with deep empathy and realism."
        },
        {
          name: "Majid Majidi",
          century: "20th–21st Century",
          field: "Director, Screenwriter",
          birth: 1959,
          death: null,
          influence: { Spirituality: 98, Humanity: 94, GlobalImpact: 92 },
          regions: ["Iran", "Asia"],
          image: "../images/people/majidi.jpg",
          summary:
            "Majidi’s deeply spiritual films like 'Children of Heaven' and 'The Color of Paradise' express universal compassion through simplicity."
        },
        {
          name: "Jafar Panahi",
          century: "20th–21st Century",
          field: "Director, Activist",
          birth: 1960,
          death: null,
          influence: { Resistance: 98, Realism: 94, Courage: 96 },
          regions: ["Iran", "Europe"],
          image: "../images/people/panahi.jpg",
          summary:
            "Known for his defiance and creativity under restriction, Panahi’s works like 'Taxi Tehran' blend cinema and resistance into pure human truth."
        }
      ]
    },
    {
      era: "Global Generation & Contemporary Voices (2000s–Present)",
      description:
        "The new generation of Iranian filmmakers — continuing poetic realism while reaching global audiences through digital platforms and festivals.",
      members: [
        {
          name: "Asghar Farhadi",
          century: "21st Century",
          field: "Director, Screenwriter",
          birth: 1972,
          death: null,
          influence: { Drama: 100, GlobalImpact: 98, Realism: 96 },
          regions: ["Iran", "Global"],
          image: "../images/people/farhadi.jpg",
          summary:
            "Two-time Oscar-winning director of 'A Separation' and 'The Salesman', Farhadi brought Iranian cinema to the heart of global storytelling with moral and social depth."
        },
        {
          name: "Mani Haghighi",
          century: "21st Century",
          field: "Director, Writer, Actor",
          birth: 1969,
          death: null,
          influence: { Innovation: 92, Satire: 90, Modernism: 88 },
          regions: ["Iran"],
          image: "../images/people/haghighi.jpg",
          summary:
            "A bold storyteller mixing absurdism and satire, Haghighi’s films challenge authority and explore the absurdity of modern life in Iran."
        },
        {
          name: "Narges Abyar",
          century: "21st Century",
          field: "Director, Writer",
          birth: 1970,
          death: null,
          influence: { Storytelling: 94, Realism: 92, Emotion: 90 },
          regions: ["Iran"],
          image: "../images/people/abyar.jpg",
          summary:
            "Known for emotionally powerful films like 'Track 143', Abyar gives voice to women and the resilience of ordinary Iranians."
        },
        {
          name: "Ali Abbasi",
          century: "21st Century",
          field: "Director, International Filmmaker",
          birth: 1981,
          death: null,
          influence: { GlobalImpact: 96, Innovation: 94, Genre: 90 },
          regions: ["Iran", "Europe"],
          image: "../images/people/aliabbasi.jpg",
          summary:
            "An Iranian-Danish filmmaker whose works like 'Border' and 'Holy Spider' explore dark realism and identity in global cinema."
        },
        {
          name: "Saeed Roustaee",
          century: "21st Century",
          field: "Director, Screenwriter",
          birth: 1989,
          death: null,
          influence: { Realism: 94, SocialCritique: 92, Innovation: 90 },
          regions: ["Iran", "France"],
          image: "../images/people/roustaee.jpg",
          summary:
            "Director of 'Just 6.5' and 'Leila’s Brothers', Roustaee represents a new generation of Iranian filmmakers blending realism and urgency."
        }
      ]
    }
  ]
};
