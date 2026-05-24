'use server';
/**
 * @fileOverview Genkit flow для извлечения предпочтений по зарядке из естественного языка.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Входная схема
const ContextualChargingRecommendationsInputSchema = z.object({
  routeDescription: z
    .string()
    .describe('Описание текущего маршрута, например, "Поездка из Минска в Гомель".'),
  currentBatteryPercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('Текущий процент заряда электромобиля.'),
  chargingPreferences: z
    .string()
    .describe(
      'Предпочтения пользователя на естественном языке, например: "Хочу быструю зарядку Malanka рядом с кафе, приехать с запасом 20%".'
    ),
});
export type ContextualChargingRecommendationsInput = z.infer<
  typeof ContextualChargingRecommendationsInputSchema
>;

// Выходная схема
const ContextualChargingRecommendationsOutputSchema = z.object({
  minBatteryArrivalPercentage: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe(
      'Минимальный желаемый процент заряда по прибытии.'
    ),
  preferredChargerTypes: z
    .array(z.string())
    .optional()
    .describe(
      'Массив предпочтительных типов зарядных станций (например, DC Fast, Level 2).'
    ),
  preferredAmenities: z
    .array(z.string())
    .optional()
    .describe(
      'Массив удобств рядом (кафе, ресторан, туалет).'
    ),
  maxDetourTimeMinutes: z
    .number()
    .optional()
    .describe(
      'Максимальное время отклонения от маршрута в минутах.'
    ),
  prioritizeCost: z
    .boolean()
    .optional()
    .describe(
      'Приоритет низкой стоимости зарядки.'
    ),
  generalNotes: z
    .string()
    .optional()
    .describe('Любые другие примечания.'),
});
export type ContextualChargingRecommendationsOutput = z.infer<
  typeof ContextualChargingRecommendationsOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'contextualChargingRecommendationsPrompt',
  input: { schema: ContextualChargingRecommendationsInputSchema },
  output: { schema: ContextualChargingRecommendationsOutputSchema },
  prompt: `Вы — ИИ-помощник, помогающий водителю электромобиля в Беларуси. 
Ваша цель — понять предпочтения пользователя и извлечь их в структурированный JSON.

Маршрут: {{{routeDescription}}}
Заряд: {{{currentBatteryPercentage}}}%
Текст предпочтений: {{{chargingPreferences}}}

Особое внимание уделите брендам (например, Malanka) и типам коннекторов (CCS, Chademo).`,
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
