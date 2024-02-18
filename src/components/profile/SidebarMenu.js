import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography, Divider, Paper } from '@mui/material';
import { BookOnlineOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SensorOccupiedOutlinedIcon from '@mui/icons-material/SensorOccupiedOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
const useStyles = makeStyles((theme) => ({
  // Add your styles here
}));

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, items: [] },
  {
    text: 'Booking', icon: <CollectionsBookmarkOutlinedIcon/>, items: [
      'On Hold', 'Ticketed', 'Process', 'Pending', 'Unconfirmed', 'Expired', 'Cancelled'
    ]
  },
  { text: 'Deposit', icon: <AttachMoneyOutlinedIcon/> , items: [] },
  { text: 'Statements', icon: <DescriptionOutlinedIcon/>, items: [] },
  {
    text: 'My Guest', icon: <SensorOccupiedOutlinedIcon/>, items: [
      'Add Guest', 'All Guest'
    ]
  },
  {
    text: 'Documents', icon: <DocumentScannerOutlinedIcon/>, items: [
      'Passport', 'Visa', 'Others'
    ]
  },
  { text: 'Offers', icon: <CardGiftcardOutlinedIcon/>, items: [] },
];

const SidebarMenu = () => {
    
  const [open, setOpen] = useState({});

  const handleClick = (text) => {
    setOpen(prevOpen => ({ ...prevOpen, [text]: !prevOpen[text] }));
  };

  const renderMenuItems = (items) => {
    
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <ListItem button onClick={() => handleClick(item.text)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
          {item.items.length > 0 ? (open[item.text] ? <ExpandLess /> : <ExpandMore />) : null}
        </ListItem>
        <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.items.map((subItem, subIndex) => (
              <ListItem button key={subIndex}>
                <ListItemText inset primary={subItem} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    ));
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         
        </ListSubheader>
      }
    >
      {renderMenuItems(menuItems)}
    </List>
  );
};

export default SidebarMenu;
