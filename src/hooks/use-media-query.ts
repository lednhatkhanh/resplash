import React from 'react';

const smMediaString = '(min-width: 640px)';
const mdMediaString = '(min-width: 768px)';
const lgMediaString = '(min-width: 1024px)';
const xlMediaString = '(min-width: 1280px)';
export const mediaQueries = {
  smUp: smMediaString,
  mdUp: mdMediaString,
  lgUp: lgMediaString,
  xlUp: xlMediaString,
};

export const useMediaQuery = (queryString: string) => {
  const [match, setMatch] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(queryString);
    setMatch(mql.matches);

    const handleMQLChange = (event: MediaQueryListEvent) => {
      setMatch(event.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleMQLChange);
    } else {
      // Safari.....
      mql.addListener(handleMQLChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMQLChange);
      } else {
        // Safari.....
        mql.removeListener(handleMQLChange);
      }
    };
  }, [queryString]);

  return match;
};
