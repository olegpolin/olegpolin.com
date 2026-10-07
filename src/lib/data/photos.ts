import type { Picture } from 'vite-imagetools';

/* Files are named by capture time, YYYY-MM-DD-HH-MM-SS.png, so sorting the paths sorts by date. */
const modules = import.meta.glob<{ default: Picture }>('/src/lib/assets/photos/*.png', {
  eager: true,
  query: { enhanced: true }
});

export interface Photo {
  id: string;
  year: string;
  picture: Picture;
}

/* Newest first. */
export const photos: Photo[] = Object.entries(modules)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([path, module]) => {
    const id = path.slice(path.lastIndexOf('/') + 1, -'.png'.length);
    return { id, year: id.slice(0, 4), picture: module.default };
  });
