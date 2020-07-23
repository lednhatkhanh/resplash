/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UNSPLASH_ACCESS_KEY: string;
      UNSPLASH_SECRET_KEY: string;
    }
  }
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
