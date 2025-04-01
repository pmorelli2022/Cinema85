/*************************
 * CONSTANTS
 *************************/
// Game States
const STATE_WELCOME = 0;
const STATE_CHOOSE_PLOT = 1;
const STATE_CHOOSE_SCRIPT = 2;
const STATE_CHOOSE_DIRECTOR = 3;
const STATE_CHOOSE_ACTOR = 4;
const STATE_SET_SFX = 5;
const STATE_SET_MARKETING = 6;
const STATE_LOAN_OFFER = 7; // New state for loan decision
const STATE_CALCULATE_RESULTS = 8;
const STATE_SHOW_RESULTS = 9;
// Game Over States
const STATE_GAME_OVER_BANKRUPT = 10;
const STATE_GAME_OVER_MOB = 11;
const STATE_GAME_OVER_CIA = 12;
const STATE_GAME_OVER_FOREIGN = 13;


const OSCAR_STATUS_NONE = "none";
const OSCAR_STATUS_NOMINATED = "nominated";
const OSCAR_STATUS_WIN = "win";
const OSCAR_STATUS_FLOP = "flop";

const SCRIPT_COSTS = [200000, 350000, 500000, 650000, 800000];
const SCRIPT_QUALITY = [2, 4, 6, 8, 10];
// --- ADJUSTED PENALTY VALUES FOR BALANCING ---
const MIN_PENALTY_VALUE = -40; // Was -20. Most negative value.
const MAX_PENALTY_VALUE = -15; // Was -5. Least negative value.

const MAX_SFX_OPTIONS = 5;
const MAX_MARKETING_OPTIONS = 5;
const SFX_MARKETING_STEP = 100000; // Budget steps

const GENRE_SYNERGY_BONUS = 8; // Points for preferred genre match
// --- ADJUSTED SYNERGY PENALTY FOR BALANCING ---
const GENRE_SYNERGY_PENALTY = -20; // Was -6. Points for hated genre match

// Loan Details
const LOAN_MOB_CUT = 0.90; // 90%
const LOAN_CIA_CUT = 0.50; // 50%
const LOAN_CIA_PENALTY = -10; // Score penalty for propaganda
const LOAN_FOREIGN_CUT = 0.30; // 30%
const LOAN_FOREIGN_FLOP_CHANCE = 0.98; // 98% flop chance (Applies if isUnderForeignControl is true)

// --- NEW REVENUE CONSTANTS ---
const MAX_REVENUE_POTENTIAL = 500000000; // Max potential total gross
const MAX_POSSIBLE_SCORE = 150;       // Estimated max score for scaling
const INITIAL_WEEK_FRACTION = 0.08;    // Week 1 as % of total potential

/*************************
 * GAME DATA (Relatively Static) - FULL DATA RESTORED
 *************************/
 // --- PLOTS ---
let plots = [
  { type: "Sci-Fi Adventure", genreType: "Sci-Fi Adventure", appeal: 8, scripts: ["[hero] explores [place], where [twist] reveals a [adjective] [object] threatening the galaxy. With [villain] in pursuit, they must [goal] to survive.", "In [place], [hero] uncovers a [adjective] [object] after [twist]. To [goal], they evade [villain]’s pursuit.", "[hero] lands in [place], wielding a [adjective] [object] amid [twist]. They strive to [goal] as [villain] launches an attack."] },
  { type: "Teen Comedy", genreType: "Teen Comedy", appeal: 7, scripts: ["[hero] navigates high school life in [place], where [twist] upends everything with a [adjective] [object]. They team up to [goal] before [villain] causes chaos.", "At [place]’s high school, [hero] faces [twist] over a [adjective] [object]. They work to [goal] despite [villain]’s prank.", "[hero] deals with [twist] and a [adjective] [object] in [place]. They aim to [goal] while outsmarting [villain] before graduation."] },
  { type: "Action Flick", genreType: "Action Flick", appeal: 9, scripts: ["[hero] battles enemies in [place], racing against [twist] with a [adjective] [object] to stop [villain]. Their mission: [goal].", "In [place], [hero] confronts [twist] using a [adjective] [object]. They push to [goal] as [villain] unleashes an attack.", "[hero] storms [place] amid [twist], armed with a [adjective] [object]. To [goal], they dodge [villain]’s pursuit."] },
  { type: "Horror Thriller", genreType: "Horror Thriller", appeal: 6, scripts: ["[hero] uncovers dark secrets in [place], where [twist] unleashes a [adjective] [object]. They struggle to [goal] before [villain] strikes.", "In [place], [hero] finds a [adjective] [object] after [twist]. They aim to [goal] as [villain]’s terror closes in.", "[hero] faces [twist] in [place], tied to a [adjective] [object]. To [goal], they must escape [villain]’s pursuit."] },
  { type: "Romantic Drama", genreType: "Romantic Drama", appeal: 7, scripts: ["[hero] falls in love in [place], but [twist] disrupts their life with a [adjective] [object]. They fight to [goal] despite [villain]’s interference.", "[hero] loses their love to [twist] in [place] over a [adjective] [object]. They strive to [goal] against [villain]’s manipulation.", "[hero] navigates [place] with a [adjective] [object] after [twist]. Their journey to [goal] pits them against [villain]."] },
  { type: "Western", genreType: "Western", appeal: 8, scripts: ["[hero] rides into [place], where [twist] sparks trouble over a [adjective] [object]. They aim to [goal] in a showdown with [villain].", "In [place], [hero] faces [twist] wielding a [adjective] [object]. They work to [goal] as [villain] attempts an ambush.", "[hero] enters [place] amid [twist], carrying a [adjective] [object]. To [goal], they confront [villain]’s attack."] },
  { type: "Spy Thriller", genreType: "Spy Thriller", appeal: 9, scripts: ["[hero] infiltrates [place], where [twist] uncovers a [adjective] [object]. They must [goal] to thwart [villain]’s plans.", "In [place], [hero] discovers [twist] tied to a [adjective] [object]. They pursue [goal] while evading [villain]’s pursuit.", "[hero] navigates [twist] in [place] with a [adjective] [object]. To [goal], they counter [villain]’s ambush."] },
  { type: "Fantasy Epic", genreType: "Fantasy Epic", appeal: 8, scripts: ["[hero] quests through [place], where [twist] reveals a [adjective] [object]. They must [goal] to defeat [villain] and save the realm.", "In [place], [hero] finds a [adjective] [object] after [twist]. They strive to [goal] as [villain] unleashes an attack.", "[hero] wields a [adjective] [object] in [place] amid [twist]. To [goal], they face [villain]’s assault."] }
];

