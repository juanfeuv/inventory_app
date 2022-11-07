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
  name: '',
  address: '',
  nit: '',
  tel: '',
}

const FormOrg = ({ open, setOpen, loadList, currentItem }) => {
  const [form, setForm] = useState(DEFAULT_FORM);

  const isEdit = useMemo(() => !!currentItem?.isEdit, [currentItem]);

  const handlechange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const handleClose = () => setOpen(false);

  const createOrg = async () => {
    const { err } = await callMethod('createOrganization', form);

    if (err) {
      toast.error(err);

      return;
    }

    setOpen(false);
    loadList();
    toast.success('Organization successfully created!');
  };

  const updateOrg = async () => {
    const { name, address, tel } = form;

    const { err } = await callMethod('editOrganization', {
      _id: currentItem?.data?._id,
      name,
      address,
      tel,
    });

    if (err) {
      toast.error(err);

      return;
    }

    setOpen(false);
    loadList();
    toast.success('Organization successfully update!');
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
            {isEdit ? 'Edit organization' : 'New organization'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="standard"
                type="text"
                fullWidth
                required
                name="name"
                value={form?.name}
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="NIT"
                variant="standard"
                type="number"
                fullWidth
                required
                name="nit"
                value={form?.nit}
                disabled={isEdit}
                onChange={handlechange}
                inputProps={{
                  min: 0
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="standard"
                type="text"
                fullWidth
                required
                name="address"
                value={form?.address}
                onChange={handlechange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cellphone"
                variant="standard"
                type="number"
                fullWidth
                required
                name="tel"
                value={form?.tel}
                onChange={handlechange}
                inputProps={{
                  min: 0
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="success"
                onClick={isEdit ? updateOrg : createOrg}
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

FormOrg.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  loadList: PropTypes.func.isRequired,
  currentItem: PropTypes.object,
};

FormOrg.defaultProps = {
  currentItem: null,
};

export default FormOrg;
