import { UserModel } from './user.model';

export interface SinglePhotoModel {
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
  links: SinglePhotoModelLinks;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Sponsorship;
  user: UserModel;
  exif: Exif;
  location: Location;
  meta: Meta;
  tags: Tag[];
  related_collections: RelatedCollections;
  views: number;
  downloads: number;
}

interface Exif {
  make: null;
  model: null;
  exposure_time: null;
  aperture: null;
  focal_length: null;
  iso: null;
}

interface SinglePhotoModelLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Location {
  title: null;
  name: null;
  city: null;
  country: null;
  position: Position;
}

interface Position {
  latitude: null;
  longitude: null;
}

interface Meta {
  index: boolean;
}

interface RelatedCollections {
  total: number;
  type: string;
  results: Result[];
}

interface Result {
  id: number;
  title: string;
  description: null | string;
  published_at: Date;
  last_collected_at: Date;
  updated_at: Date;
  curated: boolean;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: Tag[];
  links: ResultLinks;
  user: UserModel;
  cover_photo: CoverPhoto;
  preview_photos: PreviewPhoto[];
}

interface CoverPhoto {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  color: string;
  description: null | string;
  alt_description: null | string;
  urls: Urls;
  links: SinglePhotoModelLinks;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  user: UserModel;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface ResultLinks {
  self: string;
  html: string;
  photos: string;
  related: string;
}

interface PreviewPhoto {
  id: string;
  created_at: Date;
  updated_at: Date;
  urls: Urls;
}

interface Tag {
  type: Type;
  title: string;
  source?: Source;
}

interface Source {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
}

interface Ancestry {
  type: Category;
  category: Category;
  subcategory?: Category;
}

interface Category {
  slug: string;
  pretty_slug: string;
}

enum Type {
  LandingPage = 'landing_page',
  Search = 'search',
}

interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: UserModel;
}
