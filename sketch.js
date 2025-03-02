/*************************
 * GLOBAL VARIABLES
 *************************/
let state = 0;
let cash = 5000000;
let budget = 5000000;
let plotIndex = -1;
let scriptIndex = -1;
let directorIndex = -1;
let actorIndex = -1;
let title = "";
let scripts = [];
let selectedScript = "";
let success_score = 0;
let revenues = [];
let total_revenue = 0;
let profit = 0;
let oscar_status = "none";
let errorMsg = "";
let specialEffectsCost = 0;
let specialEffectsPenalty = 0;
let marketingCost = 0;
let marketingPenalty = 0;
let moviesCompleted = 0;
let directorPenalty = 0;
let actorPenalty = 0;
let availableDirectors = [];
let availableActors = [];
let selectedEffectOption = -1;
let selectedMarketingOption = -1;
let successTier = "";
let motivationalMessage = "";

// Presentation logic
let revealPhase = 0;
let phaseStartTime = 0;
let scriptProgress = 0;
let weekIndex = 0;
let finalScript = "";

// For penalty descriptions
let penaltyReasons = [];

// For secret director milestone
let unlockedJohnHughes = false;

/*************************
 * DIRECTORS (30)
 *************************/
let directors = [
  { name: "Steven Spielberg", cost: 4000000, boost: 30 },
  { name: "Ridley Scott", cost: 3800000, boost: 28 },
  { name: "James Cameron", cost: 3900000, boost: 29 },
  { name: "George Lucas", cost: 4000000, boost: 30 },
  { name: "Martin Scorsese", cost: 3900000, boost: 29 },
  { name: "John Carpenter", cost: 400000, boost: 4 },
  { name: "Tobe Hooper", cost: 300000, boost: 3 },
  { name: "Joe Dante", cost: 350000, boost: 3 },
  { name: "Wes Craven", cost: 450000, boost: 5 },
  { name: "John Landis", cost: 500000, boost: 6 },
  { name: "Tim Burton", cost: 3700000, boost: 27 },
  { name: "David Lynch", cost: 3600000, boost: 26 },
  { name: "Francis Ford Coppola", cost: 4100000, boost: 31 },
  { name: "Brian De Palma", cost: 3800000, boost: 28 },
  { name: "Oliver Stone", cost: 3900000, boost: 29 },
  { name: "Ron Howard", cost: 3500000, boost: 25 },
  { name: "Peter Jackson", cost: 4000000, boost: 30 },
  { name: "Quentin Tarantino", cost: 4200000, boost: 32 },
  { name: "David Fincher", cost: 4100000, boost: 31 },
  { name: "Christopher Nolan", cost: 4300000, boost: 33 },
  { name: "Stanley Kubrick", cost: 4500000, boost: 35 },
  { name: "Alfred Hitchcock", cost: 4400000, boost: 34 },
  { name: "Orson Welles", cost: 4200000, boost: 32 },
  { name: "Akira Kurosawa", cost: 4000000, boost: 30 },
  { name: "Ingmar Bergman", cost: 3900000, boost: 29 },
  { name: "Federico Fellini", cost: 3800000, boost: 28 },
  { name: "Woody Allen", cost: 3600000, boost: 26 },
  { name: "Robert Zemeckis", cost: 3700000, boost: 27 },
  { name: "Michael Bay", cost: 3500000, boost: 25 },
  { name: "Gus Van Sant", cost: 3400000, boost: 24 }
];

// The secret/unlocked director (John Hughes)
const SECRET_DIRECTOR = {
  name: "John Hughes",
  cost: 1500000,
  boost: 20
};

/*************************
 * PLOT DEFINITIONS (8)
 *************************/
let plots = [
  { 
    type: "Sci-Fi Adventure", 
    appeal: 8, 
    scripts: [
      "[hero] explores [place], where [twist] reveals a [adjective] [object] threatening the galaxy. With [villain] in pursuit, they must [goal] to survive.",
      "In [place], [hero] uncovers a [adjective] [object] after [twist]. To [goal], they evade [villain]’s pursuit.",
      "[hero] lands in [place], wielding a [adjective] [object] amid [twist]. They strive to [goal] as [villain] launches an attack."
    ] 
  },
  { 
    type: "Teen Comedy", 
    appeal: 7, 
    scripts: [
      "[hero] navigates high school life in [place], where [twist] upends everything with a [adjective] [object]. They team up to [goal] before [villain] causes chaos.",
      "At [place]’s high school, [hero] faces [twist] over a [adjective] [object]. They work to [goal] despite [villain]’s prank.",
      "[hero] deals with [twist] and a [adjective] [object] in [place]. They aim to [goal] while outsmarting [villain] before graduation."
    ]
  },
  { 
    type: "Action Flick", 
    appeal: 9, 
    scripts: [
      "[hero] battles enemies in [place], racing against [twist] with a [adjective] [object] to stop [villain]. Their mission: [goal].",
      "In [place], [hero] confronts [twist] using a [adjective] [object]. They push to [goal] as [villain] unleashes an attack.",
      "[hero] storms [place] amid [twist], armed with a [adjective] [object]. To [goal], they dodge [villain]’s pursuit."
    ]
  },
  { 
    type: "Horror Thriller", 
    appeal: 6, 
    scripts: [
      "[hero] uncovers dark secrets in [place], where [twist] unleashes a [adjective] [object]. They struggle to [goal] before [villain] strikes.",
      "In [place], [hero] finds a [adjective] [object] after [twist]. They aim to [goal] as [villain]’s terror closes in.",
      "[hero] faces [twist] in [place], tied to a [adjective] [object]. To [goal], they must escape [villain]’s pursuit."
    ]
  },
  { 
    type: "Romantic Drama", 
    appeal: 7, 
    scripts: [
      "[hero] falls in love in [place], but [twist] disrupts their life with a [adjective] [object]. They fight to [goal] despite [villain]’s interference.",
      "[hero] loses their love to [twist] in [place] over a [adjective] [object]. They strive to [goal] against [villain]’s manipulation.",
      "[hero] navigates [place] with a [adjective] [object] after [twist]. Their journey to [goal] pits them against [villain]."
    ]
  },
  { 
    type: "Western", 
    appeal: 8, 
    scripts: [
      "[hero] rides into [place], where [twist] sparks trouble over a [adjective] [object]. They aim to [goal] in a showdown with [villain].",
      "In [place], [hero] faces [twist] wielding a [adjective] [object]. They work to [goal] as [villain] attempts an ambush.",
      "[hero] enters [place] amid [twist], carrying a [adjective] [object]. To [goal], they confront [villain]’s attack."
    ]
  },
  { 
    type: "Spy Thriller", 
    appeal: 9, 
    scripts: [
      "[hero] infiltrates [place], where [twist] uncovers a [adjective] [object]. They must [goal] to thwart [villain]’s plans.",
      "In [place], [hero] discovers [twist] tied to a [adjective] [object]. They pursue [goal] while evading [villain]’s pursuit.",
      "[hero] navigates [twist] in [place] with a [adjective] [object]. To [goal], they counter [villain]’s ambush."
    ]
  },
  { 
    type: "Fantasy Epic", 
    appeal: 8, 
    scripts: [
      "[hero] quests through [place], where [twist] reveals a [adjective] [object]. They must [goal] to defeat [villain] and save the realm.",
      "In [place], [hero] finds a [adjective] [object] after [twist]. They strive to [goal] as [villain] unleashes an attack.",
      "[hero] wields a [adjective] [object] in [place] amid [twist]. To [goal], they face [villain]’s assault."
    ]
  }
];

/*************************
 * ACTORS (30)
 *************************/
