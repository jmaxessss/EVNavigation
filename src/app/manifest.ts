
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EVPulse | Умная навигация',
    short_name: 'EVPulse',
    description: 'Интеллектуальное планирование маршрутов для электромобилей в Беларуси',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#5E5EED',
    icons: [
      {
        src: 'https://picsum.photos/seed/evicon1/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/evicon2/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
