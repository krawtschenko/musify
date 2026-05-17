import { z } from 'zod';
import {
  playlistMetaSchema,
  playlistAttributesSchema,
  playlistDataSchema,
  playlistsResponseSchema,
} from '@/features/playlists/model';

export type PlaylistMeta = z.infer<typeof playlistMetaSchema>;
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>;
export type PlaylistData = z.infer<typeof playlistDataSchema>;
export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>;

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'addedAt' | 'likesCount';
  sortDirection?: 'asc' | 'desc';
  tagsIds?: string[];
  userId?: string;
  trackId?: string;
};

export type CreatePlaylistArgs = {
  data: {
    type: string;
    attributes: {
      title: string;
      description: string;
    };
  };
};

export type UpdatePlaylistArgs = {
  data: {
    type: string;
    attributes: {
      title: string;
      description: string;
      tagIds: string[];
    };
  };
};