let actors = [
  { name: "Harrison Ford", starPower: 9, cost: 1500000 },
  { name: "Molly Ringwald", starPower: 7, cost: 800000 },
  { name: "Eddie Murphy", starPower: 8, cost: 1200000 },
  { name: "Tom Hanks", starPower: 6, cost: 600000 },
  { name: "Sigourney Weaver", starPower: 8, cost: 1200000 },
  { name: "Michael J. Fox", starPower: 7, cost: 900000 },
  { name: "Demi Moore", starPower: 6, cost: 700000 },
  { name: "Arnold Schwarzenegger", starPower: 9, cost: 1400000 },
  { name: "Sylvester Stallone", starPower: 8, cost: 1300000 },
  { name: "Julia Roberts", starPower: 7, cost: 850000 },
  { name: "Bruce Willis", starPower: 9, cost: 1600000 },
  { name: "Meryl Streep", starPower: 10, cost: 2000000 },
  { name: "Mel Gibson", starPower: 8, cost: 1100000 },
  { name: "Winona Ryder", starPower: 6, cost: 650000 },
  { name: "Kevin Costner", starPower: 7, cost: 950000 },
  { name: "Whoopi Goldberg", starPower: 8, cost: 1000000 },
  { name: "Patrick Swayze", starPower: 7, cost: 900000 },
  { name: "Meg Ryan", starPower: 6, cost: 700000 },
  { name: "Sean Connery", starPower: 9, cost: 1700000 },
  { name: "Michelle Pfeiffer", starPower: 7, cost: 800000 },
  { name: "John Travolta", starPower: 8, cost: 1200000 },
  { name: "Geena Davis", starPower: 6, cost: 600000 },
  { name: "Denzel Washington", starPower: 8, cost: 1100000 },
  { name: "Sandra Bullock", starPower: 7, cost: 750000 },
  { name: "Clint Eastwood", starPower: 9, cost: 1800000 },
  { name: "Kim Basinger", starPower: 6, cost: 700000 },
  { name: "Nicolas Cage", starPower: 7, cost: 900000 },
  { name: "Goldie Hawn", starPower: 6, cost: 650000 },
  { name: "Kurt Russell", starPower: 8, cost: 1000000 },
  { name: "Cher", starPower: 7, cost: 850000 }
];

/*************************
 * GENRE-SPECIFIC ARRAYS
 *************************/

/** Sci-Fi Adventure **/
let sciFiHeroes = ["a seasoned astronaut", "a determined scientist", "a courageous pilot", "a resourceful engineer"];
let sciFiAbsurdHeroes = ["an eccentric inventor", "a quirky astronomer", "a bold space cadet", "a clumsy technician"];
let sciFiPlaces = ["a distant planet", "a space station", "a frozen moon", "a cosmic nebula"];
let sciFiAbsurdPlaces = ["a quirky asteroid", "a hidden spaceport", "a strange comet", "a bustling orbital hub"];
let sciFiTwists = ["a catastrophic explosion", "a mysterious signal", "a hidden alien artifact", "a rogue AI takeover"];
let sciFiAbsurdTwists = ["a bizarre space glitch", "a surprise alien message", "a strange invention malfunction", "a rival’s petty sabotage"];
let sciFiVillains = ["a ruthless warlord", "a cunning dictator", "a shadowy operative", "a rogue AI"];
let sciFiAbsurdVillains = ["a scheming rival", "a jealous ex-crew member", "a bumbling pirate", "a pompous official"];
let sciFiGoals = ["save the galaxy", "uncover the truth", "stop the enemy", "restore peace"];
let sciFiAbsurdGoals = ["prove their worth", "fix the glitch", "outsmart the rival", "calm the chaos"];
let sciFiAdjectives = ["advanced", "dangerous", "mysterious", "powerful"];
let sciFiAbsurdAdjectives = ["unusual", "rickety", "curious", "shiny"];
let sciFiDevices = ["device", "satellite", "prototype", "code"];
let sciFiAbsurdDevices = ["gadget", "contraption", "radio", "invention"];

/** Teen Comedy **/
let teenHeroes = ["a curious teenager", "a witty student", "a spirited cheerleader", "a shy nerd"];
let teenAbsurdHeroes = ["a quirky journalist", "a clumsy band geek", "a bold prankster", "a stubborn class clown"];
let teenPlaces = ["a bustling high school", "a quiet suburb", "a crowded mall", "a local park"];
let teenAbsurdPlaces = ["a quirky small town", "a hidden hangout", "a foggy campus", "a bustling arcade"];
let teenTwists = ["a school scandal", "a lost trophy", "a secret crush", "a prank gone wrong"];
let teenAbsurdTwists = ["a bizarre misunderstanding", "a surprise talent show", "a strange rumor", "a rival’s petty scheme"];
let teenVillains = ["a jealous rival", "a strict principal", "a mean bully", "a petty troublemaker"];
let teenAbsurdVillains = ["a scheming rival", "a loudmouthed jock", "a bumbling teacher", "a pompous student"];
let teenGoals = ["win back their honor", "solve the mystery", "prove their worth", "calm the chaos"];
let teenAbsurdGoals = ["steal the spotlight", "fix the mess", "outsmart the rival", "settle the score"];
let teenAdjectives = ["awkward", "popular", "secret", "shiny"];
let teenAbsurdAdjectives = ["unusual", "noisy", "colorful", "odd"];
let teenTrinkets = ["trinket", "journal", "treasure", "photo"];
let teenAbsurdTrinkets = ["gadget", "heirloom", "contraption", "relic"];

/** Action Flick **/
let actionHeroes = ["a courageous soldier", "a skilled spy", "a bold mercenary", "a resourceful detective"];
let actionAbsurdHeroes = ["a roguish traveler", "a clumsy stuntman", "a cunning trickster", "a stubborn sheriff"];
let actionPlaces = ["a desolate desert", "a bustling metropolis", "a covert military base", "a stormy ocean"];
let actionAbsurdPlaces = ["a windy frontier", "a hidden valley", "a foggy harbor", "a rugged coastline"];
let actionTwists = ["a catastrophic explosion", "an assassination plot", "a rival faction's betrayal", "a natural disaster"];
let actionAbsurdTwists = ["a bizarre ambush", "a surprise trap", "a strange invention gone wrong", "a rival’s petty sabotage"];
let actionVillains = ["a ruthless warlord", "a vengeful general", "a shadowy operative", "a powerful crime lord"];
let actionAbsurdVillains = ["a scheming rival", "a jealous ex-partner", "a bumbling crook", "a greedy tycoon"];
let actionGoals = ["stop the enemy", "rescue the hostages", "defend the nation", "capture the culprit"];
let actionAbsurdGoals = ["outsmart the rival", "fix the mess", "prove their worth", "settle the score"];
let actionAdjectives = ["dangerous", "lethal", "formidable", "stealthy"];
let actionAbsurdAdjectives = ["tricky", "oversized", "noisy", "unpredictable"];
let actionWeapons = ["weapon", "explosive", "knife", "gun"];
let actionAbsurdWeapons = ["gadget", "contraption", "machine", "invention"];

/** Horror Thriller **/
let horrorHeroes = ["a resourceful detective", "a dedicated doctor", "a vigilant police officer", "a brave survivor"];
let horrorAbsurdHeroes = ["a quirky journalist", "a clumsy professor", "a witty librarian", "a spirited rookie"];
let horrorPlaces = ["a remote village", "an ancient castle", "a misty forest", "a haunted manor"];
let horrorAbsurdPlaces = ["a quirky small town", "a hidden valley", "a foggy harbor", "a strange island"];
let horrorTwists = ["a deadly virus outbreak", "a hidden artifact", "a secret alliance", "an assassination plot"];
let horrorAbsurdTwists = ["a bizarre curse", "a surprise ghost", "a strange invention gone wrong", "a local legend awakens"];
let horrorVillains = ["a sinister scientist", "an evil monarch", "a shadowy operative", "a rogue AI"];
let horrorAbsurdVillains = ["a scheming rival", "a jealous ex-partner", "a bumbling crook", "a quirky madman"];
let horrorGoals = ["solve the mystery", "prevent disaster", "protect the innocent", "uncover the truth"];
let horrorAbsurdGoals = ["calm the chaos", "fix the mess", "prove their worth", "break the odd curse"];
let horrorAdjectives = ["mysterious", "lethal", "ancient", "dangerous"];
let horrorAbsurdAdjectives = ["unusual", "creaky", "curious", "eerie"];
let horrorRelics = ["relic", "artifact", "journal", "map"];
let horrorAbsurdRelics = ["gadget", "trinket", "contraption", "treasure"];

/** Romantic Drama **/
let romanceHeroes = ["a resolute explorer", "a skilled artist", "a noble writer", "a brave dreamer"];
let romanceAbsurdHeroes = ["a quirky journalist", "a clumsy poet", "a witty librarian", "a spirited musician"];
let romancePlaces = ["a historic city", "a quiet suburb", "a romantic beach", "a bustling café"];
let romanceAbsurdPlaces = ["a quirky small town", "a hidden garden", "a foggy harbor", "a strange bookstore"];
let romanceTwists = ["a secret crush", "a lost letter", "a family feud", "a broken promise"];
let romanceAbsurdTwists = ["a bizarre misunderstanding", "a surprise proposal", "a strange rumor", "a rival’s petty scheme"];
let romanceVillains = ["a jealous ex-partner", "a corrupt politician", "a petty rival", "a manipulative family member"];
let romanceAbsurdVillains = ["a scheming rival", "a loudmouthed braggart", "a bumbling suitor", "a greedy tycoon"];
let romanceGoals = ["restore peace", "win back their love", "prove their worth", "heal the rift"];
let romanceAbsurdGoals = ["steal the spotlight", "fix the mess", "outsmart the rival", "settle the score"];
let romanceAdjectives = ["secret", "passionate", "timeless", "fragile"];
let romanceAbsurdAdjectives = ["unusual", "shiny", "colorful", "odd"];
let romanceHeirlooms = ["heirloom", "photo", "letter", "ring"];
let romanceAbsurdHeirlooms = ["gadget", "trinket", "journal", "relic"];

