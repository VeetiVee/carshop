import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditCar(props) {
const [open, setOpen] = useState(false);
const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: '',
})

  const handleClickOpen = () => {
    setCar({
        brand: props.params.data.brand,
        model: props.params.data.model,
        color: props.params.data.color,
        fuel: props.params.data.fuel,
        year: props.params.data.year,
        price: props.params.data.price,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      props.updateCar(props.params.value, car);
      handleClose();
  }

  const inputChanged = (event) => {
      setCar({...car, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            name="brand"
            brand={car.brand}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Brand"
            fullWidth
            variant="standard"
          />
           <TextField
            name="model"
            brand={car.model}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Model"
            fullWidth
            variant="standard"
          />
           <TextField
            name="color"
            brand={car.color}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Color"
            fullWidth
            variant="standard"
          />
           <TextField
            name="fuel"
            brand={car.fuel}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Fuel"
            fullWidth
            variant="standard"
          />
           <TextField
            name="year"
            brand={car.year}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Year"
            fullWidth
            variant="standard"
          />
           <TextField
            name="price"
            brand={car.price}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCar;