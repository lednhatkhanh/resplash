import { PhotoModel, SinglePhotoModel } from 'src/models';

export const usePhotoMeta = (photo: PhotoModel | SinglePhotoModel | undefined) => {
  if (typeof photo === 'undefined') {
    return undefined;
  }
  return {
    description: photo.alt_description ?? photo.description ?? `A photo of ${photo.user.name}`,
    user: {
      description: `Photo of ${photo.user.name}`,
    },
  };
};
