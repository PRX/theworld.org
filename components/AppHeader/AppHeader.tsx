/**
 * @file ContentLink.tsx
 * Component for links to content page.
 */

import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { IButton } from '@interfaces';
import DrawerTopNav from './DrawerTopNav';
import DrawerMainNav from './DrawerMainNav';
import DrawerSocialNav from './DrawerSocialNav';
// Material and Theme
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  WithStyles
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { appHeaderStyles } from './AppHeader.styles';
// SVG
import Logo from '@svg/tw-white.svg';
// Contexts
import AppContext from '@contexts/AppContext';

interface AppHeaderProps extends WithStyles<typeof appHeaderStyles> {
}
interface AppHeaderState {
  open: boolean
}

class AppHeader extends Component<AppHeaderProps, AppHeaderState> {

  static contextType = AppContext;

  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
  }

  handleRouteChangeComplete = () => {
    window.setTimeout(() => {
      this.setState({
        open: false
      });
    }, 250);
  }

  render() {
    const {
      menus: { headerNav }
    } = this.context;
    const { classes } = this.props;
    const { open } = this.state;

    const handleDrawerOpen = () => () => {
      this.setState({ open: true });
    };

    const handleDrawerClose = () => () => {
      this.setState({ open: false });
    };

    const renderButton = (button: IButton) => {
      return <div>Button</div>;
    };

    return (
      <>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              disableRipple={true}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen()}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/">
              <a href="/">
                <Logo className={classes.twLogo} title="The World" />
              </a>
            </Link>

            {/* Subscribe Button */}

            {/* Header Nav */}
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={handleDrawerClose()}>
          <Box
            width="100vw"
            height="100%"
            maxWidth="360px"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
          >
            <Box display="flex" justifyContent="flex-end">
              <Button
                color="inherit"
                disableRipple={true}
                startIcon={<ChevronLeftIcon />}
                onClick={handleDrawerClose()}
                className={classes.closeBtn}
                classes={{
                  startIcon: classes.closeBtnIcon
                }}
              >
                Close
              </Button>
            </Box>

            <DrawerTopNav />

            <Box flexGrow="1" bgcolor="background.default" p={2}>
              <DrawerMainNav />
            </Box>

            <DrawerSocialNav />
          </Box>
        </Drawer>
      </>
    );
  }
}

export default withStyles(appHeaderStyles)(AppHeader);
