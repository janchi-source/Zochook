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
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isSun, setIsSun] = React.useState(true);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
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

  const handleThemeToggle = () => {
    setIsSun((prev) => !prev);
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
      <Box
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
          }}
      >
        <BottomNavigation
            showLabels
            value={pathname}
            onChange={(event, newValue) => handleNavigation(event, newValue)}
            sx={{
              backgroundColor: 'transparent',
              '& .MuiBottomNavigationAction-root': {
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
        >
          {navigationPaths.map((path) => (
              <BottomNavigationAction
                  key={path.value}
                  label={path.label}
                  value={path.value}
                  icon={path.icon}
                  sx={{
                    '& .MuiBottomNavigationAction-label': {
                      fontSize: '0.75rem',
                      '&.Mui-selected': {
                        fontSize: '0.875rem',
                      },
                    },
                  }}
              />
          ))}
          <IconButton
              onClick={handleThemeToggle}
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: 'white',
              }}
          >
            {isSun ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
          </IconButton>
        </BottomNavigation>
      </Box>
  );
}
