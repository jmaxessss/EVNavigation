'use server';
/**
 * @fileOverview Genkit flow для умной регистрации автомобиля.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EVPulseVehicleSpecsSchema = z.object({
  make: z.string().describe('Марка электромобиля.'),
  model: z.string().describe('Модель электромобиля.'),
  year: z.number().describe('Год выпуска.'),
  batteryCapacityKWh: z.number().describe('Полезная емкость батареи в кВтч.'),
  chargingPortType: z.enum(['CCS', 'Type2', 'GB/T', 'Chademo', 'NACS']).describe('Тип разъема зарядки.'),
  averageConsumptionWhPerKm: z.number().describe('Средний расход энергии (Втч/км).'),
});

const EVPulseVehicleOutputSchema = z.union([
  EVPulseVehicleSpecsSchema,
  z.object({
    error: z.string().describe('Сообщение об ошибке, если авто не найдено.'),
  })
]);

export type EVPulseVehicleInput = string;
export type EVPulseVehicleOutput = z.infer<typeof EVPulseVehicleOutputSchema>;

const lookupVehicleSpecsTool = ai.defineTool(
  {
    name: 'lookupVehicleSpecs',
    description: 'Ищет характеристики электромобиля по марке, модели и году.',
    inputSchema: z.object({
      make: z.string(),
      model: z.string(),
      year: z.number(),
    }),
    outputSchema: EVPulseVehicleSpecsSchema.nullable(),
  },
  async (input) => {
    const { make, model, year } = input;
    const lowerMake = make.toLowerCase();
    const lowerModel = model.toLowerCase();

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
    }
    return null;
  }
);

const smartVehicleOnboardingPrompt = ai.definePrompt({
  name: 'smartVehicleOnboardingPrompt',
  input: { schema: z.object({ userQuery: z.string() }) },
  output: { schema: EVPulseVehicleOutputSchema },
  tools: [lookupVehicleSpecsTool],
  system: `Вы — интеллектуальный помощник приложения EVPulse. Ваша задача — определить марку, модель и год выпуска автомобиля из запроса пользователя и вернуть его характеристики.
Если авто не найдено, верните ошибку на русском языке.`,
  prompt: 'Запрос пользователя: {{{userQuery}}}',
});

const smartVehicleOnboardingFlow = ai.defineFlow(
  {
    name: 'smartVehicleOnboardingFlow',
    inputSchema: z.string(),
    outputSchema: EVPulseVehicleOutputSchema,
  },
  async (userQuery) => {
    const { output } = await smartVehicleOnboardingPrompt({ userQuery });
    return output!;
  }
);

export async function smartVehicleOnboarding(userQuery: EVPulseVehicleInput): Promise<EVPulseVehicleOutput> {
  return smartVehicleOnboardingFlow(userQuery);
}