// --- DIRECTORS (With genres) ---
let directors = [
  { name: "Steven Spielberg", cost: 4000000, boost: 30, preferredGenres: ["Sci-Fi Adventure", "Action Flick", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Ridley Scott", cost: 3800000, boost: 28, preferredGenres: ["Sci-Fi Adventure", "Action Flick"], hatedGenres: ["Teen Comedy"] }, { name: "James Cameron", cost: 3900000, boost: 29, preferredGenres: ["Sci-Fi Adventure", "Action Flick"], hatedGenres: ["Romantic Drama"] }, { name: "George Lucas", cost: 4000000, boost: 30, preferredGenres: ["Sci-Fi Adventure", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Martin Scorsese", cost: 3900000, boost: 29, preferredGenres: ["Spy Thriller", "Romantic Drama"], hatedGenres: ["Sci-Fi Adventure", "Teen Comedy"] }, { name: "John Carpenter", cost: 400000, boost: 4, preferredGenres: ["Horror Thriller", "Sci-Fi Adventure"], hatedGenres: ["Romantic Drama", "Teen Comedy"] }, { name: "Tobe Hooper", cost: 300000, boost: 3, preferredGenres: ["Horror Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Joe Dante", cost: 350000, boost: 3, preferredGenres: ["Horror Thriller", "Teen Comedy"], hatedGenres: ["Western"] }, { name: "Wes Craven", cost: 450000, boost: 5, preferredGenres: ["Horror Thriller"], hatedGenres: ["Sci-Fi Adventure", "Romantic Drama"] }, { name: "John Landis", cost: 500000, boost: 6, preferredGenres: ["Teen Comedy", "Action Flick"], hatedGenres: ["Western", "Fantasy Epic"] }, { name: "Tim Burton", cost: 3700000, boost: 27, preferredGenres: ["Fantasy Epic", "Horror Thriller"], hatedGenres: ["Western", "Spy Thriller"] }, { name: "David Lynch", cost: 3600000, boost: 26, preferredGenres: ["Spy Thriller", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Action Flick"] }, { name: "Francis Ford Coppola", cost: 4100000, boost: 31, preferredGenres: ["Romantic Drama", "Spy Thriller"], hatedGenres: ["Teen Comedy"] }, { name: "Brian De Palma", cost: 3800000, boost: 28, preferredGenres: ["Spy Thriller", "Action Flick", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Oliver Stone", cost: 3900000, boost: 29, preferredGenres: ["Action Flick", "Spy Thriller"], hatedGenres: ["Fantasy Epic", "Teen Comedy"] }, { name: "Ron Howard", cost: 3500000, boost: 25, preferredGenres: ["Sci-Fi Adventure", "Fantasy Epic", "Romantic Drama"], hatedGenres: ["Horror Thriller"] }, { name: "Peter Jackson", cost: 4000000, boost: 30, preferredGenres: ["Fantasy Epic", "Horror Thriller"], hatedGenres: ["Spy Thriller"] }, { name: "Quentin Tarantino", cost: 4200000, boost: 32, preferredGenres: ["Action Flick", "Spy Thriller", "Western"], hatedGenres: ["Fantasy Epic", "Romantic Drama"] }, { name: "David Fincher", cost: 4100000, boost: 31, preferredGenres: ["Spy Thriller", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Christopher Nolan", cost: 4300000, boost: 33, preferredGenres: ["Sci-Fi Adventure", "Action Flick", "Spy Thriller"], hatedGenres: ["Teen Comedy", "Romantic Drama"] }, { name: "Stanley Kubrick", cost: 4500000, boost: 35, preferredGenres: ["Sci-Fi Adventure", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Western"] }, { name: "Alfred Hitchcock", cost: 4400000, boost: 34, preferredGenres: ["Spy Thriller", "Horror Thriller"], hatedGenres: ["Sci-Fi Adventure", "Fantasy Epic"] }, { name: "Orson Welles", cost: 4200000, boost: 32, preferredGenres: ["Romantic Drama", "Spy Thriller"], hatedGenres: ["Sci-Fi Adventure", "Teen Comedy"] }, { name: "Akira Kurosawa", cost: 4000000, boost: 30, preferredGenres: ["Action Flick", "Western", "Fantasy Epic"], hatedGenres: ["Teen Comedy", "Spy Thriller"] }, { name: "Ingmar Bergman", cost: 3900000, boost: 29, preferredGenres: ["Romantic Drama", "Fantasy Epic"], hatedGenres: ["Action Flick", "Sci-Fi Adventure"] }, { name: "Federico Fellini", cost: 3800000, boost: 28, preferredGenres: ["Romantic Drama", "Fantasy Epic"], hatedGenres: ["Action Flick", "Spy Thriller"] }, { name: "Woody Allen", cost: 3600000, boost: 26, preferredGenres: ["Romantic Drama", "Teen Comedy"], hatedGenres: ["Action Flick", "Sci-Fi Adventure", "Horror Thriller"] }, { name: "Robert Zemeckis", cost: 3700000, boost: 27, preferredGenres: ["Sci-Fi Adventure", "Teen Comedy", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Michael Bay", cost: 3500000, boost: 25, preferredGenres: ["Action Flick", "Sci-Fi Adventure"], hatedGenres: ["Romantic Drama", "Teen Comedy", "Western"] }, { name: "Gus Van Sant", cost: 3400000, boost: 24, preferredGenres: ["Romantic Drama"], hatedGenres: ["Action Flick", "Sci-Fi Adventure", "Fantasy Epic"] }
];
const SECRET_DIRECTOR = { name: "John Hughes", cost: 1500000, boost: 20, preferredGenres: ["Teen Comedy", "Romantic Drama"], hatedGenres: ["Sci-Fi Adventure", "Horror Thriller", "Western"] };

// --- ACTORS (With genres) ---
let actors = [
  { name: "Harrison Ford", starPower: 9, cost: 1500000, preferredGenres: ["Sci-Fi Adventure", "Action Flick", "Spy Thriller"], hatedGenres: ["Teen Comedy"] }, { name: "Molly Ringwald", starPower: 7, cost: 800000, preferredGenres: ["Teen Comedy", "Romantic Drama"], hatedGenres: ["Action Flick", "Sci-Fi Adventure"] }, { name: "Eddie Murphy", starPower: 8, cost: 1200000, preferredGenres: ["Teen Comedy", "Action Flick"], hatedGenres: ["Western", "Horror Thriller"] }, { name: "Tom Hanks", starPower: 6, cost: 600000, preferredGenres: ["Teen Comedy", "Romantic Drama", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Sigourney Weaver", starPower: 8, cost: 1200000, preferredGenres: ["Sci-Fi Adventure", "Horror Thriller", "Action Flick"], hatedGenres: ["Teen Comedy", "Western"] }, { name: "Michael J. Fox", starPower: 7, cost: 900000, preferredGenres: ["Teen Comedy", "Sci-Fi Adventure", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Demi Moore", starPower: 6, cost: 700000, preferredGenres: ["Romantic Drama", "Fantasy Epic"], hatedGenres: ["Western", "Action Flick"] }, { name: "Arnold Schwarzenegger", starPower: 9, cost: 1400000, preferredGenres: ["Action Flick", "Sci-Fi Adventure"], hatedGenres: ["Romantic Drama", "Teen Comedy"] }, { name: "Sylvester Stallone", starPower: 8, cost: 1300000, preferredGenres: ["Action Flick", "Romantic Drama"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Julia Roberts", starPower: 7, cost: 850000, preferredGenres: ["Romantic Drama"], hatedGenres: ["Sci-Fi Adventure", "Action Flick", "Horror Thriller"] }, { name: "Bruce Willis", starPower: 9, cost: 1600000, preferredGenres: ["Action Flick", "Spy Thriller", "Sci-Fi Adventure"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Meryl Streep", starPower: 10, cost: 2000000, preferredGenres: ["Romantic Drama"], hatedGenres: ["Action Flick", "Teen Comedy"] }, { name: "Mel Gibson", starPower: 8, cost: 1100000, preferredGenres: ["Action Flick", "Western", "Romantic Drama"], hatedGenres: ["Teen Comedy", "Sci-Fi Adventure"] }, { name: "Winona Ryder", starPower: 6, cost: 650000, preferredGenres: ["Teen Comedy", "Horror Thriller", "Romantic Drama"], hatedGenres: ["Action Flick", "Western"] }, { name: "Kevin Costner", starPower: 7, cost: 950000, preferredGenres: ["Western", "Romantic Drama", "Action Flick"], hatedGenres: ["Horror Thriller", "Fantasy Epic"] }, { name: "Whoopi Goldberg", starPower: 8, cost: 1000000, preferredGenres: ["Teen Comedy", "Romantic Drama", "Fantasy Epic"], hatedGenres: ["Western", "Horror Thriller"] }, { name: "Patrick Swayze", starPower: 7, cost: 900000, preferredGenres: ["Romantic Drama", "Action Flick"], hatedGenres: ["Sci-Fi Adventure", "Horror Thriller"] }, { name: "Meg Ryan", starPower: 6, cost: 700000, preferredGenres: ["Romantic Drama", "Teen Comedy"], hatedGenres: ["Action Flick", "Sci-Fi Adventure"] }, { name: "Sean Connery", starPower: 9, cost: 1700000, preferredGenres: ["Spy Thriller", "Action Flick", "Fantasy Epic"], hatedGenres: ["Teen Comedy", "Romantic Drama"] }, { name: "Michelle Pfeiffer", starPower: 7, cost: 800000, preferredGenres: ["Romantic Drama", "Fantasy Epic", "Action Flick"], hatedGenres: ["Western", "Horror Thriller"] }, { name: "John Travolta", starPower: 8, cost: 1200000, preferredGenres: ["Romantic Drama", "Action Flick", "Sci-Fi Adventure"], hatedGenres: ["Western", "Horror Thriller"] }, { name: "Geena Davis", starPower: 6, cost: 600000, preferredGenres: ["Romantic Drama", "Action Flick", "Fantasy Epic"], hatedGenres: ["Western", "Spy Thriller"] }, { name: "Denzel Washington", starPower: 8, cost: 1100000, preferredGenres: ["Action Flick", "Spy Thriller", "Romantic Drama"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Sandra Bullock", starPower: 7, cost: 750000, preferredGenres: ["Romantic Drama", "Action Flick", "Teen Comedy"], hatedGenres: ["Western", "Horror Thriller"] }, { name: "Clint Eastwood", starPower: 9, cost: 1800000, preferredGenres: ["Western", "Action Flick", "Spy Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Kim Basinger", starPower: 6, cost: 700000, preferredGenres: ["Romantic Drama", "Spy Thriller", "Action Flick"], hatedGenres: ["Teen Comedy", "Western"] }, { name: "Nicolas Cage", starPower: 7, cost: 900000, preferredGenres: ["Action Flick", "Fantasy Epic", "Romantic Drama"], hatedGenres: ["Western", "Spy Thriller"] }, { name: "Goldie Hawn", starPower: 6, cost: 650000, preferredGenres: ["Teen Comedy", "Romantic Drama"], hatedGenres: ["Action Flick", "Sci-Fi Adventure"] }, { name: "Kurt Russell", starPower: 8, cost: 1000000, preferredGenres: ["Action Flick", "Sci-Fi Adventure", "Western", "Horror Thriller"], hatedGenres: ["Romantic Drama"] }, { name: "Cher", starPower: 7, cost: 850000, preferredGenres: ["Romantic Drama", "Fantasy Epic"], hatedGenres: ["Action Flick", "Western"] }
];

// --- Genre-specific word arrays ---
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


const actorCatchphrases = { "Arnold Schwarzenegger": "“I’ll be back!”", "Sylvester Stallone": "“Yo, Adrian!”", "Bruce Willis": "“Yippee-ki-yay!”", "Harrison Ford": "“I’ve got a bad feeling about this...”", "default": "“Hold on to your seats!”" };
const eightiesTropes = ["Revenge", "Nightmare", "Electric", "Neon", "Turbo", "Radical", "Shock", "Fury", "Assault"];

// --- ERA EVENTS ---
let eraEvents = [
    {
        id: "mtv_boost",
        trigger: (plotIdx) => plots[plotIdx]?.genreType === "Teen Comedy" && random(1) < 0.6,
        message: "MTV picks up your teen flick! Expect a sweet revenue boost!",
        effect: () => { movieResult.revenueMultiplier = 1.1; }
    },
    {
        id: "explosions_demand",
        trigger: (plotIdx) => ["Action Flick", "Sci-Fi Adventure", "Spy Thriller"].includes(plots[plotIdx]?.genreType) && random(1) < 0.6,
        message: "Studio execs demand MORE EXPLOSIONS! Double SFX cost or face consequences!",
        effect: () => {
            if (random(1) < 0.5) { currentMovie.specialEffectsCost *= 2; }
            else { currentMovie.specialEffectsPenalty += floor(random(MIN_PENALTY_VALUE / 2, MAX_PENALTY_VALUE / 2)); }
        }
    },
    {
        id: "blockbuster_competition",
        trigger: (plotIdx) => random(1) < 0.4,
        message: "Major blockbuster competition crowds your opening week!",
        effect: () => { movieResult.openingWeekPenalty = 0.8; }
    }
];


/*************************
 * GAME STATE VARIABLES (Organized)
 *************************/
let state = STATE_WELCOME;

let player = {
  cash: 5000000,
  moviesCompleted: 0,
  unlockedJohnHughes: false,
  errorMsg: "",
  foreignControlNextMovie: false,
  isBankrupt: false,
  bankruptcyType: null
};

let currentMovie = {
  budget: 5000000,
  plotIndex: -1,
  scriptIndex: -1,
  directorIndex: -1,
  actorIndex: -1,
  specialEffectsCost: 0,
  marketingCost: 0,
  specialEffectsPenalty: 0,
  marketingPenalty: 0,
  directorPenalty: 0,
  actorPenalty: 0,
  scripts: [],
  availableDirectors: [],
  availableActors: [],
  selectedScriptTemplate: "",
  chosenHero: "",
  sfxBudgetOptions: [],
  marketingBudgetOptions: [],
  loanTaken: false,
  lender: null,
  previousStateBeforeLoan: null,
  pendingSelectionIndex: -1,
  pendingSelectionType: null,
  isUnderForeignControl: false // Renamed
};

let movieResult = {
  title: "",
  finalScript: "",
  success_score: 0,
  revenues: [],
  total_revenue: 0,
  profit: 0,
  oscar_status: OSCAR_STATUS_NONE,
  successTier: "",
  motivationalMessage: "",
  penaltyReasons: [],
  eraEventMsg: "",
  revealPhase: 0,
  phaseStartTime: 0,
  weekIndex: 0,
  revenueMultiplier: 1.0,
  openingWeekPenalty: 1.0
};

/*************************
 * P5 SETUP & DRAW
 *************************/
function setup() {
  createCanvas(800, 800);
  textSize(16);
  textFont("Courier New");
  resetGame();
  console.log("Setup complete, initial state:", state);
}

function draw() {
  background(0);
  fill(255);
  textWrap(WORD);

  switch (state) {
    case STATE_WELCOME: drawStateWelcome(); break;
    case STATE_CHOOSE_PLOT: drawStateChoosePlot(); break;
    case STATE_CHOOSE_SCRIPT: drawStateChooseScript(); break;
    case STATE_CHOOSE_DIRECTOR: drawStateChooseDirector(); break;
    case STATE_CHOOSE_ACTOR: drawStateChooseActor(); break;
    case STATE_SET_SFX: drawStateSetSFX(); break;
    case STATE_SET_MARKETING: drawStateSetMarketing(); break;
    case STATE_LOAN_OFFER: drawStateLoanOffer(); break;
    case STATE_CALCULATE_RESULTS: text("Calculating results...", 50, 50); break;
    case STATE_SHOW_RESULTS: drawStateShowResults(); break;
    case STATE_GAME_OVER_BANKRUPT: drawStateGameOver("GAME OVER\n\nYou mismanaged the studio into bankruptcy!"); break;
    case STATE_GAME_OVER_MOB: drawStateGameOver("GAME OVER\n\nYou couldn't pay back the Mob.\nLet's just say you're sleeping with the fishes."); break;
    case STATE_GAME_OVER_CIA: drawStateGameOver("GAME OVER\n\nYou failed the Agency.\nYou've been 'disappeared' for 're-education'."); break;
    case STATE_GAME_OVER_FOREIGN: drawStateGameOver("GAME OVER\n\nYour foreign investors were displeased.\nYou're now making commercials for yak butter in Siberia."); break;
    default: text("Error: Unknown game state!", 50, 50);
  }

  if (player.errorMsg && state < STATE_GAME_OVER_BANKRUPT) {
      fill(255, 100, 100);
      textAlign(CENTER, BOTTOM);
      text(player.errorMsg, width / 2, height - 20);
      textAlign(LEFT, TOP);
      fill(255);
  }
}

/*************************
 * STATE DRAWING FUNCTIONS
 *************************/

function drawStateWelcome() {
  text("Welcome to Cinema Tycoon '85", 50, 50);
  text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, 80); // Rounded
  text("Press Enter or click here to start", 50, 110);
  text("Press R to reset game", 50, 140);
}

function drawStateChoosePlot() {
  let y = 50;
  text("Choose your movie type:", 50, y);
  y += 30;
  text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, y); // Rounded
  y += 20;
  text("Current movie budget: $" + Math.round(currentMovie.budget).toLocaleString(), 50, y); // Rounded
  y += 30;
  plots.forEach((plot, i) => {
    text((i + 1) + ": " + plot.type, 50, y + i * 20);
  });
}

function drawStateChooseScript() {
  let y = 50;
  text("Pick your script:", 50, y);
  y += 30;
  text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, y); // Rounded
  y += 20;
  text("Current movie budget: $" + Math.round(currentMovie.budget).toLocaleString(), 50, y); // Rounded
  y += 30;
  if (currentMovie.scripts && currentMovie.scripts.length > 0) {
      currentMovie.scripts.forEach((script, i) => {
        let line = (i + 1) + ": " + script.displayText + " (Cost: $" + script.cost.toLocaleString() + ")";
        text(line, 50, y, 700);
        y += getTextHeight(line, 700) + 10;
      });
  } else {
       text("Generating scripts...", 50, y);
       y += 20;
  }
  y += 20;
  drawBudgetInfo(y); // Uses internal rounding
}

function drawStateChooseDirector() {
  let y = 50;
  text("Pick your director (0 or click for none):", 50, y);
  y += 30;
  text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, y); // Rounded
  y += 20;
  text("Current movie budget: $" + Math.round(currentMovie.budget).toLocaleString(), 50, y); // Rounded
  y += 30;
  text("0: None (Cost: $0)", 50, y);
  y += 25;
  if (currentMovie.availableDirectors && currentMovie.availableDirectors.length > 0) {
      currentMovie.availableDirectors.forEach((director, i) => {
        let line = (i + 1) + ": " + director.name + " (Cost: $" + director.cost.toLocaleString() + ")";
        text(line, 50, y + i * 25);
      });
       y += currentMovie.availableDirectors.length * 25;
  } else {
       text("Finding available directors...", 50, y);
       y += 25;
  }
  y += 20;
  drawBudgetInfo(y); // Uses internal rounding
}

function drawStateChooseActor() {
  let y = 50;
  text("Choose your lead actor:", 50, y);
  y += 30;
  text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, y); // Rounded
  y += 20;
  text("Current movie budget: $" + Math.round(currentMovie.budget).toLocaleString(), 50, y); // Rounded
  y += 30;
  if (currentMovie.availableActors && currentMovie.availableActors.length > 0) {
      currentMovie.availableActors.forEach((actor, i) => {
        let line = (i + 1) + ": " + actor.name + " (Cost: $" + actor.cost.toLocaleString() + ")";
        text(line, 50, y + i * 25);
      });
       y += currentMovie.availableActors.length * 25;
  } else {
       text("Scouting available actors...", 50, y);
       y += 25;
  }
  y += 20;
  drawBudgetInfo(y); // Uses internal rounding
}

function drawStateSetSFX() {
  let y = 50;
  text("Set special effects budget:", 50, y);
  y += 30;
  text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, y); // Rounded
  y += 20;
  text("Current movie budget: $" + Math.round(currentMovie.budget).toLocaleString(), 50, y); // Rounded
  y += 30;
  if (!currentMovie.sfxBudgetOptions || currentMovie.sfxBudgetOptions.length === 0) {
      text("Not enough remaining budget for any SFX.", 50, y);
      y += 20;
  } else {
      currentMovie.sfxBudgetOptions.forEach((cost, i) => {
          let line = (i + 1) + ": $" + cost.toLocaleString();
          text(line, 50, y + i * 20);
      });
      y += currentMovie.sfxBudgetOptions.length * 20;
  }
  y += 20;
  drawBudgetInfo(y); // Uses internal rounding
}

function drawStateSetMarketing() {
  let y = 50;
  text("Set marketing budget:", 50, y);
  y += 30;
   text("Your current cash: $" + Math.round(player.cash).toLocaleString(), 50, y); // Rounded
  y += 20;
  text("Current movie budget: $" + Math.round(currentMovie.budget).toLocaleString(), 50, y); // Rounded
  y += 30;
  if (!currentMovie.marketingBudgetOptions || currentMovie.marketingBudgetOptions.length === 0) {
      text("Not enough remaining budget for any Marketing.", 50, y);
       y += 20;
  } else {
       currentMovie.marketingBudgetOptions.forEach((cost, i) => {
          let line = (i + 1) + ": $" + cost.toLocaleString();
          text(line, 50, y + i * 20);
      });
      y += currentMovie.marketingBudgetOptions.length * 20;
  }
  y += 20;
  drawBudgetInfo(y); // Uses internal rounding
}

function drawStateLoanOffer() {
    let y = 50;
    textAlign(CENTER);
    fill(255, 100, 100);
    text("BUDGET EXCEEDED!", width / 2, y);
    y += 30;
    fill(255);
    text("You cannot afford this selection with your current budget.", width / 2, y);
    y += 30;
    text("You need additional financing to proceed.", width / 2, y);
    y += 50;
    textAlign(LEFT);

    fill(255, 180, 180);
    text("1: The Mob", 50, y);
    fill(255);
    text(`   Offer: Instant cash infusion!`, 50, y + 20);
    text(`   Cost: They take a large share of any profits.`, 50, y + 40);
    text(`   Risk: Don't even think about failing to make a profit...`, 50, y + 60);
    y += 90;

    fill(180, 180, 255);
    text("2: The CIA", 50, y);
    fill(255);
    text(`   Offer: Government 'grant' approved!`, 50, y + 20);
    text(`   Cost: They take a significant share of any profits.`, 50, y + 40);
    text(`   Effect: They *will* insert propaganda into your film.`, 50, y + 60);
    text(`   Risk: Failure is not an option they tolerate.`, 50, y + 80);
    y += 110;

    fill(180, 255, 180);
    text("3: Shady Foreign Investors", 50, y);
    fill(255);
    text(`   Offer: Generous overseas funding!`, 50, y + 20);
    text(`   Cost: They take a share of any profits.`, 50, y + 40);
    text(`   Effect: They demand creative control over your *next* movie.`, 50, y + 60);
    text(`   Risk: Disappointing them has... consequences.`, 50, y + 80);
    y += 110;

    text("N: Reject all offers (Cancel current selection)", 50, y);
}

function drawStateShowResults() {
    let currentTime = millis();
    let elapsedTime = currentTime - movieResult.phaseStartTime;
    let y = 50;

    let actorName = (currentMovie.actorIndex >= 0 && currentMovie.availableActors && currentMovie.availableActors.length > currentMovie.actorIndex) ? currentMovie.availableActors[currentMovie.actorIndex].name : "an unknown actor";
    let directorName = (currentMovie.directorIndex >= 0 && currentMovie.availableDirectors && currentMovie.availableDirectors.length > currentMovie.directorIndex) ? currentMovie.availableDirectors[currentMovie.directorIndex].name : "an unknown director";

    // --- Modified Title/Director Display ---
    if (movieResult.revealPhase >= 0) {
        let titleLine = "Your movie: " + movieResult.title;
        text(titleLine, 50, y, width - 100); // Draw Title allowing wrap
        y += getTextHeight(titleLine, width - 100) + 10; // Adjust y based on actual wrapped height
        text("Directed by: " + directorName, 50, y); // Director on next line
        y += 20; // Add space below director
    }


    if (movieResult.revealPhase === 2) { let partialScript = movieResult.finalScript.substring(0, min(Math.floor(elapsedTime / 20), movieResult.finalScript.length)); text(partialScript, 50, y, 700); if (partialScript.length === movieResult.finalScript.length) { movieResult.revealPhase = 3; movieResult.phaseStartTime = currentTime; } }
    else if (movieResult.revealPhase >= 3) { text(movieResult.finalScript, 50, y, 700); y += getTextHeight(movieResult.finalScript, 700) + 20; }

     if (movieResult.revealPhase === 0 && elapsedTime >= 500) { movieResult.revealPhase = 1; movieResult.phaseStartTime = currentTime; }
     if (movieResult.revealPhase === 1 && elapsedTime >= 0)   { movieResult.revealPhase = 2; movieResult.phaseStartTime = currentTime; }
     if (movieResult.revealPhase === 3 && elapsedTime >= 500) { movieResult.revealPhase = 4; movieResult.phaseStartTime = currentTime; }

    if (movieResult.revealPhase >= 4) {
        if (movieResult.eraEventMsg) { fill(173, 216, 230); text("80s Event: " + movieResult.eraEventMsg, 50, y, 700); fill(255); y += getTextHeight("80s Event: " + movieResult.eraEventMsg, 700) + 20; }
        if (movieResult.penaltyReasons.length > 0) {
            for (let r of movieResult.penaltyReasons) {
                 if (r.toLowerCase().includes('bonus') || r.toLowerCase().includes('boost') || r.toLowerCase().includes('shines') || r.toLowerCase().includes('loves') || r.toLowerCase().includes('oscar win') || r.toLowerCase().includes('extended')) { fill(144, 238, 144); }
                 else if (r.toLowerCase().includes('penalty') || r.toLowerCase().includes('fiasco') || r.toLowerCase().includes('meltdown') || r.toLowerCase().includes('fizzled') || r.toLowerCase().includes('mismatch') || r.toLowerCase().includes('flopped') || r.toLowerCase().includes('hurt') || r.toLowerCase().includes('backfired') || r.toLowerCase().includes('flubbed') || r.toLowerCase().includes('suffered') || r.toLowerCase().includes('doubled') || r.toLowerCase().includes('miscast') || r.toLowerCase().includes('hates') || r.toLowerCase().includes('cut') || r.toLowerCase().includes('failure') || r.toLowerCase().includes('interfered') || r.toLowerCase().includes('took their share') || r.toLowerCase().includes('sabotaged') || r.toLowerCase().includes('bankrupt')) { fill(255, 100, 100); }
                 else { fill(255, 215, 0); }
                text(r, 50, y, 700);
                y += getTextHeight(r, 700) + 5;
            }
            fill(255); y += 10;
        }
    }

    // --- MODIFIED Weekly Revenue Display Logic ---
    if (movieResult.revealPhase === 4) {
        for (let i = 0; i <= min(movieResult.weekIndex, 11); i++) {
            if (movieResult.revenues[i] !== undefined) {
                let rawRevenue = movieResult.revenues[i];
                let roundedRevenue = Math.round(rawRevenue);
                let displayRevenue = roundedRevenue;
                // If it rounded to 0 but was actually positive, display 1 instead
                if (roundedRevenue === 0 && rawRevenue > 0) {
                    displayRevenue = 1;
                }
                let weekIndex = i + 1;
                let yPos = y + i * 20;
                text("Week " + weekIndex + ": $" + displayRevenue.toLocaleString(), 50, yPos);
            }
        }
        if (elapsedTime >= 250 && movieResult.weekIndex < 12) { movieResult.weekIndex++; movieResult.phaseStartTime = currentTime; }
        if (movieResult.weekIndex >= 12) { movieResult.revealPhase = 5; movieResult.phaseStartTime = currentTime; }
    } else if (movieResult.revealPhase >= 5) {
        for (let i = 0; i < 12; i++) {
            if (movieResult.revenues && movieResult.revenues.length > i && movieResult.revenues[i] !== undefined) {
                let rawRevenue = movieResult.revenues[i];
                let roundedRevenue = Math.round(rawRevenue);
                let displayRevenue = roundedRevenue;
                // If it rounded to 0 but was actually positive, display 1 instead
                if (roundedRevenue === 0 && rawRevenue > 0) {
                    displayRevenue = 1;
                }
                let weekIndex = i + 1;
                let yPos = y + i * 20;
                text("Week " + weekIndex + ": $" + displayRevenue.toLocaleString(), 50, yPos);
            }
        }
        y += 12 * 20;
    }

     if (movieResult.revealPhase === 5 && elapsedTime >= 1000) { movieResult.revealPhase = 6; movieResult.phaseStartTime = currentTime; }

    if (movieResult.revealPhase === 6) { let dotCount = Math.min(Math.floor(elapsedTime / 500), 5); text("Oscar Status: " + ".".repeat(dotCount), 50, y); if (elapsedTime >= 2000) { movieResult.revealPhase = 7; movieResult.phaseStartTime = currentTime; } }
    else if (movieResult.revealPhase >= 7) { text("Oscar Status: " + movieResult.oscar_status, 50, y); y += 20; }

     if (movieResult.revealPhase === 7 && elapsedTime >= 500) { movieResult.revealPhase = (movieResult.oscar_status === OSCAR_STATUS_WIN) ? 8 : 9; movieResult.phaseStartTime = currentTime; }

    // --- MODIFIED Oscar Weeks Display Logic ---
    if (movieResult.revealPhase === 8) {
        if (movieResult.revenues && movieResult.revenues.length > 12) {
            for (let i = 12; i < movieResult.revenues.length; i++) {
                if(movieResult.revenues[i] !== undefined){
                    let rawRevenue = movieResult.revenues[i];
                    let roundedRevenue = Math.round(rawRevenue);
                    let displayRevenue = roundedRevenue;
                    // If it rounded to 0 but was actually positive, display 1 instead
                    if (roundedRevenue === 0 && rawRevenue > 0) {
                        displayRevenue = 1;
                    }
                    let weekIndex = i + 1;
                    let yPos = y + (i - 12) * 20;
                    text("Week " + weekIndex + ": $" + displayRevenue.toLocaleString(), 50, yPos);
                }
            }
            y += (movieResult.revenues.length - 12) * 20;
        }
        if (elapsedTime >= 1000) { movieResult.revealPhase = 9; movieResult.phaseStartTime = currentTime; }
    } else if (movieResult.revealPhase === 9 && movieResult.oscar_status === OSCAR_STATUS_WIN) {
        if (movieResult.revenues && movieResult.revenues.length > 12) {
             for (let i = 12; i < movieResult.revenues.length; i++) {
                if(movieResult.revenues[i] !== undefined){
                    let rawRevenue = movieResult.revenues[i];
                    let roundedRevenue = Math.round(rawRevenue);
                    let displayRevenue = roundedRevenue;
                    // If it rounded to 0 but was actually positive, display 1 instead
                    if (roundedRevenue === 0 && rawRevenue > 0) {
                        displayRevenue = 1;
                    }
                    let weekIndex = i + 1;
                    let yPos = y + (i - 12) * 20;
                    text("Week " + weekIndex + ": $" + displayRevenue.toLocaleString(), 50, yPos);
                }
            }
            y += (movieResult.revenues.length - 12) * 20;
        }
    }

    // --- Rest of the results display ---
    if (movieResult.revealPhase === 9) {
        text("Total Revenue: $" + Math.round(movieResult.total_revenue).toLocaleString(), 50, y); y += 20; // Rounding applied
        if (movieResult.profit >= 0) { fill(144, 238, 144); text("Profit: $" + Math.round(movieResult.profit).toLocaleString(), 50, y); } // Rounding applied
        else { fill(255, 100, 100); text("Loss: $" + Math.round(abs(movieResult.profit)).toLocaleString(), 50, y); } // Rounding applied
        fill(255); y += 30;

        fill(255, 215, 0); text(movieResult.motivationalMessage, 50, y, 700); fill(255);
        y += getTextHeight(movieResult.motivationalMessage, 700) + 40;

        if (player.isBankrupt) { text("Press any key or click to continue...", 50, y); }
        else { text("Make another movie? (Y/N or click)", 50, y); }
    }
}

// Corrected Game Over draw function
function drawStateGameOver(message) {
    background(0);
    textAlign(CENTER, CENTER);

    fill(255, 0, 0);
    textSize(32);
    let titleY = height * 0.4;
    text("GAME OVER", width / 2, titleY);

    textSize(16);
    fill(255);
    let messageY = titleY + 60;
    text(message, width / 2, messageY); // Use internal \n

    let restartY = height * 0.8;
    text("Press 'R' to restart", width / 2, restartY);

    textAlign(LEFT, TOP);
}


function drawBudgetInfo(startY) {
    let y = startY;
    let totalCost = getTotalCost();
    let remaining = currentMovie.budget - totalCost;
    // Apply rounding
    text("Total cost so far: $" + Math.round(totalCost).toLocaleString(), 50, y);
    y += 20;
    fill(remaining >= 0 ? 255 : color(255, 100, 100));
    text("Remaining budget: $" + Math.round(remaining).toLocaleString(), 50, y);
    fill(255);
}

/*************************
 * INPUT HANDLERS (Keyboard & Mouse)
 *************************/

function keyPressed() {
  console.log("Key pressed: key=" + key + ", keyCode=" + keyCode + ", state=" + state);
  player.errorMsg = "";
  if (key.toLowerCase() === 'r') { resetGame(); return; }
  if (state >= STATE_GAME_OVER_BANKRUPT) return;

  switch (state) {
    case STATE_WELCOME: handleKeyWelcome(); break;
    case STATE_CHOOSE_PLOT: handleKeyChoosePlot(); break;
    case STATE_CHOOSE_SCRIPT: handleKeyChooseScript(); break;
    case STATE_CHOOSE_DIRECTOR: handleKeyChooseDirector(); break;
    case STATE_CHOOSE_ACTOR: handleKeyChooseActor(); break;
    case STATE_SET_SFX: handleKeySetSFX(); break;
    case STATE_SET_MARKETING: handleKeySetMarketing(); break;
    case STATE_LOAN_OFFER: handleKeyLoanOffer(); break;
    case STATE_SHOW_RESULTS: handleKeyShowResults(); break;
  }
}

function mousePressed() {
  console.log("Mouse pressed: x=" + mouseX + ", y=" + mouseY + ", state=" + state);
  player.errorMsg = "";
  if (state >= STATE_GAME_OVER_BANKRUPT) return;

  switch (state) {
    case STATE_WELCOME: handleMouseWelcome(); break;
    case STATE_CHOOSE_PLOT: handleMouseChoosePlot(); break;
    case STATE_CHOOSE_SCRIPT: handleMouseChooseScript(); break;
    case STATE_CHOOSE_DIRECTOR: handleMouseChooseDirector(); break;
    case STATE_CHOOSE_ACTOR: handleMouseChooseActor(); break;
    case STATE_SET_SFX: handleMouseSetSFX(); break;
    case STATE_SET_MARKETING: handleMouseSetMarketing(); break;
    case STATE_LOAN_OFFER: handleMouseLoanOffer(); break;
    case STATE_SHOW_RESULTS: handleMouseShowResults(); break;
  }
}

// --- Standard Input Handlers ---
function handleKeyWelcome() { if (keyCode === ENTER) { goToState(STATE_CHOOSE_PLOT); } }
function handleMouseWelcome() { if (mouseX > 50 && mouseX < 300 && mouseY > 100 && mouseY < 130) { goToState(STATE_CHOOSE_PLOT); } }
function handleKeyChoosePlot() { if (key >= '1' && key <= String(plots.length)) { selectPlot(int(key) - 1); } else { player.errorMsg = "Please press 1-" + plots.length; } }
function handleMouseChoosePlot() { if (mouseX > 50 && mouseX < 400) { let baseY = 130; plots.forEach((plot, i) => { if (mouseY > baseY + i * 20 && mouseY < baseY + (i + 1) * 20) { selectPlot(i); } }); } }
function handleKeyChooseScript() { if (currentMovie.scripts && key >= '1' && key <= String(currentMovie.scripts.length)) { checkBudgetAndSelect('script', int(key) - 1); } else { player.errorMsg = "Please press 1-" + (currentMovie.scripts?.length || 0); } }
function handleMouseChooseScript() { if (mouseX > 50 && mouseX < 750 && currentMovie.scripts) { let y = 130; for (let i = 0; i < currentMovie.scripts.length; i++) { let script = currentMovie.scripts[i]; let line = (i + 1) + ": " + script.displayText + " (Cost: $" + script.cost.toLocaleString() + ")"; let h = getTextHeight(line, 700) + 10; if (mouseY > y && mouseY < y + h) { checkBudgetAndSelect('script', i); break; } y += h; } } }
function handleKeyChooseDirector() { let choice = -2; if (key === '0') { choice = -1; } else if (currentMovie.availableDirectors && key >= '1' && key <= String(currentMovie.availableDirectors.length)) { choice = int(key) - 1; } if (choice !== -2) { checkBudgetAndSelect('director', choice); } else { player.errorMsg = "Press 0 or 1-" + (currentMovie.availableDirectors?.length || 0); } }
function handleMouseChooseDirector() { if (mouseX > 50 && mouseX < 600 && currentMovie.availableDirectors) { let baseY = 130; if (mouseY > baseY && mouseY < baseY + 25) { checkBudgetAndSelect('director', -1); return; } baseY += 25; currentMovie.availableDirectors.forEach((director, i) => { if (mouseY > baseY + i * 25 && mouseY < baseY + (i + 1) * 25) { checkBudgetAndSelect('director', i); } }); } }
function handleKeyChooseActor() { if (currentMovie.availableActors && key >= '1' && key <= String(currentMovie.availableActors.length)) { checkBudgetAndSelect('actor', int(key) - 1); } else { player.errorMsg = "Please press 1-" + (currentMovie.availableActors?.length || 0); } }
function handleMouseChooseActor() { if (mouseX > 50 && mouseX < 600 && currentMovie.availableActors) { let baseY = 130; currentMovie.availableActors.forEach((actor, i) => { if (mouseY > baseY + i * 25 && mouseY < baseY + (i + 1) * 25) { checkBudgetAndSelect('actor', i); } }); } }
function handleKeySetSFX() { if (key >= '1' && key <= String(currentMovie.sfxBudgetOptions.length)) { checkBudgetAndSelect('sfx', int(key) - 1); } else if (currentMovie.sfxBudgetOptions.length === 0) { checkBudgetAndSelect('sfx', -1); } else { player.errorMsg = "Please press 1-" + currentMovie.sfxBudgetOptions.length; } }
function handleMouseSetSFX() { if (mouseX > 50 && mouseX < 400) { let baseY = 130; currentMovie.sfxBudgetOptions.forEach((cost, i) => { if (mouseY > baseY + i * 20 && mouseY < baseY + (i + 1) * 20) { checkBudgetAndSelect('sfx', i); } }); } else if (currentMovie.sfxBudgetOptions.length === 0 && mouseY > 110 && mouseY < 150) { checkBudgetAndSelect('sfx', -1); } }
function handleKeySetMarketing() { if (key >= '1' && key <= String(currentMovie.marketingBudgetOptions.length)) { checkBudgetAndSelect('marketing', int(key) - 1); } else if (currentMovie.marketingBudgetOptions.length === 0) { checkBudgetAndSelect('marketing', -1); } else { player.errorMsg = "Please press 1-" + currentMovie.marketingBudgetOptions.length; } }
function handleMouseSetMarketing() { if (mouseX > 50 && mouseX < 400) { let baseY = 130; currentMovie.marketingBudgetOptions.forEach((cost, i) => { if (mouseY > baseY + i * 20 && mouseY < baseY + (i + 1) * 20) { checkBudgetAndSelect('marketing', i); } }); } else if (currentMovie.marketingBudgetOptions.length === 0 && mouseY > 110 && mouseY < 150) { checkBudgetAndSelect('marketing', -1); } }

// Updated results handlers
function handleKeyShowResults() {
    if (movieResult.revealPhase === 9) {
        if (player.isBankrupt) { triggerGameOverState(); }
        else {
            if (key.toLowerCase() === 'y') { goToState(STATE_CHOOSE_PLOT); }
            else if (key.toLowerCase() === 'n') { goToState(STATE_WELCOME); }
            else { player.errorMsg = "Please press Y or N!"; }
        }
    }
}
function handleMouseShowResults() {
     if (movieResult.revealPhase === 9) {
        if (player.isBankrupt) { triggerGameOverState(); }
        else {
             if (mouseX > 50 && mouseX < 350 && mouseY > 700 && mouseY < 750) { goToState(STATE_CHOOSE_PLOT); }
         }
     }
}

function handleKeyLoanOffer() {
    if (key === '1') { acceptLoan('mob'); }
    else if (key === '2') { acceptLoan('cia'); }
    else if (key === '3') { acceptLoan('foreign'); }
    else if (key.toLowerCase() === 'n') { rejectLoan(); }
    else { player.errorMsg = "Please press 1, 2, 3, or N."; }
}

function handleMouseLoanOffer() {
    let y = 130;
    if (mouseX > 50 && mouseX < 400) {
        if (mouseY > y && mouseY < y + 60) { acceptLoan('mob'); return; }
        y += 90;
        if (mouseY > y && mouseY < y + 80) { acceptLoan('cia'); return; }
        y += 110;
        if (mouseY > y && mouseY < y + 80) { acceptLoan('foreign'); return; }
        y += 110;
        if (mouseY > y && mouseY < y + 30) { rejectLoan(); return; }
    }
}

function triggerGameOverState() {
     console.log("Triggering Game Over State. Type:", player.bankruptcyType);
     if (player.bankruptcyType === 'mob') goToState(STATE_GAME_OVER_MOB);
     else if (player.bankruptcyType === 'cia') goToState(STATE_GAME_OVER_CIA);
     else if (player.bankruptcyType === 'foreign') goToState(STATE_GAME_OVER_FOREIGN);
     else goToState(STATE_GAME_OVER_BANKRUPT); // Default to normal bankruptcy
}

/*************************
 * CORE LOGIC FUNCTIONS
 *************************/

function checkBudgetAndSelect(itemType, index) {
    let itemCost = 0;
    let potentialPenalty = 0;
    let nextState = state + 1;

    switch (itemType) {
        case 'script':
            if (!currentMovie.scripts || index < 0 || index >= currentMovie.scripts.length) { player.errorMsg = "Invalid script choice."; return; }
            itemCost = currentMovie.scripts[index].cost;
            potentialPenalty = currentMovie.scripts[index].penalty;
            nextState = STATE_CHOOSE_DIRECTOR;
            break;
        case 'director':
             if (!currentMovie.availableDirectors || (index < -1 || index >= currentMovie.availableDirectors.length)) { player.errorMsg = "Invalid director choice."; return; }
            itemCost = (index >= 0) ? currentMovie.availableDirectors[index].cost : 0;
            // Assign penalty based on director *quality* index, not list index
             if (index >= 0) {
                let directorQualityIndex = directors.findIndex(d => d.name === currentMovie.availableDirectors[index].name);
                 // Example: Penalize lower-indexed directors in the main list (usually cheaper/less skilled)
                 if (directorQualityIndex >= 5 && directorQualityIndex <= 10) { // Example indices for penalty risk
                     potentialPenalty = assignPenalty();
                 }
            }
            nextState = STATE_CHOOSE_ACTOR;
            break;
        case 'actor':
             if (!currentMovie.availableActors || index < 0 || index >= currentMovie.availableActors.length) { player.errorMsg = "Invalid actor choice."; return; }
            itemCost = currentMovie.availableActors[index].cost;
             // Assign penalty based on actor *quality* index, not list index
             if (index >= 0) {
                let actorQualityIndex = actors.findIndex(a => a.name === currentMovie.availableActors[index].name);
                 // Example: Penalize lower star power or certain indices
                 if (actorQualityIndex >= 3 && actorQualityIndex <= 8) { // Example indices for penalty risk
                     potentialPenalty = assignPenalty();
                 }
            }
            nextState = STATE_SET_SFX;
            break;
        case 'sfx':
            if (index === -1 || currentMovie.sfxBudgetOptions.length === 0) itemCost = 0;
            else if (index < 0 || index >= currentMovie.sfxBudgetOptions.length) { player.errorMsg = "Invalid SFX choice."; return; }
            else itemCost = currentMovie.sfxBudgetOptions[index];
            potentialPenalty = ((index === 0 && itemCost > 0) || itemCost === 0) ? assignGuaranteedPenalty() : 0; // Penalize lowest/no option
            nextState = STATE_SET_MARKETING;
            break;
        case 'marketing':
             if (index === -1 || currentMovie.marketingBudgetOptions.length === 0) itemCost = 0;
            else if (index < 0 || index >= currentMovie.marketingBudgetOptions.length) { player.errorMsg = "Invalid Marketing choice."; return; }
            else itemCost = currentMovie.marketingBudgetOptions[index];
             potentialPenalty = ((index === 0 && itemCost > 0) || itemCost === 0) ? assignGuaranteedPenalty() : 0; // Penalize lowest/no option
            nextState = STATE_CALCULATE_RESULTS;
            break;
        default:
            console.error("Unknown item type in checkBudgetAndSelect:", itemType); return;
    }

    let costBeforeThisItem = 0;
    if (itemType !== 'script' && currentMovie.scriptIndex >= 0) costBeforeThisItem += currentMovie.scripts[currentMovie.scriptIndex]?.cost ?? 0;
    if (itemType !== 'director' && currentMovie.directorIndex >= 0 && currentMovie.availableDirectors[currentMovie.directorIndex]) costBeforeThisItem += currentMovie.availableDirectors[currentMovie.directorIndex]?.cost ?? 0;
    if (itemType !== 'actor' && currentMovie.actorIndex >= 0 && currentMovie.availableActors[currentMovie.actorIndex]) costBeforeThisItem += currentMovie.availableActors[currentMovie.actorIndex]?.cost ?? 0;
    if (itemType !== 'sfx') costBeforeThisItem += currentMovie.specialEffectsCost;
    if (itemType !== 'marketing') costBeforeThisItem += currentMovie.marketingCost;

    let potentialTotalCost = costBeforeThisItem + itemCost;
     console.log(`Checking Budget: Item=${itemType}, Index=${index}, ItemCost=${itemCost}, CostBefore=${costBeforeThisItem}, PotentialTotal=${potentialTotalCost}, Budget=${currentMovie.budget}`);

    if (potentialTotalCost > currentMovie.budget) {
        if (!currentMovie.loanTaken) {
            console.log(`Budget exceeded! Triggering loan.`);
            currentMovie.previousStateBeforeLoan = state;
            currentMovie.pendingSelectionIndex = index;
            currentMovie.pendingSelectionType = itemType;
            goToState(STATE_LOAN_OFFER);
        } else {
            console.log("Loan already taken ("+ currentMovie.lender +"), allowing selection despite budget indicator.");
            finalizeSelection(itemType, index, itemCost, potentialPenalty);
            goToState(nextState);
        }
    } else {
        finalizeSelection(itemType, index, itemCost, potentialPenalty);
        goToState(nextState);
    }
}


function finalizeSelection(itemType, index, itemCost, penalty) {
     console.log("Finalizing selection:", itemType, index, "Cost:", itemCost, "Penalty:", penalty);
     switch (itemType) {
        case 'script':
            if (currentMovie.scripts && currentMovie.scripts[index]){
                currentMovie.scriptIndex = index;
                currentMovie.selectedScriptTemplate = currentMovie.scripts[index].template;
                currentMovie.chosenHero = currentMovie.scripts[index].hero;
                 // Assign penalty from script data
                 currentMovie.scripts[index].penalty = (currentMovie.scripts[index].potentialPenalty) ? assignPenalty() : 0;
            } else { console.error("Error finalizing script selection: Invalid index or scripts array."); }
            break;
        case 'director':
             if (index === -1 || (currentMovie.availableDirectors && currentMovie.availableDirectors[index])) {
                currentMovie.directorIndex = index;
                currentMovie.directorPenalty = penalty; // Penalty was calculated in checkBudgetAndSelect
             } else { console.error("Error finalizing director selection: Invalid index or availableDirectors array.");}
            break;
        case 'actor':
             if (currentMovie.availableActors && currentMovie.availableActors[index]){
                currentMovie.actorIndex = index;
                currentMovie.actorPenalty = penalty; // Penalty was calculated in checkBudgetAndSelect
             } else { console.error("Error finalizing actor selection: Invalid index or availableActors array.");}
            break;
        case 'sfx':
            currentMovie.specialEffectsCost = itemCost;
            currentMovie.specialEffectsPenalty = penalty; // Penalty was calculated in checkBudgetAndSelect
            break;
        case 'marketing':
            currentMovie.marketingCost = itemCost;
            currentMovie.marketingPenalty = penalty; // Penalty was calculated in checkBudgetAndSelect
            break;
        default:
             console.error("Unknown item type in finalizeSelection:", itemType);
    }
}

function acceptLoan(lenderType) {
    console.log("Loan accepted from:", lenderType);
    currentMovie.loanTaken = true;
    currentMovie.lender = lenderType;
    player.errorMsg = `Financing secured from ${lenderType === 'cia' ? 'the CIA' : (lenderType === 'mob' ? 'the Mob' : 'Foreign Investors')}!`;

    // Re-run checkBudgetAndSelect for the pending item, now that loan is taken
    // This ensures the itemCost and penalty are recalculated correctly if needed
    let itemType = currentMovie.pendingSelectionType;
    let index = currentMovie.pendingSelectionIndex;

     // Clear pending state *before* re-checking budget
    currentMovie.pendingSelectionIndex = -1;
    currentMovie.pendingSelectionType = null;
    currentMovie.previousStateBeforeLoan = null;

    checkBudgetAndSelect(itemType, index); // This will now call finalizeSelection and goToState

}

function rejectLoan() {
    console.log("Loan rejected.");
    player.errorMsg = "Loan rejected. Cannot afford selection.";
    let previousState = currentMovie.previousStateBeforeLoan;
    currentMovie.pendingSelectionIndex = -1; currentMovie.pendingSelectionType = null; currentMovie.previousStateBeforeLoan = null;
    if (previousState !== null && previousState >= 0) { goToState(previousState); }
    else { goToState(STATE_WELCOME); } // Fallback if state is weird
}


function getTotalCost() {
  let scriptCost = (currentMovie.scriptIndex >= 0 && currentMovie.scripts && currentMovie.scripts[currentMovie.scriptIndex]) ? currentMovie.scripts[currentMovie.scriptIndex].cost : 0;
  let directorCost = (currentMovie.directorIndex >= 0 && currentMovie.availableDirectors && currentMovie.availableDirectors[currentMovie.directorIndex]) ? currentMovie.availableDirectors[currentMovie.directorIndex].cost : 0;
  let actorCost = (currentMovie.actorIndex >= 0 && currentMovie.availableActors && currentMovie.availableActors[currentMovie.actorIndex]) ? currentMovie.availableActors[currentMovie.actorIndex].cost : 0;
  return scriptCost + directorCost + actorCost + currentMovie.specialEffectsCost + currentMovie.marketingCost;
}
function calculateDynamicBudget(currentCash) {
    // Ensure budget doesn't drop too low, maybe minimum $1M?
    let calculated = player.moviesCompleted === 0 ? 5000000 : Math.round(currentCash * 0.5);
    return max(1000000, calculated); // Minimum budget of $1M after first movie
}
function assignPenalty() { return (random(1) < 0.5) ? -floor(random(abs(MAX_PENALTY_VALUE), abs(MIN_PENALTY_VALUE) + 1)) : 0; }
function assignGuaranteedPenalty() { return -floor(random(abs(MAX_PENALTY_VALUE), abs(MIN_PENALTY_VALUE) + 1)); }

function selectRandomDirectors() {
  let baseDirectors = player.unlockedJohnHughes ? [...directors] : directors.filter(d => d.name !== "John Hughes");
  if (player.unlockedJohnHughes && !baseDirectors.find(d => d.name === "John Hughes")) { baseDirectors.push(SECRET_DIRECTOR); }
  let sortedDirectors = [...baseDirectors].sort((a, b) => a.cost - b.cost);
  let numDirs = sortedDirectors.length; if (numDirs === 0) { currentMovie.availableDirectors = []; console.log("No directors available!"); return; }
  let third = Math.max(1, Math.floor(numDirs / 3)); let lowCostThreshold = sortedDirectors[Math.min(third - 1, numDirs - 1)].cost; let highCostThreshold = sortedDirectors[Math.min(2 * third - 1, numDirs - 1)].cost;
  let lowCost = sortedDirectors.filter(d => d.cost <= lowCostThreshold); let mediumCost = sortedDirectors.filter(d => d.cost > lowCostThreshold && d.cost <= highCostThreshold); let highCost = sortedDirectors.filter(d => d.cost > highCostThreshold);
  // Try to get a mix, ensuring some cheaper options if available
  currentMovie.availableDirectors = [
      ...shuffle(lowCost).slice(0, 3),   // More low cost
      ...shuffle(mediumCost).slice(0, 3), // Medium cost
      ...shuffle(highCost).slice(0, 2)    // Fewer high cost
  ].sort(() => 0.5 - random()); // Shuffle final list
   // Ensure list isn't too long if pools were small
   currentMovie.availableDirectors = currentMovie.availableDirectors.slice(0, 8);
  console.log("Available Directors:", currentMovie.availableDirectors.map(d => d.name));
}

function selectRandomActors() {
  let sortedActors = [...actors].sort((a, b) => a.cost - b.cost);
  let numActors = sortedActors.length; if (numActors === 0) { currentMovie.availableActors = []; console.log("No actors available!"); return; }
  let third = Math.max(1, Math.floor(numActors / 3)); let lowCostThreshold = sortedActors[Math.min(third - 1, numActors - 1)].cost; let highCostThreshold = sortedActors[Math.min(2 * third - 1, numActors - 1)].cost;
  let lowCost = sortedActors.filter(a => a.cost <= lowCostThreshold); let mediumCost = sortedActors.filter(a => a.cost > lowCostThreshold && a.cost <= highCostThreshold); let highCost = sortedActors.filter(a => a.cost > highCostThreshold);
    currentMovie.availableActors = [
      ...shuffle(lowCost).slice(0, 3),
      ...shuffle(mediumCost).slice(0, 3),
      ...shuffle(highCost).slice(0, 2)
  ].sort(() => 0.5 - random()); // Shuffle final list
   // Ensure list isn't too long
   currentMovie.availableActors = currentMovie.availableActors.slice(0, 8);
   console.log("Available Actors:", currentMovie.availableActors.map(a => a.name));
}

function shuffle(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; }
function getTextHeight(txt, maxWidth) { let words = String(txt).split(' '); if (words.length === 0 || words[0] === '') return textSize() * 1.2; let lines = [words[0]]; for (let i = 1; i < words.length; i++) { let testLine = lines[lines.length - 1] + ' ' + words[i]; if (textWidth(testLine) > maxWidth && lines[lines.length - 1] !== '') { lines.push(words[i]); } else { lines[lines.length - 1] = testLine; } } let leading = textLeading() || (textSize() * 1.25); return lines.length * leading; }
function generateCreativeTitle() {
    let actorName = (currentMovie.actorIndex >= 0 && currentMovie.availableActors && currentMovie.availableActors[currentMovie.actorIndex]) ? currentMovie.availableActors[currentMovie.actorIndex].name : "Nobody";
    let plotType = (currentMovie.plotIndex >= 0 && plots[currentMovie.plotIndex]) ? plots[currentMovie.plotIndex].type : "Mystery";
    let isSerious = random(1) < 0.8;
    const seriousTitleFormats = ["[Actor]'s [Adjective] [Object]", "[PlotType] Threat", "[Villain]'s Scheme", "[Adjective] Mission"];
    const absurdTitleFormats = ["[Actor]'s [Adjective] [Object]", "[Adjective] [Goal]", "[Villain] [Twist]", "[PlotType] Chaos"];
    const eightiesTitleFormats = ["[ActorPossessive] [Trope] [Adjective]", "[Trope] [PlotType] Unleashed", "Revenge of [Actor]", "[PlotType] of [Trope]", "[Actor] vs. [Trope]"];
    let adjectives = isSerious ? getSeriousAdjectives(currentMovie.plotIndex) : getAbsurdAdjectives(currentMovie.plotIndex);
    let objects = getObjectsForPlot(currentMovie.plotIndex, isSerious);
    let twists = isSerious ? getSeriousTwists(currentMovie.plotIndex) : getAbsurdTwists(currentMovie.plotIndex);
    let villains = isSerious ? getSeriousVillains(currentMovie.plotIndex) : getAbsurdVillains(currentMovie.plotIndex);
    let goals = isSerious ? getSeriousGoals(currentMovie.plotIndex) : getAbsurdGoals(currentMovie.plotIndex);
    let format = random((random(1) < 0.33) ? eightiesTitleFormats : (isSerious ? seriousTitleFormats : absurdTitleFormats));
    let actorLastName = actorName.split(" ").pop() || actorName;
    let actorPossessive = actorLastName.endsWith("s") ? actorLastName + "'" : actorLastName + "'s";
    let chosenTrope = random(eightiesTropes);
    let generated = format.replace(/\[Actor\]/g, actorLastName).replace(/\[ActorPossessive\]/g, actorPossessive).replace(/\[PlotType\]/g, plotType.split(" ")[0]).replace(/\[Adjective\]/g, random(adjectives)).replace(/\[Object\]/g, random(objects)).replace(/\[Villain\]/g, random(villains)).replace(/\[Twist\]/g, random(twists)).replace(/\[Goal\]/g, random(goals)).replace(/\[Trope\]/g, chosenTrope);
    generated = generated.charAt(0).toUpperCase() + generated.slice(1);
    if (random(1) < 0.2) { let catchphrase = actorCatchphrases[actorName] || actorCatchphrases["default"]; generated = actorLastName + " says " + catchphrase + " in '" + generated + "'"; }
    let words = generated.split(" "); if (words.length > 8) { generated = words.slice(0, 8).join(" ") + "..."; } return generated;
}

function checkForEraEvent() {
  movieResult.revenueMultiplier = 1.0; movieResult.openingWeekPenalty = 1.0; movieResult.eraEventMsg = "";
  let possibleEvents = shuffle([...eraEvents]);
  for (let ev of possibleEvents) {
    if (currentMovie.plotIndex >=0 && currentMovie.plotIndex < plots.length && ev.trigger(currentMovie.plotIndex)) {
      ev.effect(); movieResult.eraEventMsg = ev.message; break;
    }
  }
}

function calculateMovieResults() {
    movieResult.penaltyReasons = []; movieResult.success_score = 0;
    movieResult.revenues = []; movieResult.total_revenue = 0; movieResult.profit = 0; movieResult.oscar_status = OSCAR_STATUS_NONE; movieResult.successTier = ""; movieResult.motivationalMessage = ""; movieResult.finalScript = ""; movieResult.title = "";

    let originalSfxCost = currentMovie.specialEffectsCost;
    let originalSfxPenalty = currentMovie.specialEffectsPenalty;
    checkForEraEvent();

    if (movieResult.eraEventMsg && movieResult.eraEventMsg.includes("EXPLOSIONS")) {
        if (currentMovie.specialEffectsCost > originalSfxCost) { movieResult.penaltyReasons.push("Studio meddling forced SFX cost to double!"); }
        else if (currentMovie.specialEffectsPenalty !== originalSfxPenalty) { movieResult.penaltyReasons.push("Resisted studio demands, but SFX suffered!"); }
    }

    let baseScore = 0; let genreSynergyModifier = 0;
    const movieGenre = currentMovie.plotIndex >= 0 ? plots[currentMovie.plotIndex].genreType : null;

    if (currentMovie.plotIndex >= 0) { baseScore += plots[currentMovie.plotIndex].appeal; }
    if (currentMovie.scriptIndex >= 0 && currentMovie.scripts[currentMovie.scriptIndex]) { baseScore += currentMovie.scripts[currentMovie.scriptIndex].quality; }
    baseScore += Math.floor(currentMovie.specialEffectsCost / 100000);
    baseScore += Math.floor(currentMovie.marketingCost / 200000);
    baseScore += floor(random(0, 11));

    if (currentMovie.directorIndex >= 0 && currentMovie.availableDirectors[currentMovie.directorIndex]) {
        const director = currentMovie.availableDirectors[currentMovie.directorIndex];
        baseScore += director.boost;
        if (movieGenre && director.preferredGenres?.includes(movieGenre)) { genreSynergyModifier += GENRE_SYNERGY_BONUS; movieResult.penaltyReasons.push(`${director.name} loves ${movieGenre}!`); }
        else if (movieGenre && director.hatedGenres?.includes(movieGenre)) { genreSynergyModifier += GENRE_SYNERGY_PENALTY; movieResult.penaltyReasons.push(`${director.name} hates ${movieGenre}!`); }
    }
    if (currentMovie.actorIndex >= 0 && currentMovie.availableActors[currentMovie.actorIndex]) {
        const actor = currentMovie.availableActors[currentMovie.actorIndex];
        baseScore += actor.starPower;
        if (movieGenre && actor.preferredGenres?.includes(movieGenre)) { genreSynergyModifier += GENRE_SYNERGY_BONUS; movieResult.penaltyReasons.push(`${actor.name} shines in ${movieGenre}!`); }
        else if (movieGenre && actor.hatedGenres?.includes(movieGenre)) { genreSynergyModifier += GENRE_SYNERGY_PENALTY; movieResult.penaltyReasons.push(`${actor.name} miscast in ${movieGenre}!`); }
    }
    baseScore += genreSynergyModifier;

    let totalPenalty = 0;
    // Ensure script penalty is accessed correctly
    let scriptPenaltyVal = 0;
    if (currentMovie.scriptIndex >= 0 && currentMovie.scripts && currentMovie.scripts[currentMovie.scriptIndex]) {
        scriptPenaltyVal = currentMovie.scripts[currentMovie.scriptIndex].penalty ?? 0;
    }
    let penaltySources = [
        { value: scriptPenaltyVal, reason: "Risky script backfired" },
        { value: currentMovie.directorPenalty, reason: "Director meltdown on set" },
        { value: currentMovie.actorPenalty, reason: "Actor flubbed lines" },
        { value: currentMovie.specialEffectsPenalty, reason: "Cheap effects fizzled" },
        { value: currentMovie.marketingPenalty, reason: "Marketing fiasco" }
    ];
    if (currentMovie.loanTaken && currentMovie.lender === 'cia') {
        penaltySources.push({ value: LOAN_CIA_PENALTY, reason: "CIA meddling inserted propaganda" });
    }
    if (currentMovie.isUnderForeignControl) {
         penaltySources.push({ value: assignGuaranteedPenalty(), reason: "Foreign investors interfered with production"});
    }
    penaltySources.forEach(source => {
        if (source.value < 0) { movieResult.penaltyReasons.push(`${source.reason}!`); totalPenalty += source.value; }
    });
    movieResult.success_score = baseScore + totalPenalty;

    // --- Revenue Calculation ---
    let calculatedBudget = getTotalCost(); let effectiveBudget = Math.max(1, calculatedBudget);
    let scoreRatio = constrain(movieResult.success_score / MAX_POSSIBLE_SCORE, 0, 1);
    let initial_revenue = max(0, scoreRatio * MAX_REVENUE_POTENTIAL * INITIAL_WEEK_FRACTION); // Apply max(0, ...)

    let weeklyRevenue = initial_revenue; movieResult.total_revenue = 0; movieResult.revenues = [];
    for (let week = 1; week <= 12; week++) {
        let currentWeekRevenue = weeklyRevenue;
        if (week === 1) { currentWeekRevenue *= movieResult.openingWeekPenalty; }
        currentWeekRevenue *= movieResult.revenueMultiplier;
        movieResult.revenues.push(max(0, currentWeekRevenue)); // Ensure non-negative
        movieResult.total_revenue += max(0, currentWeekRevenue); // Add non-negative
        weeklyRevenue *= 0.667;
    }
    if(movieResult.revenueMultiplier !== 1.0 && !(movieResult.eraEventMsg && movieResult.eraEventMsg.includes("MTV"))) { movieResult.penaltyReasons.push(`Special event revenue modifier applied!`); }
    if(movieResult.openingWeekPenalty !== 1.0 && !(movieResult.eraEventMsg && movieResult.eraEventMsg.includes("competition"))) { movieResult.penaltyReasons.push(`Opening week competition modifier applied!`);}


    // --- Foreign Control High Flop Chance ---
    let forcedFlop = false;
    if (currentMovie.isUnderForeignControl) {
         if (random(1) < LOAN_FOREIGN_FLOP_CHANCE) {
             console.log("Foreign control triggered high flop chance!");
             forcedFlop = true;
             if (!movieResult.penaltyReasons.some(r => r.includes("interfered"))) { movieResult.penaltyReasons.push("Foreign investors interfered with production!"); }
             movieResult.penaltyReasons.push(`Foreign investors sabotaged the production! Movie flopped!`);

             let targetTotalRevenue = effectiveBudget * random(0.10, 0.35); // Target based on budget %
             movieResult.oscar_status = OSCAR_STATUS_FLOP;
             movieResult.revenues = []; // Clear previous calculation
             let numWeeks = 12; let decayFactor = 0.667;
             let seriesSumFactor = (1 - Math.pow(decayFactor, numWeeks)) / (1 - decayFactor);
             let firstWeekRevenue = (seriesSumFactor !== 0 && isFinite(seriesSumFactor)) ? targetTotalRevenue / seriesSumFactor : 0;
             firstWeekRevenue = max(1, firstWeekRevenue); // Ensure first week is at least $1 for calculation base
             let currentFlopRevenue = firstWeekRevenue;
             let accumulatedRevenue = 0;

             for (let week = 1; week <= numWeeks; week++) {
                 let weekRev = max(1, currentFlopRevenue); // Ensure minimum $1 for calculation/storage
                 movieResult.revenues.push(weekRev);
                 accumulatedRevenue += weekRev; // Sum the (potentially clamped) values
                 currentFlopRevenue *= decayFactor;
             }

             // Adjust revenues proportionally to try and match the original targetTotalRevenue, while maintaining the $1 minimum
             let adjustmentRatio = (accumulatedRevenue !== 0 && isFinite(accumulatedRevenue)) ? targetTotalRevenue / accumulatedRevenue : 1;
             if (isFinite(adjustmentRatio) && adjustmentRatio > 0) { // Only adjust if ratio is valid and positive
                let adjustedSum = 0;
                movieResult.revenues = movieResult.revenues.map(r => {
                     let adjusted = max(1, r * adjustmentRatio); // Ensure minimum $1 after adjustment
                     adjustedSum += adjusted;
                     return adjusted;
                });
                 movieResult.total_revenue = adjustedSum; // Final total is the sum of adjusted (and clamped) weeks
             } else {
                  // Fallback: if adjustment fails, the total is just the sum of the $1 minimums
                  movieResult.total_revenue = movieResult.revenues.reduce((sum, r) => sum + r, 0);
             }
              // Profit is calculated later based on final total_revenue
         }
    }


    // Oscar Logic (Skip if forced flop)
    if (!forcedFlop) {
        movieResult.oscar_status = OSCAR_STATUS_NONE;
        if (movieResult.success_score > 80 && random(1) < 0.5) {
            movieResult.oscar_status = OSCAR_STATUS_NOMINATED;
            if (random(1) < 0.2) {
                movieResult.oscar_status = OSCAR_STATUS_WIN; movieResult.penaltyReasons.push("Oscar Win! Extended Box Office Run!");
                let bonusRevenue = (movieResult.revenues[11] ?? 0) * 0.667; // Base bonus on last week of normal run
                for (let week = 13; week <= 16; week++) {
                    let currentWeekBonus = bonusRevenue * movieResult.revenueMultiplier; // Apply multiplier if active
                    let bonusToAdd = max(1, currentWeekBonus); // Ensure at least $1 bonus
                    movieResult.revenues.push(bonusToAdd);
                    movieResult.total_revenue += bonusToAdd; // Add directly to total
                    bonusRevenue *= 0.667; // Decay for next bonus week
                }
                if (!player.unlockedJohnHughes) { player.unlockedJohnHughes = true; if (!directors.find(d => d.name === "John Hughes")) { directors.push(SECRET_DIRECTOR); } movieResult.penaltyReasons.push("Milestone: John Hughes unlocked as a secret director!"); }
            } else { movieResult.penaltyReasons.push("Oscar Nomination! Good buzz!"); }
        }
    }

     // --- Normal Flop Check --- (Skip if forced flop or Oscar win)
    if (!forcedFlop && movieResult.oscar_status !== OSCAR_STATUS_WIN) {
        let currentPenalties = penaltySources.map(p => p.value);
        // More sensitive flop chance based on penalties
        let penaltySum = Math.abs(currentPenalties.reduce((sum, p) => sum + (p < 0 ? p : 0), 0));
        let flopChance = constrain(0.05 + currentPenalties.filter(p => p < 0).length * 0.08 + penaltySum * 0.008, 0.05, 0.85);
         console.log("Flop Check - Penalties:", currentPenalties, "Penalty Sum:", penaltySum, "Flop Chance:", flopChance);


        if (random(1) < flopChance) {
             console.log("Normal flop triggered!");
             if (!movieResult.penaltyReasons.some(r => r.includes("sabotaged"))) { // Avoid duplicate message
                movieResult.penaltyReasons.push(`Critical Failure! Movie flopped!`);
             }

            let targetTotalRevenue = effectiveBudget * random(0.15, 0.65); // Target based on budget %
            movieResult.oscar_status = OSCAR_STATUS_FLOP;
            movieResult.revenues = []; // Clear previous calculation
            let numWeeks = 12; let decayFactor = 0.667;
            let seriesSumFactor = (1 - Math.pow(decayFactor, numWeeks)) / (1 - decayFactor);
            let firstWeekRevenue = (seriesSumFactor !== 0 && isFinite(seriesSumFactor)) ? targetTotalRevenue / seriesSumFactor : 0;
            firstWeekRevenue = max(1, firstWeekRevenue); // Ensure first week is at least $1 for calculation base
            let currentFlopRevenue = firstWeekRevenue;
            let accumulatedRevenue = 0;

            for (let week = 1; week <= numWeeks; week++) {
                let weekRev = max(1, currentFlopRevenue); // Ensure minimum $1 for calculation/storage
                movieResult.revenues.push(weekRev);
                accumulatedRevenue += weekRev; // Sum the (potentially clamped) values
                currentFlopRevenue *= decayFactor;
            }

             // Adjust revenues proportionally to try and match the original targetTotalRevenue, while maintaining the $1 minimum
            let adjustmentRatio = (accumulatedRevenue !== 0 && isFinite(accumulatedRevenue)) ? targetTotalRevenue / accumulatedRevenue : 1;
            if (isFinite(adjustmentRatio) && adjustmentRatio > 0) { // Only adjust if ratio is valid and positive
                let adjustedSum = 0;
                movieResult.revenues = movieResult.revenues.map(r => {
                     let adjusted = max(1, r * adjustmentRatio); // Ensure minimum $1 after adjustment
                     adjustedSum += adjusted;
                     return adjusted;
                 });
                movieResult.total_revenue = adjustedSum; // Final total is the sum of adjusted (and clamped) weeks
            } else {
                 // Fallback: if adjustment fails, the total is just the sum of the $1 minimums
                 movieResult.total_revenue = movieResult.revenues.reduce((sum, r) => sum + r, 0);
            }
             // Profit is calculated later based on final total_revenue
        }
    }


    // --- Profit Calculation (Recalculated AFTER potential flop adjustments) ---
    let finalTotalRevenue = movieResult.total_revenue; // Use the potentially adjusted total revenue
    let baseProfit = finalTotalRevenue - calculatedBudget;

    // --- Loan Profit Deduction ---
    let lenderShare = 0;
    let finalProfit = baseProfit; // Start with base profit

    // Lender cut is based on potential profit *before* any flop sabotage/chance reduced the *actual* revenue
    let profitBeforeFlopForCut = baseProfit; // Default case: use actual profit
    if (forcedFlop || movieResult.oscar_status === OSCAR_STATUS_FLOP) {
        // Estimate what the profit *might* have been without the flop for calculating lender cut
        let estimatedSuccessScore = baseScore + totalPenalty; // Use the calculated score
        let estimatedScoreRatio = constrain(estimatedSuccessScore / MAX_POSSIBLE_SCORE, 0, 1);
        let estimatedInitialRevenue = max(0, estimatedScoreRatio * MAX_REVENUE_POTENTIAL * INITIAL_WEEK_FRACTION);
        let estimatedTotalRevenue = 0;
        let estWeekly = estimatedInitialRevenue;
         for (let week = 1; week <= 12; week++) {
             let currentWeekEst = estWeekly;
             if (week === 1) { currentWeekEst *= movieResult.openingWeekPenalty; } // Apply penalties/boosts
             currentWeekEst *= movieResult.revenueMultiplier;
             estimatedTotalRevenue += max(0, currentWeekEst);
             estWeekly *= 0.667;
         }
        profitBeforeFlopForCut = estimatedTotalRevenue - calculatedBudget;
        console.log(`Flop detected. Estimated profit for lender cut: ${profitBeforeFlopForCut} (based on score: ${estimatedSuccessScore})`);
    }


    if (currentMovie.loanTaken && profitBeforeFlopForCut > 0) {
        let profitCutPercentage = 0;
        let lenderName = "";
        if (currentMovie.lender === 'mob') { profitCutPercentage = LOAN_MOB_CUT; lenderName = "The Mob"; }
        else if (currentMovie.lender === 'cia') { profitCutPercentage = LOAN_CIA_CUT; lenderName = "The CIA"; }
        else if (currentMovie.lender === 'foreign') { profitCutPercentage = LOAN_FOREIGN_CUT; lenderName = "Foreign Investors"; }

        lenderShare = profitBeforeFlopForCut * profitCutPercentage;
        finalProfit = baseProfit - lenderShare; // Deduct share from the *actual* base profit
        movieResult.penaltyReasons.push(`${lenderName} took their cut ($${Math.round(lenderShare).toLocaleString()}) based on potential profit!`);
    }
    movieResult.profit = finalProfit; // Set the final profit


    // --- Final Updates ---
    player.cash += movieResult.profit;
    player.cash = Math.round(player.cash); // Round cash after adding profit

    movieResult.title = generateCreativeTitle();
    let heroString = (currentMovie.scriptIndex >=0 && currentMovie.scripts[currentMovie.scriptIndex]) ? currentMovie.scripts[currentMovie.scriptIndex].hero : "an unknown hero";
    let actorNameForResult = (currentMovie.actorIndex >= 0 && currentMovie.availableActors && currentMovie.availableActors[currentMovie.actorIndex]) ? currentMovie.availableActors[currentMovie.actorIndex].name : "an unknown actor";
    let heroWithActor = heroString + " played by " + actorNameForResult;
    movieResult.finalScript = currentMovie.selectedScriptTemplate ? currentMovie.selectedScriptTemplate.replace("[hero]", heroWithActor) : "Error: Script template not found.";
    movieResult.finalScript = movieResult.finalScript.charAt(0).toUpperCase() + movieResult.finalScript.slice(1);


    determineSuccessTier(calculatedBudget); // Determine tier based on *actual* revenue vs budget

    if (currentMovie.loanTaken && currentMovie.lender === 'foreign') {
        player.foreignControlNextMovie = true;
        if (!movieResult.penaltyReasons.some(r => r.includes("sabotaged"))) { // Avoid duplicate messages
             movieResult.penaltyReasons.push("Foreign investors will control your next movie!");
        }
    }

    movieResult.revealPhase = 0; movieResult.phaseStartTime = millis(); movieResult.weekIndex = 0;
    player.moviesCompleted++;

    // --- Final Bankruptcy Check - SET FLAGS ---
    if (player.cash < 0) {
        console.log("Bankruptcy detected! Cash:", player.cash, "Loan Taken:", currentMovie.loanTaken, "Lender:", currentMovie.lender, "Profit:", movieResult.profit);
        player.isBankrupt = true;
        // Only trigger lender game over if you *lost* money *and* had their loan
        if (currentMovie.loanTaken && movieResult.profit < 0) {
             player.bankruptcyType = currentMovie.lender;
             console.log("Setting bankruptcy type to lender:", player.bankruptcyType);
        } else {
             player.bankruptcyType = 'normal'; // Normal bankruptcy otherwise
              console.log("Setting bankruptcy type to normal");
        }
    } else {
        player.isBankrupt = false;
        player.bankruptcyType = null;
    }
}


function determineSuccessTier(budgetUsed) {
  let currentGenre = (currentMovie.plotIndex >= 0 && plots[currentMovie.plotIndex]) ? plots[currentMovie.plotIndex].type : "Unknown Genre";
  let effectiveBudget = Math.max(1, budgetUsed); // Ensure budget isn't zero for division
  let revenueToBudgetRatio = (effectiveBudget > 0) ? movieResult.total_revenue / effectiveBudget : 0; // Avoid division by zero

  console.log(`Determining Tier: Revenue=${movieResult.total_revenue}, Budget=${effectiveBudget}, Ratio=${revenueToBudgetRatio}, Score=${movieResult.success_score}, Oscar=${movieResult.oscar_status}`);

  if (movieResult.oscar_status === OSCAR_STATUS_WIN || revenueToBudgetRatio >= 3) {
    movieResult.successTier = "blockbuster"; movieResult.motivationalMessage = random(["A cinematic triumph! You’ve redefined the industry!", "The world is buzzing—your masterpiece is a global sensation!", "Cue the fireworks! You’ve smashed every record in the book!", "Hollywood bows to you—a blockbuster for the ages!"]);
  } else if (revenueToBudgetRatio >= 1.5 && movieResult.success_score >= 80) {
     movieResult.successTier = "surprise_hit"; movieResult.motivationalMessage = random(["Out of nowhere, a hit! You’ve stunned the critics!", "Underdog no more—this sleeper hit’s waking up the box office!", "Who saw this coming? You’ve struck gold unexpectedly!", "A hidden gem shines bright—bravo, maestro!"]);
  } else if (revenueToBudgetRatio > 1) { // Any profit counts as mild success now
    movieResult.successTier = "mild_success"; movieResult.motivationalMessage = random(["Not bad at all! You’ve made a tidy little profit!", "A modest win—steady as she goes, captain!", "It’s a small victory, but the crowd’s still cheering!", "You’re in the black—keep the reels spinning!"]);
  } else { // If revenue <= budget, it's some kind of flop
     movieResult.successTier = "flop";
     const flopMessagesByGenre = { "Sci-Fi Adventure": "The future wasn’t bright enough!", "Teen Comedy": "No one showed up to the pep rally!", "Action Flick": "The explosions were too small!", "Horror Thriller": "The screams were silent this time!", "Romantic Drama": "All the love was lost, alas!", "Western": "The tumbleweed rolled on by, alone!", "Spy Thriller": "Mission not accomplished!", "Fantasy Epic": "The magic fizzled—no one believed!" };
     let baseFlops = ["Ouch, a rough cut! Time to rethink the script!", "The audience walked out—better luck next reel!", "A box office bomb, but every flop’s a lesson!", "Flopped hard, huh? Dust off and aim higher!"];
     let genreMsg = flopMessagesByGenre[currentGenre] || "";
     movieResult.motivationalMessage = genreMsg ? genreMsg + " " + random(baseFlops) : random(baseFlops);
  }

  // Override message if Oscar status is FLOP (can happen even if revenue technically > budget due to flop chance)
   if (movieResult.oscar_status === OSCAR_STATUS_FLOP) {
       movieResult.successTier = "flop"; // Ensure tier is flop
       if (movieResult.penaltyReasons.some(r => r.includes("sabotaged"))) {
            movieResult.motivationalMessage = "The investors weren't happy... at all. This one's a total write-off.";
       } else if (movieResult.penaltyReasons.some(r => r.includes("flopped!"))) {
           movieResult.motivationalMessage = "It wasn't just bad, it was a certified FLOP! " + random( ["Try again?", "Maybe filmmaking isn't for you?", "Oof."]);
       }
       // Keep the genre-specific flop message if neither sabotage nor critical failure message is present but Oscar is FLOP
   }
}

/*************************
 * STATE TRANSITION & RESETS
 *************************/

function goToState(newState) {
    if (state >= STATE_GAME_OVER_BANKRUPT && newState !== STATE_WELCOME) return; // Don't transition from Game Over except to Welcome (via Reset)

    console.log(`Transitioning from state ${state} to ${newState}`);
    let previousState = state;
    state = newState;
    player.errorMsg = ""; // Clear error message on state change

    switch (newState) {
        case STATE_WELCOME:
             // Only reset movie if coming from results (and not already Game Over)
             if (previousState === STATE_SHOW_RESULTS && !player.isBankrupt) {
                resetForNewMovie();
             }
             // If coming from Game Over, resetGame() was already called by 'R' key.
             break;
        case STATE_CHOOSE_PLOT:
             // If not coming from Welcome or a Game Over reset, reset the movie state.
             if (previousState !== STATE_WELCOME && previousState < STATE_GAME_OVER_BANKRUPT) {
                 resetForNewMovie();
             }
             currentMovie.budget = calculateDynamicBudget(player.cash); // Calculate budget *after* potentially resetting

             if (player.foreignControlNextMovie) {
                 console.log("Applying foreign control for this movie...");
                 player.errorMsg = "Foreign investors demand a Romantic Drama!";
                 let forcedPlotIndex = 4; // Index of "Romantic Drama"
                 currentMovie.isUnderForeignControl = true; // Flag this movie instance
                 player.foreignControlNextMovie = false; // Reset player flag now
                 selectPlot(forcedPlotIndex); // Select plot, generates scripts, advances state
                 return; // Exit early to prevent normal plot selection draw
             }
             break;
        case STATE_CHOOSE_SCRIPT:
             // Script generation happens in selectPlot
             break;
        case STATE_CHOOSE_DIRECTOR: selectRandomDirectors(); break;
        case STATE_CHOOSE_ACTOR: selectRandomActors(); break;
        case STATE_SET_SFX: calculateBudgetOptions('sfx'); break;
        case STATE_SET_MARKETING: calculateBudgetOptions('marketing'); break;
        case STATE_CALCULATE_RESULTS:
             console.log("Entering Calculate Results State...");
              // Ensure calculations run only once
             if (previousState === STATE_SET_MARKETING) {
                 calculateMovieResults();
             }
             // Immediately transition if calculation is done (or skipped)
             if (state === STATE_CALCULATE_RESULTS) {
                 goToState(STATE_SHOW_RESULTS);
             }
             break;
        case STATE_SHOW_RESULTS:
             // Ensure phase starts correctly only when entering this state
             if (previousState === STATE_CALCULATE_RESULTS) {
                 movieResult.phaseStartTime = millis();
                 movieResult.weekIndex = 0; // Reset week index for display
                 if (player.isBankrupt) {
                     // Add bankruptcy message only once
                    if (!movieResult.penaltyReasons.some(r => r.includes("BANKRUPT"))) {
                        movieResult.penaltyReasons.push("YOU ARE BANKRUPT! Press any key or click to face the consequences...");
                    }
                 }
             }
             break;
         // Game Over states are transitioned to via triggerGameOverState()
    }
}


function resetGame() {
  console.log("Resetting game...");
  player = { cash: 5000000, moviesCompleted: 0, unlockedJohnHughes: false, errorMsg: "", foreignControlNextMovie: false, isBankrupt: false, bankruptcyType: null };
   directors = [ /* Original list */
    { name: "Steven Spielberg", cost: 4000000, boost: 30, preferredGenres: ["Sci-Fi Adventure", "Action Flick", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Ridley Scott", cost: 3800000, boost: 28, preferredGenres: ["Sci-Fi Adventure", "Action Flick"], hatedGenres: ["Teen Comedy"] }, { name: "James Cameron", cost: 3900000, boost: 29, preferredGenres: ["Sci-Fi Adventure", "Action Flick"], hatedGenres: ["Romantic Drama"] }, { name: "George Lucas", cost: 4000000, boost: 30, preferredGenres: ["Sci-Fi Adventure", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Martin Scorsese", cost: 3900000, boost: 29, preferredGenres: ["Spy Thriller", "Romantic Drama"], hatedGenres: ["Sci-Fi Adventure", "Teen Comedy"] }, { name: "John Carpenter", cost: 400000, boost: 4, preferredGenres: ["Horror Thriller", "Sci-Fi Adventure"], hatedGenres: ["Romantic Drama", "Teen Comedy"] }, { name: "Tobe Hooper", cost: 300000, boost: 3, preferredGenres: ["Horror Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Joe Dante", cost: 350000, boost: 3, preferredGenres: ["Horror Thriller", "Teen Comedy"], hatedGenres: ["Western"] }, { name: "Wes Craven", cost: 450000, boost: 5, preferredGenres: ["Horror Thriller"], hatedGenres: ["Sci-Fi Adventure", "Romantic Drama"] }, { name: "John Landis", cost: 500000, boost: 6, preferredGenres: ["Teen Comedy", "Action Flick"], hatedGenres: ["Western", "Fantasy Epic"] }, { name: "Tim Burton", cost: 3700000, boost: 27, preferredGenres: ["Fantasy Epic", "Horror Thriller"], hatedGenres: ["Western", "Spy Thriller"] }, { name: "David Lynch", cost: 3600000, boost: 26, preferredGenres: ["Spy Thriller", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Action Flick"] }, { name: "Francis Ford Coppola", cost: 4100000, boost: 31, preferredGenres: ["Romantic Drama", "Spy Thriller"], hatedGenres: ["Teen Comedy"] }, { name: "Brian De Palma", cost: 3800000, boost: 28, preferredGenres: ["Spy Thriller", "Action Flick", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Oliver Stone", cost: 3900000, boost: 29, preferredGenres: ["Action Flick", "Spy Thriller"], hatedGenres: ["Fantasy Epic", "Teen Comedy"] }, { name: "Ron Howard", cost: 3500000, boost: 25, preferredGenres: ["Sci-Fi Adventure", "Fantasy Epic", "Romantic Drama"], hatedGenres: ["Horror Thriller"] }, { name: "Peter Jackson", cost: 4000000, boost: 30, preferredGenres: ["Fantasy Epic", "Horror Thriller"], hatedGenres: ["Spy Thriller"] }, { name: "Quentin Tarantino", cost: 4200000, boost: 32, preferredGenres: ["Action Flick", "Spy Thriller", "Western"], hatedGenres: ["Fantasy Epic", "Romantic Drama"] }, { name: "David Fincher", cost: 4100000, boost: 31, preferredGenres: ["Spy Thriller", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Fantasy Epic"] }, { name: "Christopher Nolan", cost: 4300000, boost: 33, preferredGenres: ["Sci-Fi Adventure", "Action Flick", "Spy Thriller"], hatedGenres: ["Teen Comedy", "Romantic Drama"] }, { name: "Stanley Kubrick", cost: 4500000, boost: 35, preferredGenres: ["Sci-Fi Adventure", "Horror Thriller"], hatedGenres: ["Teen Comedy", "Western"] }, { name: "Alfred Hitchcock", cost: 4400000, boost: 34, preferredGenres: ["Spy Thriller", "Horror Thriller"], hatedGenres: ["Sci-Fi Adventure", "Fantasy Epic"] }, { name: "Orson Welles", cost: 4200000, boost: 32, preferredGenres: ["Romantic Drama", "Spy Thriller"], hatedGenres: ["Sci-Fi Adventure", "Teen Comedy"] }, { name: "Akira Kurosawa", cost: 4000000, boost: 30, preferredGenres: ["Action Flick", "Western", "Fantasy Epic"], hatedGenres: ["Teen Comedy", "Spy Thriller"] }, { name: "Ingmar Bergman", cost: 3900000, boost: 29, preferredGenres: ["Romantic Drama", "Fantasy Epic"], hatedGenres: ["Action Flick", "Sci-Fi Adventure"] }, { name: "Federico Fellini", cost: 3800000, boost: 28, preferredGenres: ["Romantic Drama", "Fantasy Epic"], hatedGenres: ["Action Flick", "Spy Thriller"] }, { name: "Woody Allen", cost: 3600000, boost: 26, preferredGenres: ["Romantic Drama", "Teen Comedy"], hatedGenres: ["Action Flick", "Sci-Fi Adventure", "Horror Thriller"] }, { name: "Robert Zemeckis", cost: 3700000, boost: 27, preferredGenres: ["Sci-Fi Adventure", "Teen Comedy", "Fantasy Epic"], hatedGenres: ["Horror Thriller"] }, { name: "Michael Bay", cost: 3500000, boost: 25, preferredGenres: ["Action Flick", "Sci-Fi Adventure"], hatedGenres: ["Romantic Drama", "Teen Comedy", "Western"] }, { name: "Gus Van Sant", cost: 3400000, boost: 24, preferredGenres: ["Romantic Drama"], hatedGenres: ["Action Flick", "Sci-Fi Adventure", "Fantasy Epic"] }
   ];

  resetForNewMovie(); // Reset current movie state
  movieResult = { title: "", finalScript: "", success_score: 0, revenues: [], total_revenue: 0, profit: 0, oscar_status: OSCAR_STATUS_NONE, successTier: "", motivationalMessage: "", penaltyReasons: [], eraEventMsg: "", revealPhase: 0, phaseStartTime: 0, weekIndex: 0, revenueMultiplier: 1.0, openingWeekPenalty: 1.0 };
  goToState(STATE_WELCOME); // Go to welcome screen
}

function resetForNewMovie() {
  console.log("Resetting for new movie (clearing current movie details)...");
  // Don't reset budget here, calculate it in CHOOSE_PLOT state
  currentMovie = {
      budget: 5000000, // Reset to a default, will be overwritten
      plotIndex: -1, scriptIndex: -1, directorIndex: -1, actorIndex: -1,
      specialEffectsCost: 0, marketingCost: 0,
      specialEffectsPenalty: 0, marketingPenalty: 0, directorPenalty: 0, actorPenalty: 0,
      scripts: [], availableDirectors: [], availableActors: [],
      selectedScriptTemplate: "", chosenHero: "",
      sfxBudgetOptions: [], marketingBudgetOptions: [],
      loanTaken: false, lender: null,
      previousStateBeforeLoan: null, pendingSelectionIndex: -1, pendingSelectionType: null,
      isUnderForeignControl: false // Reset this movie's flag
  };
   // Reset movieResult object as well
   movieResult = { title: "", finalScript: "", success_score: 0, revenues: [], total_revenue: 0, profit: 0, oscar_status: OSCAR_STATUS_NONE, successTier: "", motivationalMessage: "", penaltyReasons: [], eraEventMsg: "", revealPhase: 0, phaseStartTime: 0, weekIndex: 0, revenueMultiplier: 1.0, openingWeekPenalty: 1.0 };

}


/*************************
 * SELECTION & ACTION FUNCTIONS
 *************************/
function generateScriptsForPlot(plotIndex) {
    currentMovie.scripts = []; // Clear existing scripts
    if(plotIndex < 0 || plotIndex >= plots.length) { console.error("Invalid plotIndex for script generation:", plotIndex); return; }

    let isSerious = random(1) < 0.8; // Determine tone once per batch
    let wordLists = {
        heroes: isSerious ? getSeriousHeroes(plotIndex) : getAbsurdHeroes(plotIndex),
        places: isSerious ? getSeriousPlaces(plotIndex) : getAbsurdPlaces(plotIndex),
        twists: isSerious ? getSeriousTwists(plotIndex) : getAbsurdTwists(plotIndex),
        villains: isSerious ? getSeriousVillains(plotIndex) : getAbsurdVillains(plotIndex),
        goals: isSerious ? getSeriousGoals(plotIndex) : getAbsurdGoals(plotIndex),
        adjectives: isSerious ? getSeriousAdjectives(plotIndex) : getAbsurdAdjectives(plotIndex),
        objects: getObjectsForPlot(plotIndex, isSerious)
    };

    // Make sure we have enough templates, duplicate if necessary
    let availableTemplates = [...plots[plotIndex].scripts];
    while (availableTemplates.length < 5) {
        availableTemplates.push(...plots[plotIndex].scripts);
    }
    availableTemplates = shuffle(availableTemplates); // Shuffle templates

    for (let i = 0; i < 5; i++) {
        let chosenHero = random(wordLists.heroes);
        // Use a unique template for each script if possible
        let template = availableTemplates[i % availableTemplates.length];

        // Ensure all placeholders are replaced
        let filledTemplate = template
            .replace("[place]", random(wordLists.places))
            .replace("[twist]", random(wordLists.twists))
            .replace("[villain]", random(wordLists.villains))
            .replace("[goal]", random(wordLists.goals))
            .replace("[adjective]", random(wordLists.adjectives))
            .replace("[object]", random(wordLists.objects));

        let displayText = filledTemplate.replace("[hero]", chosenHero);
        displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1); // Capitalize

        // Potential penalty for cheaper scripts (indices 0 and 1)
        let potentialPenaltyFlag = (i <= 1);
        // Penalty is assigned later in finalizeSelection based on this flag

        currentMovie.scripts.push({
            template: filledTemplate,
            displayText: displayText,
            cost: SCRIPT_COSTS[i],
            quality: SCRIPT_QUALITY[i],
            penalty: 0, // Initialize penalty to 0
            potentialPenalty: potentialPenaltyFlag, // Store if it *could* get a penalty
            hero: chosenHero
        });
    }
    console.log("Generated scripts:", currentMovie.scripts.length);
}

function selectPlot(index) {
    if (index >= 0 && index < plots.length) {
        console.log("Selecting plot:", plots[index].type);
        currentMovie.plotIndex = index;
        generateScriptsForPlot(index); // Generate scripts for the selected plot
        goToState(STATE_CHOOSE_SCRIPT); // Move to the script selection state
    } else {
        player.errorMsg = "Invalid plot selection.";
        console.error("Invalid plot index:", index);
    }
}


function calculateBudgetOptions(type) {
    let currentTotalCost = getTotalCost();
    let remainingBudget = currentMovie.budget - currentTotalCost;
    let options = [];
    let maxOptions = (type === 'sfx') ? MAX_SFX_OPTIONS : MAX_MARKETING_OPTIONS;
    let step = SFX_MARKETING_STEP; // e.g., 100,000

    // Determine the maximum possible spend based on remaining budget OR loan status
    let maxPossibleSpend = currentMovie.loanTaken ? Infinity : remainingBudget;

    if (maxPossibleSpend >= step) {
        // Calculate a reasonable top option based on remaining budget (or a high value if loan taken)
        let topOptionGuess = currentMovie.loanTaken ? max(step * maxOptions, remainingBudget * 0.8) : remainingBudget;
        topOptionGuess = max(step, topOptionGuess); // Ensure it's at least one step

        // Distribute options somewhat evenly up to the top option guess
        let idealStep = Math.floor(topOptionGuess / maxOptions / step) * step;
        idealStep = max(step, idealStep); // Ensure step is at least the minimum

        for (let i = 1; i <= maxOptions; i++) {
            let optionCost = i * idealStep;
            if (optionCost <= maxPossibleSpend) {
                options.push(optionCost);
            } else {
                // If even the first option is too expensive (but >= step), add just the remaining budget as an option
                if (i === 1 && remainingBudget >= step && !currentMovie.loanTaken) {
                    options.push(Math.floor(remainingBudget / step) * step); // Max out remaining budget
                }
                break; // Stop adding options if they exceed budget (and no loan)
            }
        }

        // If no options were added but budget allows, add at least the minimum step or remaining budget
        if (options.length === 0 && remainingBudget >= step && !currentMovie.loanTaken) {
             options.push(Math.floor(remainingBudget / step) * step); // Max out remaining budget
        } else if (options.length === 0 && remainingBudget < step && !currentMovie.loanTaken) {
            // No options possible without loan
        } else if (options.length === 0 && currentMovie.loanTaken) {
             options.push(step); // If loan taken, always offer at least the base step
        }

    } else {
       // Not enough budget for even the smallest step, and no loan
       options = [];
    }


    // Remove duplicates and sort
    options = [...new Set(options)].sort((a, b) => a - b);


    if (type === 'sfx') { currentMovie.sfxBudgetOptions = options; }
    else { currentMovie.marketingBudgetOptions = options; }
    console.log(type + " options calculated:", options, "Remaining budget (before this choice):", remainingBudget);
}


/*************************
 * GENRE-SPECIFIC GETTERS (Unchanged)
 *************************/
function getSeriousHeroes(index) { if(index<0 || index >= plots.length) return sciFiHeroes; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiHeroes; case "Teen Comedy": return teenHeroes; case "Action Flick": return actionHeroes; case "Horror Thriller": return horrorHeroes; case "Romantic Drama": return romanceHeroes; case "Western": return westernHeroes; case "Spy Thriller": return spyHeroes; case "Fantasy Epic": return fantasyHeroes; default: return sciFiHeroes; }}
function getAbsurdHeroes(index) { if(index<0 || index >= plots.length) return sciFiAbsurdHeroes; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAbsurdHeroes; case "Teen Comedy": return teenAbsurdHeroes; case "Action Flick": return actionAbsurdHeroes; case "Horror Thriller": return horrorAbsurdHeroes; case "Romantic Drama": return romanceAbsurdHeroes; case "Western": return westernAbsurdHeroes; case "Spy Thriller": return spyAbsurdHeroes; case "Fantasy Epic": return fantasyAbsurdHeroes; default: return sciFiAbsurdHeroes; }}
function getSeriousPlaces(index) { if(index<0 || index >= plots.length) return sciFiPlaces; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiPlaces; case "Teen Comedy": return teenPlaces; case "Action Flick": return actionPlaces; case "Horror Thriller": return horrorPlaces; case "Romantic Drama": return romancePlaces; case "Western": return westernPlaces; case "Spy Thriller": return spyPlaces; case "Fantasy Epic": return fantasyPlaces; default: return sciFiPlaces; }}
function getAbsurdPlaces(index) { if(index<0 || index >= plots.length) return sciFiAbsurdPlaces; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAbsurdPlaces; case "Teen Comedy": return teenAbsurdPlaces; case "Action Flick": return actionAbsurdPlaces; case "Horror Thriller": return horrorAbsurdPlaces; case "Romantic Drama": return romanceAbsurdPlaces; case "Western": return westernAbsurdPlaces; case "Spy Thriller": return spyAbsurdPlaces; case "Fantasy Epic": return fantasyAbsurdPlaces; default: return sciFiAbsurdPlaces; }}
function getSeriousTwists(index) { if(index<0 || index >= plots.length) return sciFiTwists; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiTwists; case "Teen Comedy": return teenTwists; case "Action Flick": return actionTwists; case "Horror Thriller": return horrorTwists; case "Romantic Drama": return romanceTwists; case "Western": return westernTwists; case "Spy Thriller": return spyTwists; case "Fantasy Epic": return fantasyTwists; default: return sciFiTwists; }}
function getAbsurdTwists(index) { if(index<0 || index >= plots.length) return sciFiAbsurdTwists; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAbsurdTwists; case "Teen Comedy": return teenAbsurdTwists; case "Action Flick": return actionAbsurdTwists; case "Horror Thriller": return horrorAbsurdTwists; case "Romantic Drama": return romanceAbsurdTwists; case "Western": return westernAbsurdTwists; case "Spy Thriller": return spyAbsurdTwists; case "Fantasy Epic": return fantasyAbsurdTwists; default: return sciFiAbsurdTwists; }}
function getSeriousVillains(index) { if(index<0 || index >= plots.length) return sciFiVillains; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiVillains; case "Teen Comedy": return teenVillains; case "Action Flick": return actionVillains; case "Horror Thriller": return horrorVillains; case "Romantic Drama": return romanceVillains; case "Western": return westernVillains; case "Spy Thriller": return spyVillains; case "Fantasy Epic": return fantasyVillains; default: return sciFiVillains; }}
function getAbsurdVillains(index) { if(index<0 || index >= plots.length) return sciFiAbsurdVillains; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAbsurdVillains; case "Teen Comedy": return teenAbsurdVillains; case "Action Flick": return actionAbsurdVillains; case "Horror Thriller": return horrorAbsurdVillains; case "Romantic Drama": return romanceAbsurdVillains; case "Western": return westernAbsurdVillains; case "Spy Thriller": return spyAbsurdVillains; case "Fantasy Epic": return fantasyAbsurdVillains; default: return sciFiAbsurdVillains; }}
function getSeriousGoals(index) { if(index<0 || index >= plots.length) return sciFiGoals; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiGoals; case "Teen Comedy": return teenGoals; case "Action Flick": return actionGoals; case "Horror Thriller": return horrorGoals; case "Romantic Drama": return romanceGoals; case "Western": return westernGoals; case "Spy Thriller": return spyGoals; case "Fantasy Epic": return fantasyGoals; default: return sciFiGoals; }}
function getAbsurdGoals(index) { if(index<0 || index >= plots.length) return sciFiAbsurdGoals; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAbsurdGoals; case "Teen Comedy": return teenAbsurdGoals; case "Action Flick": return actionAbsurdGoals; case "Horror Thriller": return horrorAbsurdGoals; case "Romantic Drama": return romanceAbsurdGoals; case "Western": return westernAbsurdGoals; case "Spy Thriller": return spyAbsurdGoals; case "Fantasy Epic": return fantasyAbsurdGoals; default: return sciFiAbsurdGoals; }}
function getSeriousAdjectives(index) { if(index<0 || index >= plots.length) return sciFiAdjectives; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAdjectives; case "Teen Comedy": return teenAdjectives; case "Action Flick": return actionAdjectives; case "Horror Thriller": return horrorAdjectives; case "Romantic Drama": return romanceAdjectives; case "Western": return westernAdjectives; case "Spy Thriller": return spyAdjectives; case "Fantasy Epic": return fantasyAdjectives; default: return sciFiAdjectives; }}
function getAbsurdAdjectives(index) { if(index<0 || index >= plots.length) return sciFiAbsurdAdjectives; switch (plots[index].genreType) { case "Sci-Fi Adventure": return sciFiAbsurdAdjectives; case "Teen Comedy": return teenAbsurdAdjectives; case "Action Flick": return actionAbsurdAdjectives; case "Horror Thriller": return horrorAbsurdAdjectives; case "Romantic Drama": return romanceAbsurdAdjectives; case "Western": return westernAbsurdAdjectives; case "Spy Thriller": return spyAbsurdAdjectives; case "Fantasy Epic": return fantasyAbsurdAdjectives; default: return sciFiAbsurdAdjectives; }}
function getObjectsForPlot(index, isSerious) { if(index<0 || index >= plots.length) return isSerious ? sciFiDevices : sciFiAbsurdDevices; switch (plots[index].genreType) { case "Sci-Fi Adventure": return isSerious ? sciFiDevices : sciFiAbsurdDevices; case "Teen Comedy": return isSerious ? teenTrinkets : teenAbsurdTrinkets; case "Action Flick": return isSerious ? actionWeapons : actionAbsurdWeapons; case "Horror Thriller": return isSerious ? horrorRelics : horrorAbsurdRelics; case "Romantic Drama": return isSerious ? romanceHeirlooms : romanceAbsurdHeirlooms; case "Western": return isSerious ? westernTreasures : westernAbsurdTreasures; case "Spy Thriller": return isSerious ? spyDevices : spyAbsurdDevices; case "Fantasy Epic": return isSerious ? fantasyArtifacts : fantasyAbsurdArtifacts; default: return isSerious ? sciFiDevices : sciFiAbsurdDevices; }}