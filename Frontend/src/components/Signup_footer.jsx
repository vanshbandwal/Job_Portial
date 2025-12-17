import * as React from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { FaInstagram } from "react-icons/fa";
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';

export default function Signup_Footer() {
  const [color, setColor] = React.useState('neutral');
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={[
        {
          flexGrow: 1,
          p: 2,
          borderRadius: { xs: 0, sm: 'sm' },
        },
        color !== 'neutral' && {
          bgcolor: `${color}.800`,
        },
      ]}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
        >
          <ColorLensRoundedIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <FaInstagram />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: 'initial' } }}
          >
            <img alt="" src="data:image/png;base64,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" />
          </AspectRatio>
          <CardContent>
            <Typography level="body-sm">"Find your dream job with Naukri.com."</Typography>
          </CardContent>
        </Card>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, '--ListItem-radius': '8px' }}
        >
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>About</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Products</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Joy UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>MUI Base</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Material UI</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
