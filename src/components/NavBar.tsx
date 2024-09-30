import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Navigate based on index
    switch (newValue) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/vyhladavanie');
        break;
      case 2:
        router.push('/pridat');
        break;
      case 3:
        router.push('/notifikacie');
        break;
      case 4:
        router.push(`/profile/${userId}`); // use logged-in userId
        break;
    }
  };

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Add" icon={<AddBoxIcon />} />
      <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
