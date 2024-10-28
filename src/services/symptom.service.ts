import { ClientOptions, OpenAI } from "openai";
import { ISymptomService } from "../interfaces/SymptomAnalysis";
import { zodResponseFormat } from "openai/helpers/zod";
import { SymptomAnalysis } from "../schemas/SymptomAnalysis";

const configuration: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

export const symptomService: ISymptomService = {
  async analyzeSymptoms(userMessage: string) {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
      response_format: zodResponseFormat(
        SymptomAnalysis.output,
        "symptomAnalysis"
      ),
    });

    return completion.choices[0].message.parsed as SymptomAnalysis.Output;
  },
};
