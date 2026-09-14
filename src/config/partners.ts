export interface PartnerOrSponsor {
  id: string;
  name: string;
  shortName: string;
  type: "partner" | "sponsor";
  category: string;
  roleTitle: string;
  logoUrl: string;
  tagline?: string;
  description: string;
  deepExplanation: string;
  strategicImpact: string[];
  keyStats?: { label: string; value: string }[];
  establishedYear?: string;
  website?: string;
  badgeColor: "orange" | "blue" | "yellow";
}

export const partnersAndSponsors: PartnerOrSponsor[] = [
  // -------------------------------------------------------------
  // PARTNERS (5)
  // -------------------------------------------------------------
  {
    id: "blk",
    name: "Basketball League Kerala",
    shortName: "BLK",
    type: "partner",
    category: "Official League",
    roleTitle: "Apex Franchise League & Tournament Platform",
    logoUrl: "/images/sponsers/BLK.png",
    tagline: "The Future of Kerala Basketball",
    description:
      "The premier franchise-based youth basketball competition in Kerala, revolutionizing grassroots basketball through professional talent identification and structured seasonal leagues.",
    deepExplanation:
      "The Basketball League Kerala (BLK) represents a transformative milestone for basketball in the state. Designed to bridge the gap between amateur school basketball and elite professional competition, the BLK operates a multi-tier tournament calendar featuring six city-based franchises: Trivandrum Capitals, Kochi Stallions, Thrissur Tuskers, Kottayam Bisons, Alappuzha Dolphins, and Calicut Warriors. BLK provides modern game officiating, computerized scorekeeping, digital player drafts, and live streaming to give young athletes pro-grade exposure.",
    strategicImpact: [
      "Official governing league under which the BLK Buddies Tournament is organized.",
      "Direct pathway for U10, U12, U14, and U19 players into franchise rosters.",
      "High-performance camps with professional coaches and analytics-driven scouting.",
      "State-wide media distribution showcasing Trivandrum youth basketball talent."
    ],
    keyStats: [
      { label: "Franchises", value: "6 Cities" },
      { label: "Focus", value: "Youth & Pro" },
      { label: "Format", value: "Franchise League" }
    ],
    establishedYear: "2026",
    badgeColor: "orange"
  },
  {
    id: "starting-five",
    name: "Starting Five Sports Management",
    shortName: "Starting Five",
    type: "partner",
    category: "Sports Management",
    roleTitle: "Strategic Management & League Promoters",
    logoUrl: "/images/sponsers/Starting Five.png",
    tagline: "Reviving the Glory of Kerala Hoops",
    description:
      "A forward-thinking sports management startup established by five legendary former Kerala basketball players, committed to modernizing the sport through a landmark 20-year pact with KBA.",
    deepExplanation:
      "Starting Five Sports Management Pvt. Ltd. was founded by five former Kerala state and national players who competed between 1968 and 1988. In a historic move, Starting Five inked a 20-year strategic agreement with the Kerala Basketball Association (KBA) to manage, commercially elevate, and technologically transform basketball in Kerala. Starting Five drives the operations of the BLK, runs the high-intensity 'One Minute to Hoop' challenge across all 14 districts, and arranges international training exposure in basketball hubs like Taiwan.",
    strategicImpact: [
      "Commercial and operational engine powering the Basketball League Kerala.",
      "Long-term 20-year partnership with KBA ensuring enduring institutional backing.",
      "Coordinates international coaching clinics and youth overseas training exchanges.",
      "Grassroots scouting network discovering talent across schools and colleges in Kerala."
    ],
    keyStats: [
      { label: "KBA Pact", value: "20 Years" },
      { label: "Districts", value: "All 14 in Kerala" },
      { label: "Founded By", value: "Former State Players" }
    ],
    establishedYear: "2023",
    badgeColor: "blue"
  },
  {
    id: "tdba",
    name: "Trivandrum District Basketball Association",
    shortName: "TDBA",
    type: "partner",
    category: "District Governing Body",
    roleTitle: "Official District Sanctioning & Technical Body",
    logoUrl: "/images/sponsers/tdba.jpeg",
    tagline: "Nurturing Capital Basketball Since 1955",
    description:
      "Established in 1955, TDBA is the premier district authority governing, organizing, and developing basketball tournaments and youth talent in Thiruvananthapuram.",
    deepExplanation:
      "The Trivandrum District Basketball Association (TDBA) has been the cornerstone of basketball in Kerala's capital city for over seven decades. Affiliated with the Kerala Basketball Association (KBA), TDBA oversees district championships, school leagues, club competitions, and technical referee appointments. TDBA works in close synergy with Trivandrum Capitals to sanction city-wide school tournaments like the BLK Buddies League, providing certified technical officials and tournament venues.",
    strategicImpact: [
      "Official district sanctioning body for all Trivandrum Capitals school and club tournaments.",
      "Appoints certified state and national-grade referees and technical table officials.",
      "Selects Trivandrum district teams for inter-district state youth championships.",
      "Decades of institutional pedigree maintaining the highest standards of sportsmanship."
    ],
    keyStats: [
      { label: "Established", value: "1955" },
      { label: "Jurisdiction", value: "Trivandrum Dist." },
      { label: "Affiliation", value: "KBA & BFI" }
    ],
    establishedYear: "1955",
    badgeColor: "yellow"
  },
  {
    id: "kba",
    name: "Kerala Basketball Association",
    shortName: "KBA",
    type: "partner",
    category: "Apex State Federation",
    roleTitle: "State Governing Body for Basketball in Kerala",
    logoUrl: "/images/sponsers/KBA.png",
    tagline: "The Pinnacle of Kerala Basketball",
    description:
      "The official apex body governing basketball across all 14 districts of Kerala, affiliated with the Basketball Federation of India (BFI) and Kerala State Sports Council.",
    deepExplanation:
      "The Kerala Basketball Association (KBA) is the recognized state governing organization responsible for the promotion, administration, and regulation of basketball throughout Kerala. KBA coordinates all district associations, sanctions official leagues including the BLK, fields Kerala state contingents for national championships, and conducts official coaching certifications. KBA's visionary collaboration with private sports management has made Kerala the first state in India to launch a structured youth franchise league.",
    strategicImpact: [
      "Sanctions the Basketball League Kerala and validates player registrations.",
      "Recognized by the Basketball Federation of India (BFI) and State Sports Council.",
      "Pathways to National Basketball Championships and Indian National Team selections.",
      "Enforces FIBA rules and ethical sports guidelines across all affiliated competitions."
    ],
    keyStats: [
      { label: "Coverage", value: "14 Districts" },
      { label: "Affiliation", value: "BFI & Sports Council" },
      { label: "Governs", value: "State Championships" }
    ],
    badgeColor: "blue"
  },
  {
    id: "abc",
    name: "ABC Sports & Fitness Academy",
    shortName: "ABC",
    type: "partner",
    category: "Athletic & Fitness Academy",
    roleTitle: "Official Athletic Development & Training Partner",
    logoUrl: "/images/sponsers/ABC.png",
    tagline: "Peak Athletic Performance & Conditioning",
    description:
      "A specialized sports and fitness academy providing athletic conditioning, fitness testing, basketball skills development, and youth athletic performance coaching.",
    deepExplanation:
      "ABC Sports & Fitness Academy is a dedicated sports training institution empowering young athletes through systematic physical preparation, speed, agility, and injury-prevention regimens. Partnering with the BLK and Trivandrum Capitals, ABC conducts pre-tournament athletic assessments, advises coaches on recovery and nutrition protocols, and provides structured coaching modules tailored for young basketballers in the U10 and U12 divisions.",
    strategicImpact: [
      "Provides specialized strength, agility, and quickness (SAQ) drills for youth players.",
      "Assists in player fitness assessments and physical conditioning during team trials.",
      "Conducts coaches' workshops on injury prevention and athletic longevity.",
      "Helps bridge foundational fitness with competitive on-court execution."
    ],
    keyStats: [
      { label: "Focus", value: "Athletic Training" },
      { label: "Programs", value: "Youth Fitness & Skills" },
      { label: "Partner Role", value: "Conditioning" }
    ],
    badgeColor: "orange"
  },

  // -------------------------------------------------------------
  // SPONSORS (2)
  // -------------------------------------------------------------
  {
    id: "wattsun",
    name: "Wattsun Energy",
    shortName: "Wattsun",
    type: "sponsor",
    category: "Official Clean Energy Sponsor",
    roleTitle: "Title Energy & Sustainability Sponsor",
    logoUrl: "/images/sponsers/wattsun.png",
    tagline: "Never Ending Energy",
    description:
      "Kerala's leading renewable energy and solar solutions pioneer, fueling Trivandrum Capitals with sustainable innovation and relentless court energy.",
    deepExplanation:
      "Wattsun Energy India is a forward-looking clean-tech company committed to sustainable solar power, renewable infrastructure, and dependable power backup solutions. With their defining motto 'Never ending energy', Wattsun embodies the inexhaustible stamina, drive, and heart required on the basketball court. As an official sponsor of Trivandrum Capitals, Wattsun champions sustainable sports development, eco-friendly events, and youth empowerment across Kerala.",
    strategicImpact: [
      "Official clean energy partner promoting environmental sustainability in sports.",
      "Sponsors tournament equipment, court resources, and match-day player amenities.",
      "Powers youth grassroots development and awards for high-energy court performers.",
      "Inspires student athletes to embrace green energy and healthy, energetic lifestyles."
    ],
    keyStats: [
      { label: "Motto", value: "Never Ending Energy" },
      { label: "Industry", value: "Solar & Clean Tech" },
      { label: "Headquarters", value: "Kerala, India" }
    ],
    badgeColor: "yellow"
  },
  {
    id: "ekalavyas",
    name: "Ekalavyas",
    shortName: "Ekalavyas",
    type: "sponsor",
    category: "Official Media Partner & Sponsor",
    roleTitle: "National Basketball Media & Broadcast Partner",
    logoUrl: "/images/sponsers/ekalavyas.png",
    tagline: "Know Your Game",
    description:
      "India's premier and most respected basketball media, journalism, and community platform, spotlighting the game from grassroots courts to national championships.",
    deepExplanation:
      "Founded in 2010, Ekalavyas is the beating heart of Indian basketball journalism. Recognized nationwide for its incisive reporting, live score updates, player profiles, and video storytelling, Ekalavyas gives Indian hoopers the spotlight they deserve. As an official sponsor and media partner of Trivandrum Capitals and BLK, Ekalavyas delivers extensive digital coverage, tournament highlights, player-of-the-match features, and editorial insights that bring local Kerala talents to national attention.",
    strategicImpact: [
      "Nationwide digital coverage of BLK Buddies League matches and tournaments.",
      "Featured player stories and video spotlights on Indian basketball's top portal.",
      "Comprehensive scorecards, tournament statistics, and match photography.",
      "Connects Kerala's grassroots prodigies with national scouts and basketball enthusiasts."
    ],
    keyStats: [
      { label: "Founded", value: "2010" },
      { label: "Focus", value: "Indian Hoops Media" },
      { label: "Motto", value: "Know Your Game" }
    ],
    badgeColor: "orange"
  }
];

export const officialPartners = partnersAndSponsors.filter((p) => p.type === "partner");
export const officialSponsors = partnersAndSponsors.filter((p) => p.type === "sponsor");
