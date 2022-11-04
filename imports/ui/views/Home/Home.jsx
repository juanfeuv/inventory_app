import 'react-table/react-table.css'

import _ from "lodash";

import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ReactTable from "react-table";

import callMethod from '../../utils/callMethod';
import FormOrg from './FormOrg';

const Home = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const getColleges = (isMap) => {
    callMethod('getColleges', { isMap })
      .then(({ res }) => setList(res));
  };

  // const isMap = useMemo(() => value === 0, [value]);

  // useEffect(() => {
  //   getColleges(value === 0);
  // }, []);

  const Columns = [
    {
      Header: "Name",
      accessor: 'name',
      Cell: (row) => (
        <span>
          {row.original}
        </span>
      ),
    },
    {
      Header: "Address",
      accessor: 'address',
      Cell: (row) => (
        <span>
          {row.original}
        </span>
      ),
    },
    {
      Header: "NIT",
      accessor: 'nit',
      Cell: (row) => (
        <span>
          {row.original}
        </span>
      ),
    },
    {
      Header: "Cellphone",
      accessor: 'tel',
      Cell: (row) => (
        <span>
          {row.original}
        </span>
      ),
    },
    {
      Header: "Actions",
      accessor: '_id',
      Cell: (row) => (
        <span>
          {row.original}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          {/* <Button variant="contained">Filtros de búsqueda</Button> */}
        </Grid>
        <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={handleOpen}>New organization</Button>
        </Grid>
      </Grid>
      <br />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ReactTable
            data={list}
            columns={Columns}
            defaultPageSize={10}
            className="-striped"
          />
        </Grid>
      </Grid>
      <FormOrg open={open} setOpen={setOpen} />
    </div>
  );
}

export default Home;
