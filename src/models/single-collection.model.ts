export interface SingleCollectionModel {
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
  links: SingleCollectionModelLinks;
  user: User;
  cover_photo: CoverPhoto;
  preview_photos: PreviewPhoto[];
  meta: Meta;
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
  alt_description: string;
  urls: Urls;
  links: CoverPhotoLinks;
  categories: string[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: null;
  user: User;
}

interface CoverPhotoLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}

interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface SingleCollectionModelLinks {
  self: string;
  html: string;
  photos: string;
  related: string;
}

interface Meta {
  title: null;
  description: null;
  index: boolean;
}

interface PreviewPhoto {
  id: string;
  created_at: Date;
  updated_at: Date;
  urls: Urls;
}

interface Tag {
  type: string;
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
