import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { useLocation } from 'react-router-dom';

import { generateBreadcrumbs } from './helper';

export default function BasicBreadcrumbs() {
  const location = useLocation();

  const breadcrumbs = generateBreadcrumbs(location?.pathname);

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map(item => (
          <Link key={item.href} underline="hover" color="inherit" href={item.href}>
            {item.text}
          </Link>
        ))}
        {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
      </Breadcrumbs>
    </div>
  );
}
