const writersData = {
  category: "Writers & Modern Thinkers",
  timelineGroups: [
    {
      era: "Constitutional & Early Modern Era (19th–early 20th century)",
      description:
        "The dawn of Iranian modern literature — writers, journalists, and reformists who used prose as a tool of awakening.",
      members: [
        {
          name: "Mirza Fath Ali Akhundzadeh",
          century: "19th Century",
          field: "Playwright, Reformer, Satirist",
          birth: 1812,
          death: 1878,
          influence: { Literature: 95, Reform: 90, Satire: 94 },
          regions: ["Iran", "Caucasus"],
          image: "../images/people/akhundzadeh.jpg",
          summary:
            "Akhundzadeh is considered the father of modern Persian drama. His satirical plays and essays called for cultural reform and rationalism in Qajar Iran."
        },
        {
          name: "Mirza Aqa Khan Kermani",
          century: "19th Century",
          field: "Writer, Philosopher, Political Thinker",
          birth: 1854,
          death: 1896,
          influence: { Reform: 96, Philosophy: 90, Modernism: 88 },
          regions: ["Iran"],
          image: "../images/people/kermani.jpg",
          summary:
            "A revolutionary thinker and early secularist, Kermani criticized despotism and religious dogma, inspiring the Iranian Constitutional Revolution."
        },
        {
          name: "Talebof Tabrizi",
          century: "19th Century",
          field: "Writer, Educator",
          birth: 1834,
          death: 1911,
          influence: { Reform: 92, Education: 94, Prose: 88 },
          regions: ["Iran"],
          image: "../images/people/talebof.jpg",
          summary:
            "A pioneer in Persian educational prose, Talebof’s works emphasized enlightenment, civic responsibility, and scientific thinking."
        },
        {
          name: "Zeyn al-Abedin Maraghei",
          century: "19th–20th Century",
          field: "Writer, Reformer",
          birth: 1838,
          death: 1910,
          influence: { Reform: 92, Satire: 90, Journalism: 88 },
          regions: ["Iran"],
          image: "../images/people/maraghei.jpg",
          summary:
            "Author of 'Travel Diary of Ebrahim Beg', Maraghei criticized corruption and ignorance through fictional travelogue — a cornerstone of Iran’s reformist literature."
        }
      ]
    },
    {
      era: "Modernist Literature (1920s–1970s)",
      description:
        "The golden age of modern Persian prose — where existentialism, realism, and symbolism gave voice to a nation in transition.",
      members: [
        {
          name: "Sadegh Hedayat",
          century: "20th Century",
          field: "Writer, Translator, Modernist",
          birth: 1903,
          death: 1951,
          influence: { Literature: 100, Modernism: 96, Existentialism: 94 },
          regions: ["Iran", "France"],
          image: "../images/people/hedayat.jpg",
          summary:
            "Author of 'The Blind Owl', Hedayat pioneered psychological fiction in Persian. His existentialist prose mirrored Iran’s struggle between modernity and despair."
        },
        {
          name: "Bozorg Alavi",
          century: "20th Century",
          field: "Writer, Activist",
          birth: 1904,
          death: 1997,
          influence: { Realism: 95, Politics: 90, Literature: 92 },
          regions: ["Iran", "Germany"],
          image: "../images/people/alavi.jpg",
          summary:
            "A founder of Iran’s modern realist fiction, Alavi’s 'Her Eyes' explored love, repression, and resistance under political dictatorship."
        },
        {
          name: "Jalal Al-e Ahmad",
          century: "20th Century",
          field: "Writer, Sociologist, Thinker",
          birth: 1923,
          death: 1969,
          influence: { SocialCritique: 100, Modernism: 94, Philosophy: 92 },
          regions: ["Iran"],
          image: "../images/people/aleahmad.jpg",
          summary:
            "Al-e Ahmad’s 'Gharbzadegi' ('Westoxication') became a manifesto of cultural independence, dissecting Iran’s encounter with Western modernity."
        },
        {
          name: "Simin Daneshvar",
          century: "20th Century",
          field: "Novelist, Translator, Scholar",
          birth: 1921,
          death: 2012,
          influence: { Literature: 96, Feminism: 94, Culture: 92 },
          regions: ["Iran"],
          image: "../images/people/daneshvar.jpg",
          summary:
            "The first Iranian woman novelist, Daneshvar’s 'Savushun' combined personal tragedy with political allegory, becoming a milestone in modern Persian prose."
        },
        {
          name: "Ebrahim Golestan",
          century: "20th–21st Century",
          field: "Writer, Filmmaker",
          birth: 1922,
          death: 2023,
          influence: { Literature: 92, Cinema: 94, Modernism: 90 },
          regions: ["Iran", "UK"],
          image: "../images/people/golestan.jpg",
          summary:
            "A leading literary modernist and filmmaker, Golestan’s experimental prose and films explored alienation, moral decay, and artistic integrity."
        }
      ]
    },
    {
      era: "Contemporary Voices (1970s–Present)",
      description:
        "From post-revolutionary reflection to global literature — writers who fused Iranian identity with modern thought and universal questions.",
      members: [
        {
          name: "Ali Shariati",
          century: "20th Century",
          field: "Writer, Philosopher, Sociologist",
          birth: 1933,
          death: 1977,
          influence: { Philosophy: 96, Reform: 94, SocialJustice: 98 },
          regions: ["Iran", "Europe"],
          image: "../images/people/shariati.jpg",
          summary:
            "A thinker and writer who bridged religion and revolution, Shariati’s prose redefined Islam as a vehicle for social awakening and liberation."
        },
        {
          name: "Abdolkarim Soroush",
          century: "20th–21st Century",
          field: "Writer, Philosopher, Theologian",
          birth: 1945,
          death: null,
          influence: { Philosophy: 95, Theology: 94, Freedom: 92 },
          regions: ["Iran", "USA"],
          image: "../images/people/soroush.jpg",
          summary:
            "Soroush’s 'The Expansion of Prophetic Experience' reinterpreted religious knowledge dynamically — influencing modern Islamic thought worldwide."
        },
        {
          name: "Mahmoud Dowlatabadi",
          century: "20th–21st Century",
          field: "Novelist, Playwright",
          birth: 1940,
          death: null,
          influence: { Realism: 94, Literature: 92, Identity: 90 },
          regions: ["Iran"],
          image: "../images/people/dowlatabadi.jpg",
          summary:
            "Author of 'Kelidar', Dowlatabadi chronicled rural life and human dignity with epic realism, capturing Iran’s social complexities in postmodern form."
        },
        {
          name: "Reza Baraheni",
          century: "20th–21st Century",
          field: "Poet, Writer, Critic",
          birth: 1935,
          death: 2022,
          influence: { Poetry: 92, Criticism: 94, ExileLiterature: 90 },
          regions: ["Iran", "Canada"],
          image: "../images/people/baraheni.jpg",
          summary:
            "Baraheni’s experimental prose and activism for freedom of expression made him a symbol of resistance and intellectual exile."
        },
        {
          name: "Shahrnush Parsipur",
          century: "20th–21st Century",
          field: "Writer, Feminist, Novelist",
          birth: 1946,
          death: null,
          influence: { Feminism: 96, Literature: 92, Symbolism: 90 },
          regions: ["Iran", "USA"],
          image: "../images/people/parsipur.jpg",
          summary:
            "Author of 'Women Without Men', Parsipur used magical realism to depict female freedom and the tension between tradition and modernity."
        },
        {
          name: "Marjane Satrapi",
          century: "20th–21st Century",
          field: "Graphic Novelist, Filmmaker",
          birth: 1969,
          death: null,
          influence: { VisualArt: 94, Storytelling: 92, GlobalImpact: 96 },
          regions: ["Iran", "France"],
          image: "../images/people/satrapi.jpg",
          summary:
            "Creator of 'Persepolis', Satrapi transformed Iranian storytelling through graphic memoir, merging humor, trauma, and universal humanity."
        }
      ]
    }
  ]
};
