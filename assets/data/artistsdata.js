const artistsData = {
  category: "Artists & Painters",
  timelineGroups: [
    {
      era: "Traditional & Classical Art (12th–19th centuries)",
      description:
        "The era of Persian miniature, calligraphy, and architectural decoration — where art blended poetry, spirituality, and geometry.",
      members: [
        {
          name: "Behzad Heravi",
          century: "15th–16th Century",
          field: "Miniaturist, Illustrator",
          birth: 1450,
          death: 1535,
          influence: { Miniature: 100, Design: 96, Legacy: 94 },
          regions: ["Iran", "Central Asia"],
          image: "../images/people/behzad.jpg",
          summary:
            "Kamal al-Din Behzad, master of Persian miniature painting, elevated manuscript art into emotional storytelling. His works defined the aesthetic of the Herat and Safavid schools."
        },
        {
          name: "Reza Abbasi",
          century: "16th–17th Century",
          field: "Painter, Calligrapher",
          birth: 1565,
          death: 1635,
          influence: { Painting: 96, Portraiture: 92, Calligraphy: 90 },
          regions: ["Iran"],
          image: "../images/people/reza-abbasi.jpg",
          summary:
            "The leading painter of the Safavid era, Reza Abbasi revolutionized Persian art with delicate linework and human intimacy, moving beyond court formality into personal expression."
        },
        {
          name: "Ali Qoli Jabbadar",
          century: "17th–18th Century",
          field: "Painter, Illustrator",
          birth: 1650,
          death: 1720,
          influence: { Painting: 92, Perspective: 90, CrossCultural: 88 },
          regions: ["Iran", "India"],
          image: "../images/people/aliqoli.jpg",
          summary:
            "A Safavid painter who combined European and Persian elements, Jabbadar was among the first Iranian artists to explore perspective and secular subjects."
        },
        {
          name: "Mirza Agha Emami",
          century: "19th Century",
          field: "Calligrapher, Decorative Artist",
          birth: 1810,
          death: 1893,
          influence: { Calligraphy: 95, Ornamentation: 90, Teaching: 88 },
          regions: ["Iran"],
          image: "../images/people/emami.jpg",
          summary:
            "A master of Nastaliq calligraphy and decorative art, Emami preserved Persian aesthetics during the turbulent Qajar era, influencing generations of artisans."
        }
      ]
    },
    {
      era: "Modern Pioneers (20th century)",
      description:
        "Artists who bridged Iranian tradition with modernism — painters, sculptors, and calligraphers who redefined visual culture.",
      members: [
        {
          name: "Sohrab Sepehri",
          century: "20th Century",
          field: "Painter, Poet",
          birth: 1928,
          death: 1980,
          influence: { Painting: 94, Poetry: 92, Spirituality: 90 },
          regions: ["Iran", "Asia"],
          image: "../images/people/sepehri.jpg",
          summary:
            "Known both as a poet and painter, Sepehri infused his minimalist landscapes with Zen-like serenity, blending Eastern mysticism and modern abstraction."
        },
        {
          name: "Mohammad Ehsai",
          century: "20th–21st Century",
          field: "Painter, Calligrapher",
          birth: 1939,
          death: null,
          influence: { Calligraphy: 98, Modernism: 90, Typography: 92 },
          regions: ["Iran", "Europe"],
          image: "../images/people/ehsai.jpg",
          summary:
            "A pioneer of calligraphic modernism, Mohammad Ehsai transformed Persian script into visual abstraction — uniting word, color, and motion in contemporary art."
        },
        {
          name: "Parviz Tanavoli",
          century: "20th–21st Century",
          field: "Sculptor, Conceptual Artist",
          birth: 1937,
          death: null,
          influence: { Sculpture: 100, Innovation: 94, Identity: 92 },
          regions: ["Iran", "USA"],
          image: "../images/people/tanavoli.jpg",
          summary:
            "Founder of the Saqqakhaneh movement, Tanavoli’s sculptures and 'Heech' series merge Iranian spiritual symbols with modernist minimalism."
        },
        {
          name: "Iran Darroudi",
          century: "20th–21st Century",
          field: "Painter, Writer",
          birth: 1936,
          death: 2021,
          influence: { Surrealism: 95, Symbolism: 90, Modernism: 92 },
          regions: ["Iran", "France"],
          image: "../images/people/darroudi.jpg",
          summary:
            "A surrealist painter of ethereal light, Darroudi’s cosmic imagery reflected nostalgia, exile, and timeless beauty — a dialogue between memory and dream."
        },
        {
          name: "Mansour Ghandriz",
          century: "20th Century",
          field: "Painter, Modernist",
          birth: 1935,
          death: 1965,
          influence: { Modernism: 92, Expression: 90, Symbolism: 88 },
          regions: ["Iran"],
          image: "../images/people/ghandriz.jpg",
          summary:
            "A co-founder of the Ghandriz Gallery, Mansour blended Persian motifs with Western abstraction, shaping Tehran’s modern art scene before his untimely death."
        },
        {
          name: "Houshang Pezeshknia",
          century: "20th Century",
          field: "Painter, Modernist",
          birth: 1917,
          death: 1972,
          influence: { Portraiture: 92, Modernism: 90, SocialRealism: 88 },
          regions: ["Iran"],
          image: "../images/people/pezeshknia.jpg",
          summary:
            "One of Iran’s early modernists, Pezeshknia captured realism and psychological depth in his portraits, bridging European training with Persian emotion."
        }
      ]
    },
    {
      era: "Contemporary Visionaries (Late 20th–21st century)",
      description:
        "Iranian artists shaping the global stage — blending heritage with innovation, addressing identity, exile, and new media.",
      members: [
        {
          name: "Shirin Neshat",
          century: "20th–21st Century",
          field: "Visual Artist, Filmmaker",
          birth: 1957,
          death: null,
          influence: { Photography: 100, Feminism: 96, GlobalImpact: 94 },
          regions: ["Iran", "USA", "Europe"],
          image: "../images/people/neshat.jpg",
          summary:
            "Shirin Neshat explores gender, exile, and identity through photography and film. Her powerful black-and-white portraits give voice to silenced women."
        },
        {
          name: "Monir Shahroudy Farmanfarmaian",
          century: "20th–21st Century",
          field: "Artist, Designer",
          birth: 1922,
          death: 2019,
          influence: { Geometry: 96, Design: 92, Innovation: 90 },
          regions: ["Iran", "USA"],
          image: "../images/people/monir.jpg",
          summary:
            "Monir Farmanfarmaian’s mirrored mosaics and geometric abstractions revived the essence of Iranian sacred geometry within contemporary sculpture and design."
        },
        {
          name: "Aydin Aghdashloo",
          century: "20th–21st Century",
          field: "Painter, Art Critic",
          birth: 1940,
          death: null,
          influence: { Painting: 96, Restoration: 92, Legacy: 90 },
          regions: ["Iran", "Europe"],
          image: "../images/people/aghdashloo.jpg",
          summary:
            "Aghdashloo’s detailed paintings blend nostalgia and decay. As both creator and critic, he bridges Persian classicism with postmodern reflection."
        },
        {
          name: "Y.Z. Kami",
          century: "20th–21st Century",
          field: "Painter, Conceptual Artist",
          birth: 1956,
          death: null,
          influence: { Painting: 94, Spirituality: 92, GlobalReach: 90 },
          regions: ["Iran", "USA"],
          image: "../images/people/yzkami.jpg",
          summary:
            "Y.Z. Kami’s large-scale portraits radiate introspection and stillness, evoking universal spirituality rooted in Persian culture."
        }
      ]
    }
  ]
};
