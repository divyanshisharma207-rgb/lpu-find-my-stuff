// LPU Campus Locations
export const CAMPUS_BUILDINGS = [
  "Block 34 (Computer Science & Engineering)",
  "Block 38 (Applied Medical Sciences)",
  "UniMall (Shopping & Campus Services)",
  "Central Library (Reading Halls & Digital Hub)",
  "Baldev Raj Mittal Unipolis & Auditorium",
  "Shanti Devi Mittal Indoor Stadium",
  "Food Kiosks & UniStreet",
  "Boys Hostel (BH-1 to BH-8)",
  "Girls Hostel (GH-1 to GH-6)",
  "UniHospital & Wellness Centre",
  "Main Campus Gate / Security Post 1",
  "Robotics & Innovation Lab (Block 28)",
  "Other / Open Campus Grounds"
];

// Item Categories
export const ITEM_CATEGORIES = [
  "Electronics & Gadgets",
  "Student IDs & Cards",
  "Keys & Wallets",
  "Books & Study Material",
  "Bags & Backpacks",
  "Clothing & Eyewear",
  "Sports & Fitness",
  "Documents & Certificates",
  "Other Personal Items"
];

// Status Options styled with the 6-color warm palette:
// #FA8952, #FABF52, #FAA652, #FAA596, #FAD352, #FAD3AD
export const ITEM_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "lost", label: "Lost", color: "bg-[#FA8952]/15 text-[#FA8952] border-[#FA8952]/40" },
  { value: "found", label: "Found", color: "bg-[#FAA652]/15 text-[#FAA652] border-[#FAA652]/40" },
  { value: "claim pending", label: "Claim Pending", color: "bg-[#FABF52]/15 text-[#b45309] border-[#FABF52]/50" },
  { value: "returned", label: "Returned", color: "bg-[#FAD352]/25 text-[#92400e] border-[#FAD352]" },
  { value: "expired", label: "Expired", color: "bg-slate-200 text-slate-700 border-slate-300" }
];

// Safe Handover Campus Desks
export const SAFE_MEETUP_POINTS = [
  "UniMall Ground Floor Central Security Desk",
  "Central Library Ground Floor Circulation Counter",
  "Block 34 Security Checkpoint / Control Room",
  "Block 38 Proctor / Security Office",
  "Main University Gate Visitor Center",
  "Shanti Devi Mittal Stadium Reception Desk"
];

