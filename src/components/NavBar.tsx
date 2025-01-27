"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ArticleIcon from "@mui/icons-material/Article";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon
import { useRouter, usePathname } from "next/navigation"; // usePathname to detect the current route
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes"; // Assuming ThemeToggle relies on next-themes

export default function Navbar() {
  const [isSun, setIsSun] = React.useState(true); // State for sun/moon toggle
  const { theme, setTheme } = useTheme(); // Using next-themes hook for theme toggling
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const { data: session, status } = useSession();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    if (
      !session &&
      newValue !== "/auth/registracia" &&
      newValue !== "/auth/prihlasenie" &&
      newValue !== "/" &&
      newValue !== "/o-mne" &&
      newValue !== "/gdpr"
    ) {
      router.push("/auth/registracia");
    } else {
      router.push(newValue);
    }
  };

  // Toggle the sun/moon and theme
  const handleThemeToggle = () => {
    setIsSun((prev) => !prev);
    setTheme(theme === "light" ? "dark" : "light"); // Toggle between light and dark themes
  };

  // Non-authenticated navigation paths
  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O mne", value: "/o-mne", icon: <AccessibilityIcon /> },
    { label: "GDPR", value: "/gdpr", icon: <ArticleIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  // Authenticated navigation paths
  const authPaths = [
    { label: "Domov", value: "/prispevok", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "/profile",
      icon: session?.user?.image ? (
        <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || undefined} />
      ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      ),
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={pathname} // Use the current path as the selected value
        onChange={(event, newValue) => handleNavigation(event, newValue)}
      >
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
            sx={{
              color: pathname === path.value ? "blue" : "inherit", // Highlight the active icon
            }}
          />
        ))}
        {/* Sun/Moon Toggle */}
        <IconButton
          onClick={handleThemeToggle}
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          color="inherit"
        >
          {isSun ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
        </IconButton>
      </BottomNavigation>
    </Box>
  );
}
