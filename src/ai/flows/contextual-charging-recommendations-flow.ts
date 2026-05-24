'use server';
/**
 * @fileOverview A Genkit flow for extracting structured charging preferences from natural language input.
 *
 * - contextualChargingRecommendations - A function that processes user charging preferences.
 * - ContextualChargingRecommendationsInput - The input type for the contextualChargingRecommendations function.
 * - ContextualChargingRecommendationsOutput - The return type for the contextualChargingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const ContextualChargingRecommendationsInputSchema = z.object({
  routeDescription: z
    .string()
    .describe('A brief description of the current route, e.g., "My trip from NYC to Boston".'),
  currentBatteryPercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('The current battery percentage of the EV.'),
  chargingPreferences: z
    .string()
    .describe(
      'The user\'s natural language charging preferences, e.g., "I prefer fast chargers near coffee shops, and I want to arrive with at least 30% battery."'
    ),
});
export type ContextualChargingRecommendationsInput = z.infer<
  typeof ContextualChargingRecommendationsInputSchema
>;

// Output Schema
const ContextualChargingRecommendationsOutputSchema = z.object({
  minBatteryArrivalPercentage: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe(
      'The minimum desired battery percentage upon arrival at the destination. Extract numbers like "30%" or "one quarter battery".'
    ),
  preferredChargerTypes: z
    .array(z.string())
    .optional()
    .describe(
      'An array of preferred charger types, e.g., ["DC Fast", "Level 2"]. Look for keywords like "fast chargers", "quick charge", "slow charge".'
    ),
  preferredAmenities: z
    .array(z.string())
    .optional()
    .describe(
      'An array of amenities the user prefers near charging stations, e.g., ["coffee shop", "restaurant", "restroom"]. Look for "near coffee shops", "places to eat", "a restroom nearby".'
    ),
  maxDetourTimeMinutes: z
    .number()
    .optional()
    .describe(
      'The maximum acceptable detour time in minutes for a charging stop. Extract numbers like "not too far off route", "within 10 minutes".'
    ),
  prioritizeCost: z
    .boolean()
    .optional()
    .describe(
      'Indicates if the user prioritizes lower charging cost. Look for "cheap charging", "affordable options".'
    ),
  generalNotes: z
    .string()
    .optional()
    .describe('Any other relevant preferences or notes that could not be categorized.'),
});
export type ContextualChargingRecommendationsOutput = z.infer<
  typeof ContextualChargingRecommendationsOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'contextualChargingRecommendationsPrompt',
  input: { schema: ContextualChargingRecommendationsInputSchema },
  output: { schema: ContextualChargingRecommendationsOutputSchema },
  prompt: `You are an AI assistant designed to understand an EV driver's charging preferences and extract them into a structured JSON format.
The user will provide their current route details, current battery percentage, and their natural language charging preferences.

Your goal is to parse the 'chargingPreferences' text and extract the following information:
- minBatteryArrivalPercentage: The minimum desired battery percentage upon arrival at the destination. If not specified, do not include.
- preferredChargerTypes: An array of preferred charger types (e.g., "DC Fast", "Level 2"). If not specified, do not include.
- preferredAmenities: An array of amenities the user prefers near charging stations (e.g., "coffee shop", "restaurant"). If not specified, do not include.
- maxDetourTimeMinutes: The maximum acceptable detour time in minutes for a charging stop. If not specified, do not include.
- prioritizeCost: A boolean indicating if the user prioritizes lower charging cost. If not specified, do not include.
- generalNotes: Any other relevant preferences or notes that could not be categorized. If not specified, do not include.

If a preference is mentioned, extract it. If it is not mentioned, omit the field from the JSON output.
Be precise and only extract what is explicitly stated or strongly implied by the user's preferences.

Current Route Description: {{{routeDescription}}}
Current Battery Percentage: {{{currentBatteryPercentage}}}%

User's Charging Preferences: {{{chargingPreferences}}}`,
});

export async function contextualChargingRecommendations(
  input: ContextualChargingRecommendationsInput
): Promise<ContextualChargingRecommendationsOutput> {
  return contextualChargingRecommendationsFlow(input);
}

const contextualChargingRecommendationsFlow = ai.defineFlow(
  {
    name: 'contextualChargingRecommendationsFlow',
    inputSchema: ContextualChargingRecommendationsInputSchema,
    outputSchema: ContextualChargingRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);