/** Western **/
let westernHeroes = ["a courageous cowboy", "a noble ranger", "a bold outlaw", "a stubborn sheriff"];
let westernAbsurdHeroes = ["a roguish traveler", "a clumsy prospector", "a cunning trickster", "a quirky drifter"];
let westernPlaces = ["a desolate desert", "a dusty frontier", "an old mining camp", "a rugged canyon"];
let westernAbsurdPlaces = ["a windy frontier", "a hidden valley", "a foggy town", "a strange saloon"];
let westernTwists = ["a rival faction's betrayal", "a hidden treasure", "a deadly shootout", "a natural disaster"];
let westernAbsurdTwists = ["a bizarre misunderstanding", "a surprise claim", "a strange invention gone wrong", "a rival’s petty scheme"];
let westernVillains = ["a ruthless warlord", "a vengeful bandit", "a shadowy operative", "a powerful crime lord"];
let westernAbsurdVillains = ["a scheming rival", "a jealous ex-partner", "a bumbling crook", "a greedy tycoon"];
let westernGoals = ["bring justice", "capture the culprit", "defend the town", "restore peace"];
let westernAbsurdGoals = ["prove their worth", "fix the mess", "outsmart the rival", "settle the score"];
let westernAdjectives = ["rugged", "dangerous", "formidable", "stealthy"];
let westernAbsurdAdjectives = ["tricky", "rickety", "noisy", "unpredictable"];
let westernTreasures = ["treasure", "weapon", "map", "gold"];
let westernAbsurdTreasures = ["gadget", "contraption", "machine", "invention"];

/** Spy Thriller **/
let spyHeroes = ["a skilled spy", "a resourceful agent", "a bold operative", "a cunning detective"];
let spyAbsurdHeroes = ["an eccentric inventor", "a quirky journalist", "a clumsy spy", "a witty analyst"];
let spyPlaces = ["a covert military base", "a bustling metropolis", "a secret workshop", "a foggy harbor"];
let spyAbsurdPlaces = ["a quirky hideout", "a hidden valley", "a strange embassy", "a bustling black market"];
let spyTwists = ["a government conspiracy", "a hidden code", "a secret alliance", "an assassination plot"];
let spyAbsurdTwists = ["a bizarre misunderstanding", "a surprise message", "a strange invention gone wrong", "a rival’s petty scheme"];
let spyVillains = ["a shadowy operative", "a corrupt politician", "a sinister scientist", "a rogue AI"];
let spyAbsurdVillains = ["a scheming rival", "a jealous ex-partner", "a bumbling crook", "a sneaky smuggler"];
let spyGoals = ["thwart the plans", "uncover the truth", "stop the enemy", "protect the nation"];
let spyAbsurdGoals = ["outsmart the rival", "fix the mess", "prove their worth", "calm the chaos"];
let spyAdjectives = ["secretive", "lethal", "mysterious", "advanced"];
let spyAbsurdAdjectives = ["unusual", "tricky", "curious", "shiny"];
let spyDevices = ["device", "code", "satellite", "prototype"];
let spyAbsurdDevices = ["gadget", "contraption", "radio", "invention"];

/** Fantasy Epic **/
let fantasyHeroes = ["a noble knight", "a resolute explorer", "a skilled wizard", "a brave warrior"];
let fantasyAbsurdHeroes = ["a quirky bard", "a clumsy apprentice", "a cunning trickster", "a spirited rogue"];
let fantasyPlaces = ["a mystical forest", "an ancient castle", "a frozen tundra", "a magical realm"];
let fantasyAbsurdPlaces = ["a quirky village", "a hidden valley", "a strange mountain", "a bustling fairy market"];
let fantasyTwists = ["a hidden artifact", "a rival faction's betrayal", "a time anomaly", "a dark prophecy"];
let fantasyAbsurdTwists = ["a bizarre curse", "a surprise quest", "a strange invention gone wrong", "a local legend awakens"];
let fantasyVillains = ["an evil monarch", "a sinister sorcerer", "a ruthless warlord", "a rogue AI"];
let fantasyAbsurdVillains = ["a scheming rival", "a jealous ex-partner", "a bumbling troll", "a quirky demon"];
let fantasyGoals = ["save the realm", "restore peace", "defeat the enemy", "uncover the truth"];
let fantasyAbsurdGoals = ["prove their worth", "fix the mess", "outsmart the rival", "break the odd curse"];
let fantasyAdjectives = ["ancient", "powerful", "mysterious", "formidable"];
let fantasyAbsurdAdjectives = ["unusual", "shiny", "odd", "colorful"];
let fantasyArtifacts = ["artifact", "relic", "map", "talisman"];
let fantasyAbsurdArtifacts = ["gadget", "trinket", "contraption", "treasure"];

/*************************
 * SCRIPT COST & QUALITY
 *************************/
const SCRIPT_COSTS = [200000, 350000, 500000, 650000, 800000];
const SCRIPT_QUALITY = [2, 4, 6, 8, 10];

/*************************
 * ERA-SPECIFIC EVENTS
 *************************/
let revenueMultiplier = 1.0;
let openingWeekPenalty = 1.0;
let eraEventMsg = "";
let eraEvents = [
  {
    id: "mtv_boost",
    trigger: (plotIdx) => plotIdx === 1 && random(1) < 0.6,
    message: "MTV picks up your teen flick! Expect a sweet 10% revenue boost!",
    effect: () => {
      revenueMultiplier = 1.1;
    }
  },
  {
    id: "explosions_demand",
    trigger: (plotIdx) => [0, 2, 6].includes(plotIdx) && random(1) < 0.6,
    message: "Studio execs demand MORE EXPLOSIONS! Double SFX cost or face a penalty!",
    effect: () => {
      if (random(1) < 0.5) {
        specialEffectsCost *= 2;
        penaltyReasons.push("Cheap effects blew up on set (SFX cost doubled)!");
      } else {
        specialEffectsPenalty -= 10;
        penaltyReasons.push("Studio meddling caused SFX meltdown (-10)!");
      }
    }
  },
  {
    id: "blockbuster_competition",
    trigger: (plotIdx) => random(1) < 0.6,
    message: "Blockbuster competition crowds your opening! Opening-week revenue -20%.",
    effect: () => {
      openingWeekPenalty = 0.8;
    }
  }
];

/*************************
 * PENALTY & COST HELPERS
 *************************/
function getTotalCost() {
  let directorCost = directorIndex >= 0 ? availableDirectors[directorIndex].cost : 0;
  let scriptCost = scriptIndex >= 0 ? scripts[scriptIndex].cost : 0;
  let actorCost = actorIndex >= 0 ? availableActors[actorIndex].cost : 0;
  return scriptCost + directorCost + actorCost + specialEffectsCost + marketingCost;
}

function calculateDynamicBudget(cash) {
  return moviesCompleted === 0 ? 5000000 : Math.floor(cash * 0.5);
}

function assignPenalty() {
  let val = 0;
  if (random(1) < 0.5) {
    val = -floor(random(5, 21));
  }
  return val;
}

function assignGuaranteedPenalty() {
  return -floor(random(5, 21));
}

/*************************
 * SELECT RANDOM DIRECTORS / ACTORS
 *************************/
function selectRandomDirectors() {
  let sortedDirectors = [...directors].sort((a, b) => a.cost - b.cost);
  let lowCostThreshold = sortedDirectors[Math.floor(sortedDirectors.length / 3)].cost;
  let highCostThreshold = sortedDirectors[Math.floor(2 * sortedDirectors.length / 3)].cost;

  let lowCost = sortedDirectors.filter(d => d.cost <= lowCostThreshold);
  let mediumCost = sortedDirectors.filter(d => d.cost > lowCostThreshold && d.cost <= highCostThreshold);
  let highCost = sortedDirectors.filter(d => d.cost > highCostThreshold);

  availableDirectors = [
    ...lowCost.sort(() => 0.5 - random()).slice(0, 5),
    ...mediumCost.sort(() => 0.5 - random()).slice(0, 2),
    ...highCost.sort(() => 0.5 - random()).slice(0, 1)
  ].sort(() => 0.5 - random());
}

