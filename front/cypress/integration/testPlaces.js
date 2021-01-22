const testPlaces = [
  {
    name: "ABC Kuortti",
    city: "Pertunmaa",
    description: "testikuvaus",
    highway: 5,
    services: {
      doesNotBelongToChain: false,
      isOpenTwentyFourHours: true,    
      hasBeenAvarded: false,  
      isAttraction: false,
      isSummerCafe: false,
      isGasStation: true,
      isGrill: false
    }
  },
  {
    name: "Vaskikello",
    city: "Pyhäjärvi",
    description: "testikuvaus",
    highway: 4,
    votes: 88,
    services: {
      doesNotBelongToChain: true,
      isOpenTwentyFourHours: false,
      hasBeenAvarded: false,      
      isAttraction: true,
      isSummerCafe: false,
      isGasStation: true,
      isGrill: false
    }
  },
  {
    name: "ABC Hirvaskangas",
    city: "Äänekoski",
    description: "testikuvaus",
    highway: 4,    
    services: {
      doesNotBelongToChain: false,
      isOpenTwentyFourHours: true,    
      hasBeenAvarded: false,  
      isAttraction: false,
      isSummerCafe: false,
      isGasStation: true,
      isGrill: false
    }
  }
]

export default testPlaces;