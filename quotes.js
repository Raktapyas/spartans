/* ============================================================
   SPARTANS — quotes.js
   Daily motivation / gangster quote system
   ============================================================ */

const QUOTES = [
  /* Spartan / warrior */
  { text: "Stay Loyal to Your Goals.",        author: "SPARTAN CODE" },
  { text: "Iron Sharpens Iron.",               author: "PROVERBS 27:17" },
  { text: "No Excuses. Only Results.",         author: "SPARTAN CODE" },
  { text: "Build Your Own Legacy.",            author: "UNDERGROUND LAW" },
  { text: "Comfort is the Enemy.",             author: "SPARTAN CODE" },
  { text: "Keep the Underground Vibe.",        author: "SPARTAN CODE" },
  { text: "Don't Stop Until You're Proud.",    author: "SPARTAN CODE" },
  { text: "Bleed Today. Win Tomorrow.",        author: "SPARTAN CREED" },
  { text: "The Strong Do What They Can.",      author: "THUCYDIDES" },
  { text: "Pain is Temporary. Glory is Eternal.", author: "SPARTAN CREED" },
  { text: "Either You Run the Day or the Day Runs You.", author: "JIM ROHN" },
  { text: "Suffer the Pain of Discipline or the Pain of Regret.", author: "SPARTAN WISDOM" },
  { text: "Champions Are Made in the Dark.",   author: "UNDERGROUND LAW" },
  { text: "Fear No Man. Respect Every Rep.",   author: "UNDERGROUND LAW" },
  { text: "Your Silence is Your Weapon.",      author: "SPARTAN CODE" },
  { text: "The Grind Does Not Stop.",          author: "UNDERGROUND LAW" },
  { text: "Wolves Don't Lose Sleep Over Sheep.", author: "SPARTAN PROVERB" },
  { text: "Do It In Silence. Let Success Make the Noise.", author: "UNDERGROUND LAW" },
  { text: "Every Scar is a Lesson Earned.",    author: "SPARTAN CREED" },
  { text: "Loyalty. Discipline. Execution.",   author: "SPARTAN CODE" },
  /* Gangster / street */
  { text: "Real Ones Work While Others Watch.", author: "STREET CODE" },
  { text: "Money Talks. Weakness Walks.",      author: "STREET CODE" },
  { text: "Never Let 'Em See You Sweat.",      author: "STREET CODE" },
  { text: "Survive First. Thrive Second.",     author: "UNDERGROUND LAW" },
  { text: "Stay Low. Move Fast. Hit Hard.",    author: "STREET CODE" },
  { text: "Trust the Process. Not the People.", author: "UNDERGROUND LAW" },
  { text: "Pressure Makes Diamonds.",          author: "STREET CODE" },
  { text: "Build in Silence. Destroy in Chaos.", author: "UNDERGROUND LAW" },
];

/**
 * Pick a pseudo-random quote seeded by today's date
 * so the same quote shows all day, changing at midnight.
 */
function getDailyQuote() {
  const today = new Date();
  const seed  = today.getFullYear() * 10000 +
                (today.getMonth() + 1) * 100 +
                today.getDate();
  const idx   = seed % QUOTES.length;
  return QUOTES[idx];
}

/**
 * Pick a truly random quote (used on manual refresh button)
 */
function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export { getDailyQuote, getRandomQuote, QUOTES };
