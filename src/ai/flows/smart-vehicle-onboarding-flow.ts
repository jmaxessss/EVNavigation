'use server';
/**
 * @fileOverview This file defines a Genkit flow for smart vehicle onboarding in the EVPulse app.
 * It allows users to input their EV's make, model, and year via natural language,
 * and the system automatically retrieves its detailed specifications.
 *
 * - smartVehicleOnboarding: An asynchronous function to initiate the vehicle onboarding process.
 * - EVPulseVehicleInput: The input type for the onboarding function (a string query).
 * - EVPulseVehicleOutput: The return type, containing vehicle specifications or an error.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * Describes the detailed specifications of an electric vehicle.
 */
const EVPulseVehicleSpecsSchema = z.object({
  make: z.string().describe('The make of the electric vehicle.'),
  model: z.string().describe('The model of the electric vehicle.'),
  year: z.number().describe('The model year of the electric vehicle.'),
  batteryCapacityKWh: z.number().describe('The usable battery capacity in kilowatt-hours (kWh).'),
  chargingPortType: z.enum(['CCS', 'Type2', 'GB/T', 'Chademo', 'NACS']).describe('The primary charging port type (e.g., CCS, GB/T, NACS).'),
  averageConsumptionWhPerKm: z.number().describe('Average energy consumption in Watt-hours per kilometer (Wh/km).'),
}).describe('Detailed specifications for an electric vehicle.');

/**
 * Represents the possible output of the smart vehicle onboarding process,
 * either vehicle specifications or an error message if not found.
 */
const EVPulseVehicleOutputSchema = z.union([
  EVPulseVehicleSpecsSchema,
  z.object({
    error: z.string().describe('An error message if the vehicle could not be identified or its specifications retrieved.'),
  })
]).describe('Vehicle specifications or an error message.');

export type EVPulseVehicleInput = string;
export type EVPulseVehicleOutput = z.infer<typeof EVPulseVehicleOutputSchema>;

/**
 * A mock tool that simulates looking up detailed specifications for an electric vehicle
 * from a database or online source based on its make, model, and year.
 */
const lookupVehicleSpecsTool = ai.defineTool(
  {
    name: 'lookupVehicleSpecs',
    description: 'Looks up detailed specifications for an electric vehicle given its make, model, and year.',
    inputSchema: z.object({
      make: z.string().describe('The make of the electric vehicle (e.g., "Tesla", "BYD").'),
      model: z.string().describe('The model of the electric vehicle (e.g., "Model 3", "Atto 3").'),
      year: z.number().describe('The model year of the electric vehicle (e.g., 2023).'),
    }),
    outputSchema: EVPulseVehicleSpecsSchema.nullable(), // Tool can return null if not found
  },
  async (input) => {
    const { make, model, year } = input;
    const lowerMake = make.toLowerCase();
    const lowerModel = model.toLowerCase();

    // Simulate lookup with hardcoded data
    if (lowerMake === 'tesla' && lowerModel === 'model 3' && year === 2023) {
      return {
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        batteryCapacityKWh: 75,
        chargingPortType: 'CCS',
        averageConsumptionWhPerKm: 150,
      };
    } else if (lowerMake === 'byd' && lowerModel === 'atto 3' && year === 2022) {
      return {
        make: 'BYD',
        model: 'Atto 3',
        year: 2022,
        batteryCapacityKWh: 60.48,
        chargingPortType: 'GB/T',
        averageConsumptionWhPerKm: 145,
      };
    } else if (lowerMake === 'zeekr' && lowerModel === '001' && year === 2024) {
      return {
        make: 'Zeekr',
        model: '001',
        year: 2024,
        batteryCapacityKWh: 100,
        chargingPortType: 'GB/T',
        averageConsumptionWhPerKm: 180,
      };
    }
    return null; // Vehicle not found
  }
);

/**
 * A prompt that uses the `lookupVehicleSpecsTool` to identify and retrieve
 * specifications for an EV based on a user's natural language query.
 */
const smartVehicleOnboardingPrompt = ai.definePrompt({
  name: 'smartVehicleOnboardingPrompt',
  input: { schema: z.object({ userQuery: z.string().describe('Natural language description of the user\'s EV.') }) },
  output: { schema: EVPulseVehicleOutputSchema },
  tools: [lookupVehicleSpecsTool],
  system: `You are an intelligent assistant for the EVPulse app. Your primary goal is to help the user onboard their electric vehicle.
Your task is to identify the user's electric vehicle make, model, and year from their natural language query. Once identified,
use the `lookupVehicleSpecs` tool to retrieve the vehicle's detailed specifications.

After successfully getting the specifications, output them directly as a JSON object matching the `EVPulseVehicleSpecs` schema.
If you cannot identify the vehicle from the query, or if the `lookupVehicleSpecs` tool returns no data for the identified vehicle,
output a JSON object with an 'error' field explaining that the vehicle could not be found or identified.

Example successful output:
{
  "make": "Tesla",
  "model": "Model 3",
  "year": 2023,
  "batteryCapacityKWh": 75,
  "chargingPortType": "CCS",
  "averageConsumptionWhPerKm": 150
}

Example error output:
{
  "error": "Could not find specifications for the specified vehicle. Please check the make, model, and year and try again."
}
`,
  prompt: 'User query: {{{userQuery}}}',
});

/**
 * The main Genkit flow for smart vehicle onboarding. It takes a user's query
 * and processes it through the `smartVehicleOnboardingPrompt` to identify the vehicle
 * and fetch its specifications.
 */
const smartVehicleOnboardingFlow = ai.defineFlow(
  {
    name: 'smartVehicleOnboardingFlow',
    inputSchema: z.string().describe('User query describing the EV (e.g., "my car is a 2023 Tesla Model 3")'),
    outputSchema: EVPulseVehicleOutputSchema,
  },
  async (userQuery) => {
    const { output } = await smartVehicleOnboardingPrompt({ userQuery });
    // The prompt is designed to directly output the EVPulseVehicleOutputSchema
    // so we can return its output directly.
    return output!;
  }
);

/**
 * Initiates the smart vehicle onboarding process.
 * Takes a natural language query describing the user's EV and returns its specifications
 * or an error if the vehicle cannot be identified.
 *
 * @param userQuery A string describing the user's electric vehicle (e.g., "my car is a 2023 Tesla Model 3").
 * @returns A promise that resolves to EVPulseVehicleOutput, containing vehicle specifications or an error.
 */
export async function smartVehicleOnboarding(userQuery: EVPulseVehicleInput): Promise<EVPulseVehicleOutput> {
  return smartVehicleOnboardingFlow(userQuery);
}
