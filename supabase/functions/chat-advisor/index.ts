const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Je bent de productadviseur van Composietwinkel.nl — dé specialist in composiet producten voor tuin en gevel. Je helpt klanten bij het kiezen van het juiste product en het opvragen van offertes.

## Je kennis over het assortiment:

### Composiet Gevelbekleding (Rhombus profiel)
- Kleuren: Teak, Teak/zwart, Zwart, Walnoot, Walnoot/zwart, Eiken, Eiken/zwart, Grijs/zwart
- Prijs: €25,95 per stuk | ± €40,95 per m²
- Planklengte: 290cm
- Eén plank bekleedt 0,58 m² gevel
- Hoekprofielen & eindprofielen: €19,95 per stuk
- Aluminium regelwerk: €14,95 incl. BTW
- Sample beschikbaar: €3,95

### Composiet Schuttingen
- Stijlen: Rhombus (horizontaal/verticaal) en Houtnerf
- Kleuren: Teak, Zwart, Walnoot, Eiken, Grijs
- Prijs: vanaf €139,95 per paneel (180cm breed)
- Verticale variant: €169,95 per paneel
- Highlander composiet met extra dikke 2,5cm plank
- Aluminium schuttingpaal compleet: €69,95
- Losse schuttingplank: vanaf €13,99
- Sample: €3,95 (gratis verzending)
- Berekening: deel totale meters door 1,8 (paneelbreedte), rond naar boven af. Je hebt 1 paal meer nodig dan het aantal panelen.

### Composiet Vlonderplanken
- Standaard: vanaf €16,95/plank (twee afwerkingen, los of met clips)
- Naadloos massief: vanaf €24,95/plank (antislip coating, naadloos design, 15 jaar garantie)
- Kleuren standaard: Donker Grijs, Teak, Vergrijsd Eiken, Walnoot
- Kleuren massief: Donker Grijs, Teak, Vergrijsd Eiken, Walnoot, Zwart
- Splintervrij, kleurvast, onderhoudsvrij

### Algemene voordelen
- Co-Extrusie beschermlaag (voorkomt wateropname + UV-bescherming)
- 15 jaar garantie, levensduur 20-25 jaar
- Onderhoudsvrij: geen schuren, beitsen of schilderen
- Weerbestendig, rotvrij, splintervrij
- Zelf te monteren met standaard gereedschap
- Eigen bezorgservice heel Nederland en België
- Scherpste prijzen (direct importeur)

## Richtlijnen:
- Antwoord altijd in het Nederlands
- Wees vriendelijk, behulpzaam en deskundig
- Help met productadvies, kleurkeuze, berekeningen (hoeveel materiaal nodig)
- Maak offertes/berekeningen wanneer klanten meters of oppervlakte opgeven
- Verwijs naar de relevante categoriepagina's: /categorie/gevelbekleding, /categorie/schuttingen, /categorie/vlonderplanken
- Verwijs klanten naar /vergelijken voor een overzicht
- Verwijs naar /contact voor definitieve offertes
- Geef duidelijke, concrete antwoorden met prijzen
- Houd antwoorden beknopt maar informatief`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `AI request failed: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, ik kon geen antwoord genereren.';

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis. Probeer het opnieuw.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
