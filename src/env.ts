import { defineEnvVars } from '@sveltejs/kit/env';

// All three are optional so builds and previews without secrets still start;
// the Spotify widget renders its empty state when any of them is missing.
const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
  SPOTIFY_CLIENT_ID: {
    description: 'Client ID of the Spotify developer app behind the now-playing widget',
    schema: optional
  },
  SPOTIFY_CLIENT_SECRET: {
    description: 'Client secret of the Spotify developer app',
    schema: optional
  },
  SPOTIFY_REFRESH_TOKEN: {
    description: 'Refresh token for the Spotify account whose playback is shown (see README)',
    schema: optional
  }
});
