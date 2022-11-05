import 'react-table/react-table.css'

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';

import callMethod from '../../utils/callMethod';
import FormItem from './FormItem';

const CURSOR_POINTER = { cursor: 'pointer' };

const Inventory = () => {
  const { id } = useParams();

  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [org, setOrg] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setCurrentItem({
      isEdit: false,
      data: {},
    });
  };

  const getOrg = () => {
    callMethod('getOrganizationById', { _id: id })
      .then(({ res }) => setOrg(res?.org));
  };

  const editItem = (info) => {
    const {
      _id, item, quantity, price
    } = info;

    setCurrentItem({
      isEdit: true,
      data: {
        _id,
        item,
        quantity,
        price
      },
    });
    setOpen(true);
  };

  const loadList = () => {
    callMethod('getInventory', { organizationId: id })
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
      text: 'Do you want to continue?',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      showCancelButton: true,
      cancelButtonColor: '#f44336',
      confirmButtonColor: '#4caf50',
    });

    if (result.isConfirmed) {
      const { err } = await callMethod('removeInventory', { _id });

      if (err) {
        toast.error(err);

        return;
      }

      loadList();
      toast.success('Item successfuly deleted!');
    }
  };

  useEffect(() => {
    getOrg();
    loadList();
  }, []);

  const Columns = [
    {
      Header: "Item",
      accessor: 'item',
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
      Header: "Quantity",
      accessor: 'quantity',
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
      Header: "Price",
      accessor: 'price',
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
          <Tooltip title="Edit">
            <IconButton aria-label="Edit" color='warning' onClick={() => editItem(row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" color='error' onClick={() => removeItem(row.value)}>
              <DeleteIcon />
            </IconButton>
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
          &nbsp;
          <Chip color='primary' label={`Organization: ${org?.name || ''}`} />
        </Grid>
        <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={() => { }} color="warning">PDF</Button>
          &nbsp;
          <Button variant="contained" onClick={loadList} color="primary">Refresh</Button>
          &nbsp;
          <Button variant="contained" onClick={handleOpen} color="success">New</Button>
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
      <FormItem
        open={open}
        setOpen={setOpen}
        loadList={loadList}
        currentItem={currentItem}
        organizationId={id}
      />
    </div>
  );
}

export default Inventory;