// Seed realistic lost & found items for LPU campus
export const INITIAL_ITEMS = [
  {
    id: "LPU-2026-101",
    type: "found",
    title: "AirPods Pro (2nd Gen) in White Magsafe Case",
    category: "Electronics & Gadgets",
    building: "Central Library (Reading Halls & Digital Hub)",
    specificLocation: "3rd Floor Quiet Study Pod #12, near corner window",
    date: "2026-11-21",
    time: "16:15",
    status: "found",
    description: "Found on the study table after the evening rush. The case has a small transparent silicone cover. Left untouched with student proctor.",
    imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80",
    reporterAlias: "LPU_Proctor_Aman",
    reporterRole: "finder",
    contactMethod: "In-App Masked Chat",
    secretQuestion: "What personalized name/initials or engraving is shown when Bluetooth pairs or on the silicone strap?",
    secretAnswerHint: "Has custom Bluetooth pairing name and a specific sticker inside.",
    claims: [],
    timeline: [
      { action: "Item Found & Reported", date: "2026-11-21 16:30", user: "LPU_Proctor_Aman" },
      { action: "Listing Published", date: "2026-11-21 16:32", user: "System" }
    ],
    createdAt: "2026-11-21T16:30:00Z"
  },
  {
    id: "LPU-2026-102",
    type: "lost",
    title: "LPU Student ID Card & SBI Global Debit Card in Clear Lanyard",
    category: "Student IDs & Cards",
    building: "Block 34 (Computer Science & Engineering)",
    specificLocation: "Lab 402 or Corridor stairs between 3rd & 4th floor",
    date: "2026-11-22",
    time: "11:20",
    status: "lost",
    description: "Lost my university lanyard with student ID card (CSE 3rd Year) and SBI ATM card inside the back pouch. Urgent as exams are next week!",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=700&q=80",
    reporterAlias: "Student_CSE_24",
    reporterRole: "owner",
    contactMethod: "In-App Masked Chat",
    secretQuestion: "What is the 8-digit registration number or student full name on the card?",
    secretAnswerHint: "Registration starts with 1230****",
    claims: [],
    timeline: [
      { action: "Item Reported Lost", date: "2026-11-22 11:45", user: "Student_CSE_24" }
    ],
    createdAt: "2026-11-22T11:45:00Z"
  },
  {
    id: "LPU-2026-103",
    type: "found",
    title: "Casio FX-991CW ClassWiz Scientific Calculator",
    category: "Books & Study Material",
    building: "Block 38 (Applied Medical Sciences)",
    specificLocation: "Room 204 Lecture Hall, Left 2nd bench",
    date: "2026-11-20",
    time: "15:00",
    status: "claim pending",
    description: "Found right after the B.Tech Mathematics lecture. Calculator is in excellent working condition with protective slide-on cover.",
    imageUrl: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=700&q=80",
    reporterAlias: "CampusOwl_71",
    reporterRole: "finder",
    contactMethod: "In-App Masked Chat",
    secretQuestion: "What formula or name is scribbled inside the black sliding lid with pencil?",
    secretAnswerHint: "Initials 'R.S.' and an integration formula",
    claims: [
      {
        id: "claim-103-1",
        claimerAlias: "Rohit_Sharma_99",
        createdAt: "2026-11-21T09:15:00Z",
        secretProof: "Inside the sliding lid, there is pencil text with my initials 'R.S.' and the formula ∫ e^x(f(x)+f'(x))dx. Also has a small nick on bottom right corner.",
        proofPhotoUrl: "",
        status: "pending",
        messages: [
          {
            id: "msg-103-1",
            senderAlias: "Rohit_Sharma_99",
            senderRole: "claimer",
            text: "Hello! I think this is my Casio calculator left after calculus class. The inside cover has my initials 'R.S.' and an integration formula.",
            timestamp: "2026-11-21 09:15"
          },
          {
            id: "msg-103-2",
            senderAlias: "CampusOwl_71",
            senderRole: "finder",
            text: "Hi! That matches the pencil writing exactly! When can you meet to collect it? UniMall Security Desk is best.",
            timestamp: "2026-11-21 10:04"
          }
        ]
      }
    ],
    timeline: [
      { action: "Item Found", date: "2026-11-20 15:10", user: "CampusOwl_71" },
      { action: "Claim Submitted by Rohit_Sharma_99", date: "2026-11-21 09:15", user: "Rohit_Sharma_99" },
      { action: "Status set to Claim Pending", date: "2026-11-21 09:15", user: "System" }
    ],
    createdAt: "2026-11-20T15:10:00Z"
  },
  {
    id: "LPU-2026-104",
    type: "found",
    title: "Black Leather Bi-Fold Wallet with Keys Ring",
    category: "Keys & Wallets",
    building: "UniMall (Shopping & Campus Services)",
    specificLocation: "Ground floor food court near Subway counters",
    date: "2026-11-19",
    time: "13:20",
    status: "returned",
    description: "Found on dining table. Handed over directly to UniMall Central Security Post. Owner verified via secret student ID badge inside.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80",
    reporterAlias: "UniMall_Security_Staff",
    reporterRole: "security",
    contactMethod: "In-App Masked Chat",
    secretQuestion: "What distinct brass key or photo is in the coin pouch?",
    secretAnswerHint: "Room key #412 brass tag",
    claims: [
      {
        id: "claim-104-1",
        claimerAlias: "Hosteler_BH3",
        createdAt: "2026-11-19T14:40:00Z",
        secretProof: "The brass key has BH3-412 stamped on it and has a picture of my pet golden retriever in the currency sleeve.",
        proofPhotoUrl: "",
        status: "approved",
        messages: [
          {
            id: "msg-104-1",
            senderAlias: "Hosteler_BH3",
            senderRole: "claimer",
            text: "I was having lunch at Subway and left it! Can I collect it from the security desk?",
            timestamp: "2026-11-19 14:40"
          },
          {
            id: "msg-104-2",
            senderAlias: "UniMall_Security_Staff",
            senderRole: "security",
            text: "Verified! Collected in person at 15:30 with valid university biometrics. Reunited!",
            timestamp: "2026-11-19 15:35"
          }
        ]
      }
    ],
    timeline: [
      { action: "Item Found", date: "2026-11-19 13:20", user: "UniMall_Security_Staff" },
      { action: "Claim Verified", date: "2026-11-19 15:10", user: "UniMall_Security_Staff" },
      { action: "Handed over to verified owner - Status: Returned", date: "2026-11-19 15:35", user: "UniMall_Security_Staff" }
    ],
    createdAt: "2026-11-19T13:20:00Z"
  },
  {
    id: "LPU-2026-105",
    type: "lost",
    title: "Black North Face Water-Resistant Backpack",
    category: "Bags & Backpacks",
    building: "Shanti Devi Mittal Indoor Stadium",
    specificLocation: "Badminton Court 3 spectator bleachers",
    date: "2026-11-18",
    time: "18:00",
    status: "lost",
    description: "Contains Yonex badminton racket, gray towel, water bottle, and my class notes folder. Please contact me if spotted anywhere in stadium.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    reporterAlias: "SportsEnthusiast_55",
    reporterRole: "owner",
    contactMethod: "In-App Masked Chat",
    secretQuestion: "What color is the Yonex racket grip and what sticker is on the metal water flask?",
    secretAnswerHint: "Neon green grip and gym shark logo sticker",
    claims: [],
    timeline: [
      { action: "Item Reported Lost", date: "2026-11-18 19:00", user: "SportsEnthusiast_55" }
    ],
    createdAt: "2026-11-18T19:00:00Z"
  },
  {
    id: "LPU-2026-106",
    type: "found",
    title: "Ray-Ban Metal Frame Eyeglasses in Brown Hard Case",
    category: "Clothing & Eyewear",
    building: "Food Kiosks & UniStreet",
    specificLocation: "Wooden bench outside Nescafe kiosk",
    date: "2026-09-12",
    time: "17:15",
    status: "expired",
    description: "Found left behind on the bench in September. Held at UniStreet Lost & Found bin for 60+ days without any claim submitted.",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    reporterAlias: "Campus_Attendant_Sunil",
    reporterRole: "finder",
    contactMethod: "In-App Masked Chat",
    secretQuestion: "What prescription power or frame model number is stamped on left temple arm?",
    secretAnswerHint: "Model RB 3447",
    claims: [],
    timeline: [
      { action: "Item Found", date: "2026-09-12 17:30", user: "Campus_Attendant_Sunil" },
      { action: "Retention Window Exceeded - Marked Expired", date: "2026-11-15 00:00", user: "System" }
    ],
    createdAt: "2026-09-12T17:30:00Z"
  }
];
