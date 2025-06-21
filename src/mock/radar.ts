import { generateRandomProfileNickNameSimple } from "@/utils/generator";

export const mockRadarFeedImages = [
    {
      id: 1,
      imageUrls: [`https://picsum.photos/800/600?random=1`],
      nickName: generateRandomProfileNickNameSimple(1),
      profileSummary: "25 | Top | Travel (1Km)",
      distance: "500m",
      lastSeen: 0,
    },
    {
      id: 2,
      imageUrls: [
        `https://picsum.photos/800/600?random=2`,
        `https://picsum.photos/800/600?random=3`,
        `https://picsum.photos/800/600?random=4`
      ],
      nickName: generateRandomProfileNickNameSimple(2),
      profileSummary: "29 | Vers Bottom | Host / Travel (5Km)",
      distance: "1km",
      lastSeen: 0,
    },
    {
      id: 3,
      imageUrls: [
        `https://picsum.photos/800/600?random=5`,
        `https://picsum.photos/800/600?random=6`
      ],
      nickName: generateRandomProfileNickNameSimple(3),
      profileSummary: "51 | Side | Host",
      distance: "1km",
      lastSeen: 10,
    },
    {
      id: 4,
      imageUrls: [
        `https://picsum.photos/800/600?random=7`,
        `https://picsum.photos/800/600?random=8`
      ],
      nickName: generateRandomProfileNickNameSimple(4),
      profileSummary: "37 | Blower | Travel (20Km)",
      distance: "10km",
      lastSeen: 30,
    }, 
    {
      id: 5,
      imageUrls: [
      ],
      nickName: generateRandomProfileNickNameSimple(5),
      profileSummary: "28 | Vers Top | Host",
      distance: "15km",
      lastSeen: 60,
    },   
    {
      id: 6,
      imageUrls: [
        `https://picsum.photos/800/600?random=9`,
      ],
      nickName: generateRandomProfileNickNameSimple(6),
      profileSummary: "31 | Top | Host",
      distance: "11km",
      lastSeen: 120,
    }
  ];
