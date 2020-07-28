import React from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FC = ({ children }) => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const domNode = document.createElement('div');
    document.body.appendChild(domNode);
    setContainer(domNode);

    return () => {
      if (domNode) {
        domNode.parentElement?.removeChild(domNode);
        setContainer(null);
      }
    };
  }, []);

  return container && ReactDOM.createPortal(children, container);
};