function selectRandomActors() {
  let sortedActors = [...actors].sort((a, b) => a.cost - b.cost);
  let lowCostThreshold = sortedActors[Math.floor(sortedActors.length / 3)].cost;
  let highCostThreshold = sortedActors[Math.floor(2 * sortedActors.length / 3)].cost;

  let lowCost = sortedActors.filter(a => a.cost <= lowCostThreshold);
  let mediumCost = sortedActors.filter(a => a.cost > lowCostThreshold && a.cost <= highCostThreshold);
  let highCost = sortedActors.filter(a => a.cost > highCostThreshold);

  availableActors = [
    ...lowCost.sort(() => 0.5 - random()).slice(0, 3),
    ...mediumCost.sort(() => 0.5 - random()).slice(0, 3),
    ...highCost.sort(() => 0.5 - random()).slice(0, 2)
  ].sort(() => 0.5 - random());
}

/*************************
 * TEXT & TITLE GENERATORS
 *************************/
function getTextHeight(txt, maxWidth) {
  let words = txt.split(' ');
  let lines = [words[0]];
  for (let i = 1; i < words.length; i++) {
    let testLine = lines[lines.length - 1] + ' ' + words[i];
    if (textWidth(testLine) > maxWidth) {
      lines.push(words[i]);
    } else {
      lines[lines.length - 1] = testLine;
    }
  }
  return lines.length * (textSize() + 5);
}

const actorCatchphrases = {
  "Arnold Schwarzenegger": "“I’ll be back!”",
  "Sylvester Stallone": "“Yo, Adrian!”",
  "Bruce Willis": "“Yippee-ki-yay!”",
  "Harrison Ford": "“I’ve got a bad feeling about this...”",
  "default": "“Hold on to your seats!”"
};

const eightiesTropes = [
  "Revenge",
  "Nightmare",
  "Electric",
  "Neon",
  "Turbo",
  "Radical",
  "Shock",
  "Fury",
  "Assault"
];

function generateCreativeTitle(finalScript, actorName, plotType) {
  const seriousTitleFormats = [
    "[Actor]'s [Adjective] [Object]",
    "[PlotType] Threat",
    "[Villain]'s Scheme",
    "[Adjective] Mission"
  ];
  const absurdTitleFormats = [
    "[Actor]'s [Adjective] [Object]",
    "[Adjective] [Goal]",
    "[Villain] [Twist]",
    "[PlotType] Chaos"
  ];
  const eightiesTitleFormats = [
    "[ActorPossessive] [Trope] [Adjective]",
    "[Trope] [PlotType] Unleashed",
    "Revenge of [Actor]",
    "[PlotType] of [Trope]",
    "[Actor] vs. [Trope]"
  ];

  let isSerious = random(1) < 0.8;
  let adjectives = isSerious ? getSeriousAdjectives(plotIndex) : getAbsurdAdjectives(plotIndex);
  let objects = getObjectsForPlot(plotIndex, isSerious);
  let twists = isSerious ? getSeriousTwists(plotIndex) : getAbsurdTwists(plotIndex);
  let villains = isSerious ? getSeriousVillains(plotIndex) : getAbsurdVillains(plotIndex);
  let goals = isSerious ? getSeriousGoals(plotIndex) : getAbsurdGoals(plotIndex);

  let use80sFormat = (random(1) < 0.33);
  let format;
  if (use80sFormat) {
    format = random(eightiesTitleFormats);
  } else {
    format = random(isSerious ? seriousTitleFormats : absurdTitleFormats);
  }

  let actorLastName = actorName.split(" ")[1] || actorName;
  let actorPossessive = actorLastName.endsWith("s") ? actorLastName + "'" : actorLastName + "'s";
  let chosenTrope = random(eightiesTropes);

  let generated = format
    .replace("[Actor]", actorLastName)
    .replace("[ActorPossessive]", actorPossessive)
    .replace("[PlotType]", plotType.split(" ")[0])
    .replace("[Adjective]", random(adjectives))
    .replace("[Object]", random(objects))
    .replace("[Villain]", random(villains))
    .replace("[Twist]", random(twists))
    .replace("[Goal]", random(goals))
    .replace("[Trope]", chosenTrope);

  generated = generated.charAt(0).toUpperCase() + generated.slice(1);

  let chanceForCatchphrase = random(1) < 0.2;
  let catchphrase = actorCatchphrases[actorName] ? actorCatchphrases[actorName] : actorCatchphrases["default"];

  if (chanceForCatchphrase) {
    generated = actorLastName + " says " + catchphrase + " in " + generated;
  }

  let words = generated.split(" ");
  if (words.length > 6) {
    generated = words.slice(0, 6).join(" ");
  }
  return generated;
}

/*************************
 * CHECK FOR ERA EVENT
 *************************/
function checkForEraEvent() {
  revenueMultiplier = 1.0;
  openingWeekPenalty = 1.0;
  eraEventMsg = "";

  let possible = shuffle([...eraEvents]);
  for (let ev of possible) {
    if (ev.trigger(plotIndex)) {
      ev.effect();
      eraEventMsg = ev.message;
      break;
    }
  }
}

/*************************
 * CALCULATE MOVIE RESULTS
 *************************/

// For flop messages by genre
const flopMessagesByGenre = {
  "Sci-Fi Adventure": "The future wasn’t bright enough!",
  "Teen Comedy": "No one showed up to the pep rally!",
  "Action Flick": "The explosions were too small!",
  "Horror Thriller": "The screams were silent this time!",
  "Romantic Drama": "All the love was lost, alas!",
  "Western": "The tumbleweed rolled on by, alone!",
  "Spy Thriller": "Mission not accomplished!",
  "Fantasy Epic": "The magic fizzled—no one believed!"
};

function calculateMovieResults() {
  penaltyReasons = [];

  // Director penalty reason
  if (directorPenalty < 0) {
    penaltyReasons.push(`Director meltdown on set (${directorPenalty})!`);
  }
  // Actor penalty reason
  if (actorPenalty < 0) {
    penaltyReasons.push(`Actor flubbed lines (${actorPenalty})!`);
  }
  // SFX penalty reason
  if (specialEffectsPenalty < 0) {
    penaltyReasons.push(`Cheap effects fizzled (${specialEffectsPenalty})!`);
  }
  // Marketing penalty reason
  if (marketingPenalty < 0) {
    penaltyReasons.push(`Marketing fiasco (${marketingPenalty})!`);
  }

  success_score = plots[plotIndex].appeal + (actorIndex >= 0 ? availableActors[actorIndex].starPower : 0);
  if (directorIndex >= 0) success_score += availableDirectors[directorIndex].boost;
  success_score += Math.floor(specialEffectsCost / 100000) + Math.floor(marketingCost / 200000);
  success_score += scripts[scriptIndex].quality + random(0, 100);
  success_score += scripts[scriptIndex].penalty + directorPenalty + actorPenalty + specialEffectsPenalty + marketingPenalty;
  
  let initial_revenue = (success_score / 100) * budget * 4.3;

  revenues = [];
  total_revenue = 0;
  
  let revenue = initial_revenue;
  for (let week = 1; week <= 12; week++) {
    if (week === 1) revenue *= openingWeekPenalty;
    revenues.push(revenue);
    total_revenue += revenue;
    revenue *= 0.667;
  }

  if (revenueMultiplier !== 1.0) {
    total_revenue *= revenueMultiplier;
    for (let i = 0; i < revenues.length; i++) {
      revenues[i] *= revenueMultiplier;
    }
  }

  // Oscar logic
  oscar_status = "none";
  if (success_score > 80 && random(1) < 0.5) {
    oscar_status = "nominated";
    if (random(1) < 0.2) {
      oscar_status = "win";
      // Extra 4 weeks
      for (let week = 13; week <= 16; week++) {
        revenues.push(revenue);
        total_revenue += revenue;
        revenue *= 0.667;
      }

      // If first time winning an Oscar => unlock John Hughes
      if (!unlockedJohnHughes) {
        unlockedJohnHughes = true;
        directors.push(SECRET_DIRECTOR);
        penaltyReasons.push("Milestone: John Hughes unlocked as a secret director!");
      }
    }
  }

  // Flop logic
  let penalties = [scripts[scriptIndex].penalty, directorPenalty, actorPenalty, specialEffectsPenalty, marketingPenalty];
  let flopChance = Math.min(
    0.15 +
    penalties.filter(p => p < 0).length * 0.05 +
    Math.abs(penalties.reduce((sum, p) => sum + (p < 0 ? p : 0), 0)) * 0.005,
    0.75
  );

  if (random(1) < flopChance) {
    total_revenue = budget * random(0.1, 0.75);
    oscar_status = "flop";
    revenues = [];
    revenue = total_revenue / (12 * 0.667);
    for (let week = 1; week <= 12; week++) {
      revenues.push(revenue);
      revenue *= 0.667;
    }
    let weekSum = revenues.reduce((sum, r) => sum + r, 0);
    revenues = revenues.map(r => r * (total_revenue / weekSum));
  }

  profit = total_revenue - budget;
  cash += profit;

  let actorName = actorIndex >= 0 ? availableActors[actorIndex].name : "an unknown actor";
  let directorName = directorIndex >= 0 ? availableDirectors[directorIndex].name : "an unknown director";
  let heroWithActor = scripts[scriptIndex].hero + " played by " + actorName;
  finalScript = selectedScript.replace("[hero]", heroWithActor);
  finalScript = finalScript.charAt(0).toUpperCase() + finalScript.slice(1);

  title = generateCreativeTitle(finalScript, actorName, plots[plotIndex].type);

  determineSuccessTier();
  revealPhase = 0;
  phaseStartTime = millis();
  scriptProgress = 0;
  weekIndex = 0;
  moviesCompleted++;
}

/*************************
 * DETERMINE SUCCESS TIER
 *************************/
function determineSuccessTier() {
  let currentGenre = plots[plotIndex].type;
  
  if (oscar_status === "win" || total_revenue >= 3 * budget) {
    successTier = "blockbuster";
    motivationalMessage = random([
      "A cinematic triumph! You’ve redefined the industry!",
      "The world is buzzing—your masterpiece is a global sensation!",
      "Cue the fireworks! You’ve smashed every record in the book!",
      "Hollywood bows to you—a blockbuster for the ages!"
    ]);
  } else if (total_revenue >= 1.5 * budget && total_revenue < 3 * budget && success_score >= 80) {
    successTier = "surprise_hit";
    motivationalMessage = random([
      "Out of nowhere, a hit! You’ve stunned the critics!",
      "Underdog no more—this sleeper hit’s waking up the box office!",
      "Who saw this coming? You’ve struck gold unexpectedly!",
      "A hidden gem shines bright—bravo, maestro!"
    ]);
  } else if (total_revenue > budget && total_revenue < 1.5 * budget) {
    successTier = "mild_success";
    motivationalMessage = random([
      "Not bad at all! You’ve made a tidy little profit!",
      "A modest win—steady as she goes, captain!",
      "It’s a small victory, but the crowd’s still cheering!",
      "You’re in the black—keep the reels spinning!"
    ]);
  } else {
    successTier = "flop";
    let baseFlops = [
      "Ouch, a rough cut! Time to rethink the script!",
      "The audience walked out—better luck next reel!",
      "A box office bomb, but every flop’s a lesson!",
      "Flopped hard, huh? Dust off and aim higher!"
    ];
    let genreMsg = flopMessagesByGenre[currentGenre] || "";
    motivationalMessage = genreMsg 
      ? genreMsg + " " + random(baseFlops)
      : random(baseFlops);
  }
}

/*************************
 * P5 SETUP & DRAW
 *************************/
function setup() {
  createCanvas(800, 800);
  console.log("Setup complete, state initialized:", state);
  textSize(16);
  textFont("Courier New");
}

