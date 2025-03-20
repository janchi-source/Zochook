"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  SxProps,
  Theme,
  useTheme as useMuiTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ArticleIcon from "@mui/icons-material/Article";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import ProfileMenu from "./ProfileMenu";

interface NavbarProps {
  sx?: SxProps<Theme>;
}

export default function Navbar({ sx }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "profile-menu" || newValue === "theme-toggle") {
      return; // Do nothing when clicking profile or theme toggle
    }
    
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

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O mne", value: "/o-mne", icon: <AccessibilityIcon /> },
    { label: "GDPR", value: "/gdpr", icon: <ArticleIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  const authPaths = [
    { label: "Domov", value: "/prispevok", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "profile-menu",
      icon: <ProfileMenu />,
    }
  ];

  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box sx={{ ...sx }}>
      <BottomNavigation
        value={pathname}
        onChange={handleNavigation}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme === 'dark' ? '#1a1a1a' : 'background.paper',
          borderTop: 1,
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'divider',
          zIndex: 1000,
        }}
      >
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
            sx={{
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
              '&.Mui-selected': {
                color: theme === 'dark' ? '#fff' : muiTheme.palette.primary.main,
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem',
                '&.Mui-selected': {
                  fontSize: '0.875rem',
                },
              },
            }}
          />
        ))}
        <BottomNavigationAction
          onClick={handleThemeToggle}
          value="theme-toggle"
          icon={theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          label="Téma"
          sx={{
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
            '&.Mui-selected': {
              color: theme === 'dark' ? '#fff' : muiTheme.palette.primary.main,
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              '&.Mui-selected': {
                fontSize: '0.875rem',
              },
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
