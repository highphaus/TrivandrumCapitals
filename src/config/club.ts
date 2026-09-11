export const clubConfig = {
  name: "Trivandrum Capitals",
  shortName: "TC",
  monogram: "TC",
  logoUrl: "/images/TrivandrumCaptials.png",
  tagline: "The Capital Rises",
  city: "Thiruvananthapuram",
  state: "Kerala",
  location: "Thiruvananthapuram, Kerala, India",
  description:
    "Trivandrum Capitals presents the BLK BUDDIES LEAGUE – TRIVANDRUM. Official School Registration Platform for U10 & U12 basketball categories.",
  heroLabel: "Trivandrum's Basketball Team",
  heroHeadline: "BLK BUDDIES LEAGUE – TRIVANDRUM",
  heroSubtext:
    "Welcome to the BLK Buddies League! Schools can register teams in U10 & U12 Boys and Girls categories. Each registered team must consist of 10 players.",
  
  leagueInfo: {
    title: "BLK BUDDIES LEAGUE – TRIVANDRUM",
    welcomeText: "Welcome to the BLK Buddies League! Schools can register teams in the following categories:",
    categories: [
      { id: "u10Boys", name: "U10 Boys", cutoff: "Born on or after 01-01-2017", cutoffDate: "2017-01-01" },
      { id: "u10Girls", name: "U10 Girls", cutoff: "Born on or after 01-01-2017", cutoffDate: "2017-01-01" },
      { id: "u12Boys", name: "U12 Boys", cutoff: "Born on or after 01-01-2015", cutoffDate: "2015-01-01" },
      { id: "u12Girls", name: "U12 Girls", cutoff: "Born on or after 01-01-2015", cutoffDate: "2015-01-01" },
    ],
    rules: [
      "A school can register 1, 2, 3 or all 4 teams.",
      "Each registered team must consist of 10 players.",
      "Please select the categories in which your school wishes to participate and enter the details of 10 players for each selected team.",
      "Please ensure that all player names and dates of birth are entered correctly.",
    ],
    feeStructure: {
      perTeam: 1000,
      perPlayer: 100,
      note: "Registration Fee: ₹1,000 per team OR ₹100 per player. Schools may register for 1, 2, 3 or all 4 categories.",
    },
  },

  trialStatus: {
    isOpen: true,
    statusText: "School Registrations Open",
    location: "Thiruvananthapuram",
    categories: "U10 & U12 (Boys & Girls)",
    ctaText: "Register Your School",
  },

  syllabuses: ["State", "CBSE", "ICSE", "Other"],

  designations: [
    "Principal",
    "Physical Education Teacher",
    "Sports Coordinator",
    "Coach",
    "Teacher",
    "Administrator",
    "Other",
  ],

  principles: [
    {
      number: "01",
      title: "School First",
      description:
        "Representing Thiruvananthapuram schools with unyielding pride, athletic excellence, and sportsmanship.",
    },
    {
      number: "02",
      title: "Grassroots Pathway",
      description:
        "Building structured league competition for U10 & U12 student athletes across Kerala.",
    },
    {
      number: "03",
      title: "Championship Culture",
      description:
        "Professional game officiating, court management, and high-intensity team competition.",
    },
  ],

  recruitment: {
    label: "School League Registration",
    heading: "YOUR SCHOOL. YOUR LEAGUE.",
    subtext:
      "Invite your school basketball squads to compete in the Trivandrum Capitals BLK BUDDIES LEAGUE.",
    benefits: [
      "Official league standing & tournament schedule",
      "Professional refereeing & athletic evaluation",
      "Player awards, trophies & team recognition",
      "Pathway to Trivandrum Capitals academy programs",
    ],
  },

  contact: {
    address: "Thiruvananthapuram, Kerala, India",
    emailPlaceholder: "trivandrumcapitals@gmail.com",
    phonePlaceholder: "+91 77366 65965",
    socials: {
      instagram: "https://www.instagram.com/trivandrum_capitals?stkn=NGRvcHh4Z256MjF6",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
    },
  },

  privacyNote:
    "School and player registration data is collected strictly for BLK BUDDIES LEAGUE tournament management and team validation.",
  copyright: `© ${new Date().getFullYear()} Trivandrum Capitals. All rights reserved.`,
};