function draw() {
  background(0);
  fill(255);
  textWrap(WORD);

  if (state === 0) {
    text("Welcome to Cinema Tycoon '85", 50, 50);
    text("Your current cash: $" + cash.toLocaleString(), 50, 80);
    text("Press Enter or click here to start", 50, 110);
    text("Press R to reset game", 50, 140);
    if (errorMsg) text(errorMsg, 50, 170);
  } 
  else if (state === 1) {
    let y = 50;
    text("Choose your movie type:", 50, y);
    y += 30;
    text("Your current cash: $" + cash.toLocaleString(), 50, y);
    y += 20;
    text("Current movie budget: $" + budget.toLocaleString(), 50, y);
    y += 30;
    plots.forEach((plot, i) => {
      text((i + 1) + ": " + plot.type, 50, y + i * 20);
    });
    if (errorMsg) text(errorMsg, 50, y + plots.length * 20 + 20);
  } 
  else if (state === 2) {
    let y = 50;
    text("Pick your script:", 50, y);
    y += 30;
    text("Your current cash: $" + cash.toLocaleString(), 50, y);
    y += 20;
    text("Current movie budget: $" + budget.toLocaleString(), 50, y);
    y += 30;

    scripts.forEach((script, i) => {
      let line = (i + 1) + ": " + script.displayText + " (Cost: $" + script.cost.toLocaleString() + ")";
      text(line, 50, y, 700);
      y += getTextHeight(line, 700) + 10;
    });
    text("Total cost so far: $" + getTotalCost().toLocaleString(), 50, y + 20);
    text("Remaining budget: $" + (budget - getTotalCost()).toLocaleString(), 50, y + 40);
    if (errorMsg) text(errorMsg, 50, y + 60);
  } 
  else if (state === 3) {
    let y = 50;
    text("Pick your director (0 for none):", 50, y);
    y += 30;
    text("Your current cash: $" + cash.toLocaleString(), 50, y);
    y += 20;
    text("Current movie budget: $" + budget.toLocaleString(), 50, y);
    y += 30;
    availableDirectors.forEach((director, i) => {
      text((i + 1) + ": " + director.name + " (Cost: $" + director.cost.toLocaleString() + ")", 50, y + i * 25);
    });
    y += availableDirectors.length * 25 + 20;
    text("Total cost so far: $" + getTotalCost().toLocaleString(), 50, y);
    y += 20;
    text("Remaining budget: $" + (budget - getTotalCost()).toLocaleString(), 50, y);
    if (errorMsg) text(errorMsg, 50, y + 30);
  } 
  else if (state === 4) {
    let y = 50;
    text("Choose your lead actor:", 50, y);
    y += 30;
    text("Your current cash: $" + cash.toLocaleString(), 50, y);
    y += 20;
    text("Current movie budget: $" + budget.toLocaleString(), 50, y);
    y += 30;
    availableActors.forEach((actor, i) => {
      text((i + 1) + ": " + actor.name + " (Cost: $" + actor.cost.toLocaleString() + ")", 50, y + i * 25);
    });
    y += availableActors.length * 25 + 20;
    text("Total cost so far: $" + getTotalCost().toLocaleString(), 50, y);
    y += 20;
    text("Remaining budget: $" + (budget - getTotalCost()).toLocaleString(), 50, y);
    if (errorMsg) text(errorMsg, 50, y + 30);
  } 
  else if (state === 5) {
    let y = 50;
    text("Set special effects budget:", 50, y);
    y += 30;
    text("Your current cash: $" + cash.toLocaleString(), 50, y);
    y += 20;
    text("Current movie budget: $" + budget.toLocaleString(), 50, y);
    y += 30;
    let remainingBudget = budget - getTotalCost();
    let maxEffectsPerOption = Math.min(Math.floor(remainingBudget / 5 / 100000) * 100000, 5000000);
    let maxOptions = Math.min(Math.floor(remainingBudget / maxEffectsPerOption), 5);
    for (let i = 1; i <= maxOptions; i++) {
      text(i + ": $" + (i * maxEffectsPerOption).toLocaleString(), 50, y + (i - 1) * 20);
    }
    y += maxOptions * 20 + 20;
    text("Total cost so far: $" + getTotalCost().toLocaleString(), 50, y);
    y += 20;
    text("Remaining budget: $" + (remainingBudget - specialEffectsCost).toLocaleString(), 50, y);
    if (errorMsg) text(errorMsg, 50, y + 30);
  } 
  else if (state === 6) {
    let y = 50;
    text("Set marketing budget:", 50, y);
    y += 30;
    text("Your current cash: $" + cash.toLocaleString(), 50, y);
    y += 20;
    text("Current movie budget: $" + budget.toLocaleString(), 50, y);
    y += 30;
    let remainingBudget = budget - getTotalCost();
    let maxMarketingPerOption = Math.min(Math.floor(remainingBudget / 5 / 100000) * 100000, 5000000);
    let maxOptions = Math.min(Math.floor(remainingBudget / maxMarketingPerOption), 5);
    for (let i = 1; i <= maxOptions; i++) {
      text(i + ": $" + (i * maxMarketingPerOption).toLocaleString(), 50, y + (i - 1) * 20);
    }
    y += maxOptions * 20 + 20;
    text("Total cost so far: $" + getTotalCost().toLocaleString(), 50, y);
    y += 20;
    text("Remaining budget: $" + (remainingBudget - marketingCost).toLocaleString(), 50, y);
    if (errorMsg) text(errorMsg, 50, y + 30);
  } 
  else if (state === 7) {
    checkForEraEvent();
    if (scriptIndex >= 0) {
      calculateMovieResults();
      state = 8;
    } else {
      text("Error: No script selected. Please restart.", 50, 50);
    }
  } 
  else if (state === 8) {
    let currentTime = millis();
    let elapsedTime = currentTime - phaseStartTime;
    let y = 50;
    let actorName = actorIndex >= 0 ? availableActors[actorIndex].name : "an unknown actor";
    let directorName = directorIndex >= 0 ? availableDirectors[directorIndex].name : "an unknown director";

    if (revealPhase === 0) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      if (elapsedTime >= 500) { 
        revealPhase = 1; 
        phaseStartTime = currentTime; 
      }
    }
    else if (revealPhase === 1) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      if (elapsedTime >= 0) { 
        revealPhase = 2; 
        phaseStartTime = currentTime; 
      }
    }
    else if (revealPhase === 2) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      let partialScript = finalScript.substring(0, min(Math.floor(elapsedTime / 20), finalScript.length));
      text(partialScript, 50, y, 700);
      if (partialScript.length === finalScript.length) {
        revealPhase = 3; 
        phaseStartTime = currentTime; 
      }
    }
    else if (revealPhase === 3) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      if (elapsedTime >= 500) {
        revealPhase = 4; 
        phaseStartTime = currentTime; 
      }
    }
    else if (revealPhase === 4) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      y += getTextHeight(finalScript, 700) + 20;

      if (eraEventMsg) {
        fill(173, 216, 230);
        text("80s Event: " + eraEventMsg, 50, y, 700);
        fill(255);
        y += getTextHeight("80s Event: " + eraEventMsg, 700) + 20;
      }

      // Show penalty reasons if any
      if (penaltyReasons.length > 0) {
        fill(255, 100, 100);
        for (let r of penaltyReasons) {
          text(r, 50, y, 700);
          y += getTextHeight(r, 700) + 5;
        }
        fill(255);
        y += 10;
      }

      for (let i = 0; i <= min(weekIndex, 11); i++) {
        text("Week " + (i + 1) + ": $" + Math.round(revenues[i]).toLocaleString(), 50, y + i * 20);
      }
      if (elapsedTime >= 250 && weekIndex < 12) {
        weekIndex++;
        phaseStartTime = currentTime;
      }
      if (weekIndex >= 12) {
        revealPhase = 5;
        phaseStartTime = currentTime;
      }
    }
    else if (revealPhase === 5) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      y += getTextHeight(finalScript, 700) + 20;

      if (penaltyReasons.length > 0) {
        fill(255, 100, 100);
        for (let r of penaltyReasons) {
          text(r, 50, y, 700);
          y += getTextHeight(r, 700) + 5;
        }
        fill(255);
        y += 10;
      }

      for (let i = 0; i < 12; i++) {
        text("Week " + (i + 1) + ": $" + Math.round(revenues[i]).toLocaleString(), 50, y + i * 20);
      }
      if (elapsedTime >= 1000) {
        revealPhase = 6; 
        phaseStartTime = currentTime;
      }
    }
    else if (revealPhase === 6) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      y += getTextHeight(finalScript, 700) + 20;

      if (penaltyReasons.length > 0) {
        fill(255, 100, 100);
        for (let r of penaltyReasons) {
          text(r, 50, y, 700);
          y += getTextHeight(r, 700) + 5;
        }
        fill(255);
        y += 10;
      }

      for (let i = 0; i < 12; i++) {
        text("Week " + (i + 1) + ": $" + Math.round(revenues[i]).toLocaleString(), 50, y + i * 20);
      }
      y += 240;
      let dotCount = Math.min(Math.floor(elapsedTime / 500), 5);
      let dots = ".".repeat(dotCount);
      text("Oscar Status: " + dots, 50, y);
      if (elapsedTime >= 2000) {
        revealPhase = 7; 
        phaseStartTime = currentTime;
      }
    }
    else if (revealPhase === 7) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      y += getTextHeight(finalScript, 700) + 20;

      if (penaltyReasons.length > 0) {
        fill(255, 100, 100);
        for (let r of penaltyReasons) {
          text(r, 50, y, 700);
          y += getTextHeight(r, 700) + 5;
        }
        fill(255);
        y += 10;
      }

      for (let i = 0; i < 12; i++) {
        text("Week " + (i + 1) + ": $" + Math.round(revenues[i]).toLocaleString(), 50, y + i * 20);
      }
      y += 240;
      text("Oscar Status: " + oscar_status, 50, y);
      if (elapsedTime >= 500) {
        revealPhase = oscar_status === "win" ? 8 : 9;
        phaseStartTime = currentTime;
      }
    }
    else if (revealPhase === 8) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      y += getTextHeight(finalScript, 700) + 20;

      if (penaltyReasons.length > 0) {
        fill(255, 100, 100);
        for (let r of penaltyReasons) {
          text(r, 50, y, 700);
          y += getTextHeight(r, 700) + 5;
        }
        fill(255);
        y += 10;
      }

      for (let i = 0; i < revenues.length; i++) {
        text("Week " + (i + 1) + ": $" + Math.round(revenues[i]).toLocaleString(), 50, y + i * 20);
      }
      y += revenues.length * 20 + 20;
      text("Oscar Status: " + oscar_status, 50, y);
      if (elapsedTime >= 500) {
        revealPhase = 9; 
        phaseStartTime = currentTime;
      }
    }
    else if (revealPhase === 9) {
      text("Your movie: " + title + ", directed by " + directorName, 50, y);
      y += 60;
      text(finalScript, 50, y, 700);
      y += getTextHeight(finalScript, 700) + 20;

      if (penaltyReasons.length > 0) {
        fill(255, 100, 100);
        for (let r of penaltyReasons) {
          text(r, 50, y, 700);
          y += getTextHeight(r, 700) + 5;
        }
        fill(255);
        y += 10;
      }

      for (let i = 0; i < revenues.length; i++) {
        text("Week " + (i + 1) + ": $" + Math.round(revenues[i]).toLocaleString(), 50, y + i * 20);
      }
      y += revenues.length * 20 + 20;
      text("Oscar Status: " + oscar_status, 50, y);
      y += 20;
      text("Total Revenue: $" + Math.round(total_revenue).toLocaleString(), 50, y);
      y += 20;
      text("Profit: $" + Math.round(profit).toLocaleString(), 50, y);
      y += 30;

      fill(255, 215, 0);
      text(motivationalMessage, 50, y, 700);
      fill(255);

      y += 40;
      text("Make another movie? (Y/N)", 50, y);

      if (errorMsg) text(errorMsg, 50, y + 20);
    }
  }
}

/*************************
 * KEY PRESSED HANDLER
 *************************/
