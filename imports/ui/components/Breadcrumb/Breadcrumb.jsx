import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

import { emphasize, styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import './style.css';

import { generateBreadcrumbs } from './helper';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function BasicBreadcrumbs() {
  const location = useLocation();

  const breadcrumbs = generateBreadcrumbs(location?.pathname);

  return (
    <div role="presentation" className='breadcrumb'>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((item, index) => {
          if (index === 0) {
            return (
              <StyledBreadcrumb
                key={item.href}
                component="a"
                href={item.href}
                label="Home"
                icon={<HomeIcon fontSize="small" />}
              />
            );
          }

          return (
            <StyledBreadcrumb
              key={item.href}
              component="a"
              href={item.href}
              label={item.text}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
