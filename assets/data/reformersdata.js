const reformersData = {
  category: "Modern Icons & Reformers",
  timelineGroups: [
    {
      era: "Early Modern Reformers (19th–Early 20th century)",
      description:
        "Visionaries who laid the intellectual and social foundations of reform — from Qajar modernization to the dawn of constitutionalism.",
      members: [
        {
          name: "Mirza Taghi Khan Amir Kabir",
          century: "19th Century",
          field: "Reformer, Prime Minister",
          birth: 1807,
          death: 1852,
          influence: { Reform: 100, Education: 98, Modernization: 94 },
          regions: ["Iran"],
          image: "../images/people/amirkabir.jpg",
          summary:
            "Amir Kabir founded the Dar al-Fonun, Iran’s first modern school, introduced state reforms, and fought corruption — becoming a martyr of Iranian modernity."
        },
        {
          name: "Mirza Malkom Khan Nazem al-Doleh",
          century: "19th Century",
          field: "Reformer, Diplomat, Journalist",
          birth: 1833,
          death: 1908,
          influence: { Politics: 92, Reform: 90, Journalism: 88 },
          regions: ["Iran", "Europe"],
          image: "../images/people/malkom.jpg",
          summary:
            "Malkom Khan promoted constitutional ideas and founded 'Qanun', the first Persian reformist newspaper in exile — influencing Iran’s 1906 revolution."
        },
        {
          name: "Mirza Jahangir Khan Shirazi",
          century: "19th–20th Century",
          field: "Journalist, Revolutionary",
          birth: 1875,
          death: 1908,
          influence: { Freedom: 94, Journalism: 92, Sacrifice: 90 },
          regions: ["Iran"],
          image: "../images/people/jahangir.jpg",
          summary:
            "Founder of 'Sur-e Esrafil', Jahangir Khan’s fearless journalism and defense of liberty made him a martyr of Iran’s Constitutional Revolution."
        },
        {
          name: "Teymourtash (Abdolhossein Teymourtash)",
          century: "20th Century",
          field: "Politician, Reformer, Modernizer",
          birth: 1883,
          death: 1933,
          influence: { Diplomacy: 94, Reform: 90, Modernization: 92 },
          regions: ["Iran", "Europe"],
          image: "../images/people/teymourtash.jpg",
          summary:
            "Minister and strategist under Reza Shah, Teymourtash was pivotal in shaping Iran’s foreign policy and early industrial modernization before his tragic downfall."
        }
      ]
    },
    {
      era: "Revolutionary Thinkers & Social Reformers (1940s–1980s)",
      description:
        "Philosophers, clerics, and activists who combined intellect, religion, and revolution to reform Iran’s identity in the modern world.",
      members: [
        {
          name: "Ali Shariati",
          century: "20th Century",
          field: "Philosopher, Sociologist, Reformer",
          birth: 1933,
          death: 1977,
          influence: { Philosophy: 98, SocialJustice: 96, Reform: 100 },
          regions: ["Iran", "Europe"],
          image: "../images/people/shariati.jpg",
          summary:
            "A revolutionary intellectual who redefined Islam as a liberating ideology, Shariati inspired generations toward justice, identity, and spiritual freedom."
        },
        {
          name: "Ayatollah Mahmoud Taleghani",
          century: "20th Century",
          field: "Cleric, Social Reformer, Revolutionary",
          birth: 1911,
          death: 1979,
          influence: { Justice: 96, Reform: 92, Religion: 90 },
          regions: ["Iran"],
          image: "../images/people/taleghani.jpg",
          summary:
            "A progressive cleric and advocate of freedom, Taleghani bridged Islam and democracy — his sermons emphasized human rights and unity."
        },
        {
          name: "Mehdi Bazargan",
          century: "20th Century",
          field: "Engineer, Politician, Prime Minister",
          birth: 1907,
          death: 1995,
          influence: { Reform: 94, Modernization: 90, Morality: 92 },
          regions: ["Iran", "France"],
          image: "../images/people/bazargan.jpg",
          summary:
            "Founder of the Freedom Movement and Iran’s first post-revolution prime minister, Bazargan symbolized integrity, science, and moral politics."
        },
        {
          name: "Ali Akbar Dehkhoda",
          century: "20th Century",
          field: "Lexicographer, Satirist, Thinker",
          birth: 1879,
          death: 1956,
          influence: { Language: 96, Reform: 90, Education: 92 },
          regions: ["Iran"],
          image: "../images/people/dehkhoda.jpg",
          summary:
            "Creator of the monumental Persian dictionary, Dehkhoda preserved Iran’s linguistic heritage and used satire to critique social injustice."
        },
        {
          name: "Mostafa Chamran",
          century: "20th Century",
          field: "Scientist, Politician, Freedom Fighter",
          birth: 1932,
          death: 1981,
          influence: { Science: 90, Leadership: 92, Spirituality: 88 },
          regions: ["Iran", "Lebanon", "USA"],
          image: "../images/people/chamran.jpg",
          summary:
            "Physicist and defense minister, Chamran merged spirituality, science, and patriotism — a modern symbol of sacrifice and intellect."
        }
      ]
    },
    {
      era: "Contemporary Reform & Cultural Influence (1990s–Present)",
      description:
        "Writers, activists, and intellectuals leading Iran’s reformist and cultural renewal movements in the 21st century.",
      members: [
        {
          name: "Abdolkarim Soroush",
          century: "20th–21st Century",
          field: "Philosopher, Theologian, Reformer",
          birth: 1945,
          death: null,
          influence: { Thought: 100, Freedom: 95, Reform: 94 },
          regions: ["Iran", "USA", "Europe"],
          image: "../images/people/soroush.jpg",
          summary:
            "The leading intellectual of Iran’s reformist era, Soroush’s dynamic theology inspired the discourse of democracy, pluralism, and human dignity."
        },
        {
          name: "Mohammad Khatami",
          century: "20th–21st Century",
          field: "President, Reformer, Philosopher",
          birth: 1943,
          death: null,
          influence: { Dialogue: 98, Democracy: 94, Culture: 96 },
          regions: ["Iran", "Global"],
          image: "../images/people/khatami.jpg",
          summary:
            "Iran’s reformist president (1997–2005), Khatami’s 'Dialogue Among Civilizations' reshaped global perception of Iranian culture and peace."
        },
        {
          name: "Shirin Ebadi",
          century: "20th–21st Century",
          field: "Lawyer, Human Rights Activist, Nobel Laureate",
          birth: 1947,
          death: null,
          influence: { Justice: 100, HumanRights: 98, GlobalImpact: 96 },
          regions: ["Iran", "Europe"],
          image: "../images/people/ebadi.jpg",
          summary:
            "First Iranian Nobel Peace Prize laureate, Ebadi’s advocacy for human rights, women, and children turned her into a global icon of justice."
        },
        {
          name: "Nasrin Sotoudeh",
          century: "21st Century",
          field: "Lawyer, Activist",
          birth: 1963,
          death: null,
          influence: { Justice: 96, Courage: 98, Rights: 92 },
          regions: ["Iran"],
          image: "../images/people/sotoudeh.jpg",
          summary:
            "A fearless lawyer defending freedom of expression and women’s rights, Sotoudeh embodies moral courage and civil resistance."
        },
        {
          name: "Masih Alinejad",
          century: "21st Century",
          field: "Journalist, Activist",
          birth: 1976,
          death: null,
          influence: { Activism: 96, Media: 94, GlobalImpact: 92 },
          regions: ["Iran", "USA"],
          image: "../images/people/alinejad.jpg",
          summary:
            "Journalist and women’s rights advocate, Alinejad’s online campaigns and activism brought Iranian voices of freedom to international attention."
        }
      ]
    }
  ]
};
