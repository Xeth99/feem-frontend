import React from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css"; // ← Make sure this CSS is imported!

function MainDrawer({ children, drawerOpen, closeDrawer }) {
  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      level={null}
      handler={false}
      placement="right"
      width="70%"
      duration="300"
      css={{
        position: "fixed",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      {children}
    </Drawer>
  );
}

export default MainDrawer;
