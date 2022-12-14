import 'react-table/react-table.css'

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React, { useState, useEffect, useContext, useMemo } from "react";
import ReactTable from "react-table";
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

import callMethod from '../../utils/callMethod';
import floatFormat from '../../utils/floatFormat';
import FormOrg from './FormOrg';
import UserInfo from '../../contexts/UserInfo';

const CURSOR_POINTER = { cursor: 'pointer' };

const Home = () => {
  const { user } = useContext(UserInfo);
  const isAdmin = useMemo(() => !!user?.profile?.isAdmin, [user]);

  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setCurrentItem({
      isEdit: false,
      data: {},
    });
  };

  const editItem = (info) => {
    const {
      _id, name, address, nit, tel
    } = info;

    setCurrentItem({
      isEdit: true,
      data: {
        _id,
        name,
        address,
        nit,
        tel,
      },
    });
    setOpen(true);
  };

  const loadList = () => {
    callMethod('getOrganizations')
      .then(({ res, err }) => {
        if (err) {
          toast.error(err)

          return;
        }

        setList(res?.list || [])
      });
  };

  const removeItem = async (_id) => {
    const result = await Swal.fire({
      title: 'Delete item',
      text: 'Do you want to continue? The invetory related will be removed',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#4caf50',
    });

    if (result.isConfirmed) {
      const { err } = await callMethod('removeOrganization', { _id });

      if (err) {
        toast.error(err);

        return;
      }

      loadList();
      toast.success('Organization successfuly deleted!');
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const Columns = [
    {
      Header: "Name",
      accessor: 'name',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Address",
      accessor: 'address',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "NIT",
      accessor: 'nit',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={floatFormat(row.value)}>
          <span style={CURSOR_POINTER}>
            {floatFormat(row.value)}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Cellphone",
      accessor: 'tel',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Actions",
      accessor: '_id',
      style: { textAlign: 'center' },
      sortable: false,
      Cell: (row) => (
        <>
          <Button variant="contained" color="success" size="small" href={`/inventory/${row.value}`}>
            Inventory
          </Button>
          &nbsp;
          <Tooltip title="Edit">
            <span>
              <IconButton aria-label="Edit" color='warning' onClick={() => editItem(row.original)} disabled={!isAdmin}>
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton aria-label="Delete" color='error' onClick={() => removeItem(row.value)} disabled={!isAdmin}>
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <Chip color='primary' label={`${list.length} row(s)`} />
        </Grid>
        <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={loadList} color="primary">Refresh</Button>
          &nbsp;
          <Button variant="contained" onClick={handleOpen} color="success" disabled={!isAdmin}>New</Button>
        </Grid>
      </Grid>
      <br />
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <ReactTable
            data={list}
            columns={Columns}
            defaultPageSize={10}
            pageSizeOptions={[5, 10, 20]}
            className="-striped"
          />
        </Grid>
      </Grid>
      <FormOrg
        open={open}
        setOpen={setOpen}
        loadList={loadList}
        currentItem={currentItem}
      />
    </div>
  );
}

export default Home;
