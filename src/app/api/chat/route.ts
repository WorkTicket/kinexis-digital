import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // TODO: Integrate with OpenAI API when ready
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    // });
    // const reply = completion.choices[0].message.content;

    // For now, return a mock response
    const lastMessage = messages[messages.length - 1];
    const reply = generateMockResponse(lastMessage?.content || "");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateMockResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("seo")) {
    return "Great choice! SEO is our bread and butter. Most clients see meaningful ranking improvements within 3-4 months. What's your monthly revenue range? That helps me understand what kind of investment makes sense.";
  }
  if (msg.includes("ad") || msg.includes("ppc") || msg.includes("google") || msg.includes("meta") || msg.includes("facebook")) {
    return "Paid ads can generate leads within days. We typically work with $2k-$3k/month minimum budgets. What kind of business do you run?";
  }
  if (msg.includes("web") || msg.includes("site") || msg.includes("design")) {
    return "Our websites are custom-built for conversion, no templates. Most projects run 6-10 weeks. What industry are you in?";
  }
  if (msg.includes("funnel") || msg.includes("cro") || msg.includes("conversion")) {
    return "Funnels and CRO turn traffic into leads and sales. We build lead magnets, email sequences, and qualification flows. What's your current monthly traffic like?";
  }
  if (msg.includes("brand")) {
    return "Branding is about positioning, not just a logo. A full identity takes 8-12 weeks. What's the biggest challenge with your current brand?";
  }

  return "Thanks for reaching out! What service are you looking for? (SEO, Paid Ads, Web Design, Funnels, or Branding)";
}
