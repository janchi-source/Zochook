"use client";
import { useState, MouseEvent } from 'react';
import { Menu, MenuItem, IconButton, Avatar, useTheme } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push('/profile');
    handleClose();
  };

  const handleLogout = () => {
    router.push('/auth/odhlasenie');
    handleClose();
  };

  if (!session?.user) return null;

  return (
    <>
      <IconButton 
        onClick={handleClick}
        sx={{ 
          padding: 0,
          width: '24px', 
          height: '24px'
        }}
      >
        <Avatar 
          alt={session.user.name || "User"} 
          src={session.user.image || undefined}
          sx={{ width: 24, height: 24 }}
        >
          {!session.user.image && (session.user.name?.charAt(0) || "U")}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            minWidth: '150px',
            boxShadow: theme.shadows[3],
            mt: 0,
            mb: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiMenuItem-root': {
            fontSize: '0.9rem',
            py: 1,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
          '& .MuiList-root': {
            padding: '4px 0',
          }
        }}
      >
        <MenuItem onClick={handleProfile}>
          Môj profil
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.dark }}>
          Odhlásiť sa
        </MenuItem>
      </Menu>
    </>
  );
} 