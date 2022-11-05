import { toast } from 'react-toastify';

import React, { useEffect, useMemo, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import callMethod from "../../utils/callMethod";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DEFAULT_FORM = {
  item: '',
  quantity: '',
  price: '',
}

const FormItem = ({ open, setOpen, loadList, currentItem, organizationId }) => {
  const [form, setForm] = useState(DEFAULT_FORM);

  const isEdit = useMemo(() => !!currentItem?.isEdit, [currentItem]);

  const handlechange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const handleClose = () => setOpen(false);

  const createItem = async () => {
    const { err } = await callMethod('createInventory', { ...form, organizationId });

    if (err) {
      toast.error(err);

      return;
    }

    setOpen(false);
    loadList();
    toast.success('Item successfully created!');
  };

  const updateItem = async () => {
    const { err } = await callMethod('editInventory', {
      ...form,
      _id: currentItem?.data?._id,
    });

    if (err) {
      toast.error(err);

      return;
    }

    setOpen(false);
    loadList();
    toast.success('Item successfully update!');
  };

  useEffect(() => {
    if (open) {
      if (isEdit) {
        const { _id, ...res } = currentItem?.data || {};
        setForm(res);
        return;
      }

      setForm(DEFAULT_FORM);
    }
  }, [open, isEdit]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {isEdit ? 'Edit item' : 'New item'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Item"
                variant="standard"
                type="text"
                fullWidth
                required
                name="item"
                value={form?.item}
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                variant="standard"
                type="number"
                fullWidth
                required
                name="quantity"
                value={form?.quantity}
                onChange={handlechange}
                inputProps={{
                  min: 0,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="standard"
                type="number"
                fullWidth
                required
                name="price"
                value={form?.price}
                onChange={handlechange}
                inputProps={{
                  min: 0,
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="success"
                onClick={isEdit ? updateItem : createItem}
              >
                {isEdit ? 'Edit' : 'Create'}
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

FormItem.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadList: PropTypes.func.isRequired,
  currentItem: PropTypes.object,
  organizationId: PropTypes.string.isRequired,
};

FormItem.defaultProps = {
  currentItem: null,
};

export default FormItem;
