import { UserModel } from './user.model';
import { Indexable } from './common';

export interface PhotoModel extends Indexable {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: null;
  width: number;
  height: number;
  color: string;
  description: null;
  alt_description: string;
  urls: Urls;
  links: PhotoModelLinks;
  categories: string[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: Sponsorship;
  user: UserModel;
}

interface PhotoModelLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: UserModel;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
