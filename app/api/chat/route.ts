import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const response = await fetch(
    "http://10.179.48.141:8000/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        model: "llama-7b",
        max_tokens: 8192,
        stream: true,
        top_p: 1,
        temperature: 0.1,
        repetition_penalty: 1.0,
      }),
    }
  );

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