function keyPressed() {
  console.log("Key pressed: key=" + key + ", keyCode=" + keyCode + ", state=" + state);

  if (state === 0) {
    if (key.toLowerCase() === 'r') {
      // Reset entire game
      cash = 5000000;
      budget = 5000000;
      plotIndex = scriptIndex = directorIndex = actorIndex = -1;
      title = "";
      scripts = [];
      selectedScript = "";
      success_score = total_revenue = profit = 0;
      revenues = [];
      oscar_status = "none";
      errorMsg = "Game reset! Press Enter to start.";
      specialEffectsCost = specialEffectsPenalty = marketingCost = marketingPenalty = 0;
      moviesCompleted = directorPenalty = actorPenalty = 0;
      availableDirectors = [];
      availableActors = [];
      selectedEffectOption = selectedMarketingOption = -1;
      revealPhase = phaseStartTime = scriptProgress = weekIndex = 0;
      finalScript = "";
      successTier = "";
      motivationalMessage = "";
      revenueMultiplier = 1.0;
      openingWeekPenalty = 1.0;
      eraEventMsg = "";
      unlockedJohnHughes = false;
      penaltyReasons = [];
    } 
    else if (keyCode === ENTER) {
      state = 1;
      budget = calculateDynamicBudget(cash);
      errorMsg = "";
      console.log("Started game, state: " + state);
    }
  } 
  else if (state === 1 && key >= '1' && key <= '8') {
    selectPlot(int(key) - 1);
  } 
  else if (state === 2 && key >= '1' && key <= '5') {
    scriptIndex = int(key) - 1;
    if (getTotalCost() <= budget) {
      selectedScript = scripts[scriptIndex].template; 
      selectRandomDirectors();
      state = 3;
      errorMsg = "";
    } else {
      errorMsg = "Script cost exceeds budget!";
      scriptIndex = -1;
    }
  } 
  else if (state === 3 && key >= '0' && key <= '8') {
    // Director index
    directorIndex = key === '0' ? -1 : int(key) - 1;
    directorPenalty = (directorIndex >= 5 && directorIndex <= 6) ? assignPenalty() : 0;
    if (directorPenalty < 0) {
      penaltyReasons.push(`Director meltdown on set (${directorPenalty})!`);
    }

    if (directorIndex !== -1 && getTotalCost() > budget) {
      errorMsg = "Director cost exceeds budget!";
      directorIndex = -1;
      directorPenalty = 0;
    } else {
      selectRandomActors();
      state = 4;
      errorMsg = "";
    }
  } 
  else if (state === 4 && key >= '1' && key <= '8') {
    // Actor index
    actorIndex = int(key) - 1;
    actorPenalty = (actorIndex >= 3 && actorIndex <= 6) ? assignPenalty() : 0;
    if (actorPenalty < 0) {
      penaltyReasons.push(`Actor flubbed lines (${actorPenalty})!`);
    }

    if (getTotalCost() <= budget) {
      state = 5;
      errorMsg = "";
    } else {
      errorMsg = "Actor cost exceeds budget!";
      actorIndex = -1;
      actorPenalty = 0;
    }
  } 
  else if (state === 5 && key >= '1' && key <= '5') {
    let maxOptions = Math.min(Math.floor((budget - getTotalCost()) / (1000000 / 5)), 5);
    let option = int(key);
    if (option <= maxOptions) {
      let remainingBudget = budget - getTotalCost();
      let maxEffectsPerOption = Math.min(Math.floor(remainingBudget / 5 / 100000) * 100000, 5000000);
      specialEffectsCost = option * maxEffectsPerOption;
      if (option === 1) {
        specialEffectsPenalty = assignGuaranteedPenalty();
        if (specialEffectsPenalty < 0) {
          penaltyReasons.push(`Cheap effects fizzled (${specialEffectsPenalty})!`);
        }
      }
      state = 6;
      errorMsg = "";
    } else {
      errorMsg = "Invalid choice! Select 1-" + maxOptions + ".";
    }
  } 
  else if (state === 6 && key >= '1' && key <= '5') {
    let maxOptions = Math.min(Math.floor((budget - getTotalCost()) / (1000000 / 5)), 5);
    let option = int(key);
    if (option <= maxOptions) {
      let remainingBudget = budget - getTotalCost();
      let maxMarketingPerOption = Math.min(Math.floor(remainingBudget / 5 / 100000) * 100000, 5000000);
      marketingCost = option * maxMarketingPerOption;
      if (option === 1) {
        marketingPenalty = assignGuaranteedPenalty();
        if (marketingPenalty < 0) {
          penaltyReasons.push(`Marketing fiasco (${marketingPenalty})!`);
        }
      }
      state = 7;
      errorMsg = "";
    } else {
      errorMsg = "Invalid choice! Select 1-" + maxOptions + ".";
    }
  }
  else if (state === 8 && revealPhase === 9) {
    if (key.toLowerCase() === 'y') {
      state = 1;
      budget = calculateDynamicBudget(cash);
      resetForNewMovie();
    } else if (key.toLowerCase() === 'n') {
      state = 0;
      errorMsg = "";
    } else {
      errorMsg = "Please press Y or N!";
    }
  }
}

/*************************
 * MOUSE HANDLER
 *************************/
function mousePressed() {
  if (state === 0 && mouseX > 50 && mouseX < 250 && mouseY > 100 && mouseY < 130) {
    state = 1;
    budget = calculateDynamicBudget(cash);
    errorMsg = "";
    console.log("Started game via mouse, state: " + state);
  } 
  else if (state === 1 && mouseX > 50 && mouseX < 250) {
    for (let i = 0; i < plots.length; i++) {
      if (mouseY > 130 + i * 20 && mouseY < 150 + i * 20) {
        selectPlot(i);
      }
    }
  } 
  else if (state === 2 && mouseX > 50 && mouseX < 750) {
    let y = 130;
    for (let i = 0; i < scripts.length; i++) {
      let line = (i + 1) + ": " + scripts[i].displayText + " (Cost: $" + scripts[i].cost.toLocaleString() + ")";
      let h = getTextHeight(line, 700) + 10;
      if (mouseY > y && mouseY < y + h) {
        scriptIndex = i;
        if (getTotalCost() <= budget) {
          selectedScript = scripts[scriptIndex].template;
          selectRandomDirectors();
          state = 3;
          errorMsg = "";
        } else {
          errorMsg = "Script cost exceeds budget!";
          scriptIndex = -1;
        }
        break;
      }
      y += h;
    }
  } 
  else if (state === 3 && mouseX > 50 && mouseX < 400) {
    for (let i = 0; i <= availableDirectors.length; i++) {
      if (mouseY > 130 + i * 25 && mouseY < 155 + i * 25) {
        directorIndex = i === 0 ? -1 : i - 1;
        directorPenalty = (directorIndex >= 5 && directorIndex <= 6) ? assignPenalty() : 0;
        if (directorPenalty < 0) {
          penaltyReasons.push(`Director meltdown on set (${directorPenalty})!`);
        }
        if (directorIndex !== -1 && getTotalCost() > budget) {
          errorMsg = "Director cost exceeds budget!";
          directorIndex = -1;
          directorPenalty = 0;
        } else {
          selectRandomActors();
          state = 4;
          errorMsg = "";
        }
        break;
      }
    }
  } 
  else if (state === 4 && mouseX > 50 && mouseX < 400) {
    for (let i = 0; i < availableActors.length; i++) {
      if (mouseY > 130 + i * 25 && mouseY < 155 + i * 25) {
        actorIndex = i;
        actorPenalty = (actorIndex >= 3 && actorIndex <= 6) ? assignPenalty() : 0;
        if (actorPenalty < 0) {
          penaltyReasons.push(`Actor flubbed lines (${actorPenalty})!`);
        }
        if (getTotalCost() <= budget) {
          state = 5;
          errorMsg = "";
        } else {
          errorMsg = "Actor cost exceeds budget!";
          actorIndex = -1;
          actorPenalty = 0;
        }
        break;
      }
    }
  } 
  else if (state === 5 && mouseX > 50 && mouseX < 250) {
    let remainingBudget = budget - getTotalCost();
    let maxEffectsPerOption = Math.min(Math.floor(remainingBudget / 5 / 100000) * 100000, 5000000);
    let maxOptions = Math.min(Math.floor(remainingBudget / maxEffectsPerOption), 5);
    for (let i = 1; i <= maxOptions; i++) {
      if (mouseY > 130 + (i - 1) * 20 && mouseY < 150 + (i - 1) * 20) {
        specialEffectsCost = i * maxEffectsPerOption;
        if (i === 1) {
          specialEffectsPenalty = assignGuaranteedPenalty();
          if (specialEffectsPenalty < 0) {
            penaltyReasons.push(`Cheap effects fizzled (${specialEffectsPenalty})!`);
          }
        }
        state = 6;
        errorMsg = "";
        break;
      }
    }
  } 
  else if (state === 6 && mouseX > 50 && mouseX < 250) {
    let remainingBudget = budget - getTotalCost();
    let maxMarketingPerOption = Math.min(Math.floor(remainingBudget / 5 / 100000) * 100000, 5000000);
    let maxOptions = Math.min(Math.floor(remainingBudget / maxMarketingPerOption), 5);
    for (let i = 1; i <= maxOptions; i++) {
      if (mouseY > 130 + (i - 1) * 20 && mouseY < 150 + (i - 1) * 20) {
        marketingCost = i * maxMarketingPerOption;
        if (i === 1) {
          marketingPenalty = assignGuaranteedPenalty();
          if (marketingPenalty < 0) {
            penaltyReasons.push(`Marketing fiasco (${marketingPenalty})!`);
          }
        }
        state = 7;
        errorMsg = "";
        break;
      }
    }
  }
}

