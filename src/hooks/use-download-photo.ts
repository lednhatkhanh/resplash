import { useMutation } from 'react-query';
import { PhotoModel, SinglePhotoModel } from 'src/models';

export const useDownloadPhoto = (photo: PhotoModel | SinglePhotoModel | undefined) => {
  const [triggerTrackDownloads] = useMutation(() => fetch(`/api/unsplash/photos/${photo?.id}/download`));

  if (typeof photo === 'undefined') {
    return;
  }

  const triggerDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const anchorTag = document.createElement('a');
    anchorTag.href = `${photo.links.download}?force=true`;
    document.body.append(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);

    triggerTrackDownloads();
  };

  return triggerDownload;
};
