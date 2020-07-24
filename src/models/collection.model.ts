import { PhotoModel } from './photo.model';
import { UserModel } from './user.model';

export interface CollectionModel {
  id: number;
  title: string;
  description: null;
  published_at: Date;
  last_collected_at: Date;
  updated_at: Date;
  curated: boolean;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: Tag[];
  links: Links;
  cover_photo: CoverPhoto;
  user: UserModel;
}

interface CoverPhoto extends PhotoModel {}

interface Links {
  self: string;
  html: string;
  photos: string;
  related: string;
}

interface Tag {
  type: string;
  title: string;
}
