import React, { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
  // eslint-disable-next-line
  const value = useMemo(() => ({ mobileDrawer, toggleDrawer }), [mobileDrawer]);
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default SidebarProvider;