/*************************
 * SELECT PLOT & SCRIPTS
 *************************/
function selectPlot(index) {
  plotIndex = index;
  title = plots[plotIndex].type;
  scripts = [];

  let isSerious = random(1) < 0.8;
  let heroes = isSerious ? getSeriousHeroes(index) : getAbsurdHeroes(index);
  let places = isSerious ? getSeriousPlaces(index) : getAbsurdPlaces(index);
  let twists = isSerious ? getSeriousTwists(index) : getAbsurdTwists(index);
  let villains = isSerious ? getSeriousVillains(index) : getAbsurdVillains(index);
  let goals = isSerious ? getSeriousGoals(index) : getAbsurdGoals(index);
  let adjectives = isSerious ? getSeriousAdjectives(index) : getAbsurdAdjectives(index);
  let objects = getObjectsForPlot(index, isSerious);

  for (let i = 0; i < 5; i++) {
    let chosenHero = random(heroes);
    let template = random(plots[plotIndex].scripts)
      .replace("[place]", random(places))
      .replace("[twist]", random(twists))
      .replace("[villain]", random(villains))
      .replace("[goal]", random(goals))
      .replace("[adjective]", random(adjectives))
      .replace("[object]", random(objects));

    let displayText = template.replace("[hero]", chosenHero);
    displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);

    scripts.push({
      template: template,
      displayText: displayText,
      cost: SCRIPT_COSTS[i],
      quality: SCRIPT_QUALITY[i],
      penalty: i <= 1 ? assignPenalty() : 0,
      hero: chosenHero
    });
  }

  state = 2;
  errorMsg = "";
}

/*************************
 * GENRE-SPECIFIC GETTERS
 *************************/
function getSeriousHeroes(index) {
  switch (index) {
    case 0: return sciFiHeroes;
    case 1: return teenHeroes;
    case 2: return actionHeroes;
    case 3: return horrorHeroes;
    case 4: return romanceHeroes;
    case 5: return westernHeroes;
    case 6: return spyHeroes;
    case 7: return fantasyHeroes;
    default: return sciFiHeroes;
  }
}
function getAbsurdHeroes(index) {
  switch (index) {
    case 0: return sciFiAbsurdHeroes;
    case 1: return teenAbsurdHeroes;
    case 2: return actionAbsurdHeroes;
    case 3: return horrorAbsurdHeroes;
    case 4: return romanceAbsurdHeroes;
    case 5: return westernAbsurdHeroes;
    case 6: return spyAbsurdHeroes;
    case 7: return fantasyAbsurdHeroes;
    default: return sciFiAbsurdHeroes;
  }
}
function getSeriousPlaces(index) {
  switch (index) {
    case 0: return sciFiPlaces;
    case 1: return teenPlaces;
    case 2: return actionPlaces;
    case 3: return horrorPlaces;
    case 4: return romancePlaces;
    case 5: return westernPlaces;
    case 6: return spyPlaces;
    case 7: return fantasyPlaces;
    default: return sciFiPlaces;
  }
}
function getAbsurdPlaces(index) {
  switch (index) {
    case 0: return sciFiAbsurdPlaces;
    case 1: return teenAbsurdPlaces;
    case 2: return actionAbsurdPlaces;
    case 3: return horrorAbsurdPlaces;
    case 4: return romanceAbsurdPlaces;
    case 5: return westernAbsurdPlaces;
    case 6: return spyAbsurdPlaces;
    case 7: return fantasyAbsurdPlaces;
    default: return sciFiAbsurdPlaces;
  }
}
function getSeriousTwists(index) {
  switch (index) {
    case 0: return sciFiTwists;
    case 1: return teenTwists;
    case 2: return actionTwists;
    case 3: return horrorTwists;
    case 4: return romanceTwists;
    case 5: return westernTwists;
    case 6: return spyTwists;
    case 7: return fantasyTwists;
    default: return sciFiTwists;
  }
}
function getAbsurdTwists(index) {
  switch (index) {
    case 0: return sciFiAbsurdTwists;
    case 1: return teenAbsurdTwists;
    case 2: return actionAbsurdTwists;
    case 3: return horrorAbsurdTwists;
    case 4: return romanceAbsurdTwists;
    case 5: return westernAbsurdTwists;
    case 6: return spyAbsurdTwists;
    case 7: return fantasyAbsurdTwists;
    default: return sciFiAbsurdTwists;
  }
}
function getSeriousVillains(index) {
  switch (index) {
    case 0: return sciFiVillains;
    case 1: return teenVillains;
    case 2: return actionVillains;
    case 3: return horrorVillains;
    case 4: return romanceVillains;
    case 5: return westernVillains;
    case 6: return spyVillains;
    case 7: return fantasyVillains;
    default: return sciFiVillains;
  }
}
function getAbsurdVillains(index) {
  switch (index) {
    case 0: return sciFiAbsurdVillains;
    case 1: return teenAbsurdVillains;
    case 2: return actionAbsurdVillains;
    case 3: return horrorAbsurdVillains;
    case 4: return romanceAbsurdVillains;
    case 5: return westernAbsurdVillains;
    case 6: return spyAbsurdVillains;
    case 7: return fantasyAbsurdVillains;
    default: return sciFiAbsurdVillains;
  }
}
function getSeriousGoals(index) {
  switch (index) {
    case 0: return sciFiGoals;
    case 1: return teenGoals;
    case 2: return actionGoals;
    case 3: return horrorGoals;
    case 4: return romanceGoals;
    case 5: return westernGoals;
    case 6: return spyGoals;
    case 7: return fantasyGoals;
    default: return sciFiGoals;
  }
}
function getAbsurdGoals(index) {
  switch (index) {
    case 0: return sciFiAbsurdGoals;
    case 1: return teenAbsurdGoals;
    case 2: return actionAbsurdGoals;
    case 3: return horrorAbsurdGoals;
    case 4: return romanceAbsurdGoals;
    case 5: return westernAbsurdGoals;
    case 6: return spyAbsurdGoals;
    case 7: return fantasyAbsurdGoals;
    default: return sciFiAbsurdGoals;
  }
}
function getSeriousAdjectives(index) {
  switch (index) {
    case 0: return sciFiAdjectives;
    case 1: return teenAdjectives;
    case 2: return actionAdjectives;
    case 3: return horrorAdjectives;
    case 4: return romanceAdjectives;
    case 5: return westernAdjectives;
    case 6: return spyAdjectives;
    case 7: return fantasyAdjectives;
    default: return sciFiAdjectives;
  }
}
function getAbsurdAdjectives(index) {
  switch (index) {
    case 0: return sciFiAbsurdAdjectives;
    case 1: return teenAbsurdAdjectives;
    case 2: return actionAbsurdAdjectives;
    case 3: return horrorAbsurdAdjectives;
    case 4: return romanceAbsurdAdjectives;
    case 5: return westernAbsurdAdjectives;
    case 6: return spyAbsurdAdjectives;
    case 7: return fantasyAbsurdAdjectives;
    default: return sciFiAbsurdAdjectives;
  }
}
function getObjectsForPlot(index, isSerious) {
  switch (index) {
    case 0: return isSerious ? sciFiDevices : sciFiAbsurdDevices;
    case 1: return isSerious ? teenTrinkets : teenAbsurdTrinkets;
    case 2: return isSerious ? actionWeapons : actionAbsurdWeapons;
    case 3: return isSerious ? horrorRelics : horrorAbsurdRelics;
    case 4: return isSerious ? romanceHeirlooms : romanceAbsurdHeirlooms;
    case 5: return isSerious ? westernTreasures : westernAbsurdTreasures;
    case 6: return isSerious ? spyDevices : spyAbsurdDevices;
    case 7: return isSerious ? fantasyArtifacts : fantasyAbsurdArtifacts;
    default: return isSerious ? sciFiDevices : sciFiAbsurdDevices;
  }
}

/*************************
 * RESET FOR NEW MOVIE
 *************************/
function resetForNewMovie() {
  plotIndex = scriptIndex = directorIndex = actorIndex = -1;
  specialEffectsCost = marketingCost = 0;
  specialEffectsPenalty = marketingPenalty = 0;
  directorPenalty = actorPenalty = 0;
  scripts = [];
  availableDirectors = [];
  availableActors = [];
  selectedEffectOption = selectedMarketingOption = -1;
  errorMsg = "";
  successTier = "";
  motivationalMessage = "";
  penaltyReasons = [];
}
