const FALLBACK = [
  "Languages are bridges, not walls.",
  "Small steps. Big fluency.",
  "Speak messy — learn fast.",
  "Practice > perfection.",
  "Мова — це карта до нових людей.",
  "Сьогодні на одну фразу сміливіше.",
];

function pickFallback() {
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

/**
 * Quotable: https://api.quotable.io/quotes/random  (returns array)
 * Docs mention random quotes endpoint /quotes/random. :contentReference[oaicite:4]{index=4}
 */
export async function getRandomQuote(signal) {
  try {
    const url =
      "https://api.quotable.io/quotes/random?maxLength=90&tags=wisdom|inspirational|famous-quotes";
    const res = await fetch(url, { signal });

    if (!res.ok) throw new Error(`Quote API failed: ${res.status}`);
    const data = await res.json();

    const q = Array.isArray(data) ? data[0] : data;
    const text = q?.content?.trim();
    const author = q?.author?.trim();

    if (!text) return pickFallback();
    return author ? `${text} — ${author}` : text;
  } catch {
    return pickFallback();
  }
}
