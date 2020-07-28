import React from 'react';
import clsx from 'clsx';
import { ImageIcon, DisplayGridIcon, SearchIcon } from 'src/icons';
import { ExtendableComponentProps } from '../common';
import { Header } from '../Header';
import { SideBar, SideBarLink } from '../SideBar';
import { ListItemIcon, ListItemText } from '../ListItem';

type Props = ExtendableComponentProps<'main'>;

export const Layout: React.FC<Props> = ({ className, children, ...rest }) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);

  const handleOpenSideBar = () => {
    setIsSideBarOpen(true);
  };

  const handleDismissSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <Header onMenuButtonClick={handleOpenSideBar} />

      <main {...rest} className={clsx('container mx-auto p-5', className)}>
        <SideBar isOpen={isSideBarOpen} onDismiss={handleDismissSideBar}>
          <SideBarLink href="/">
            <ListItemIcon>
              <ImageIcon />
            </ListItemIcon>

            <ListItemText>Photos</ListItemText>
          </SideBarLink>

          <SideBarLink href="/collections">
            <ListItemIcon>
              <DisplayGridIcon />
            </ListItemIcon>

            <ListItemText>Collections</ListItemText>
          </SideBarLink>

          <SideBarLink href="/search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>

            <ListItemText>Search</ListItemText>
          </SideBarLink>
        </SideBar>

        {children}
      </main>
    </>
  );
};
