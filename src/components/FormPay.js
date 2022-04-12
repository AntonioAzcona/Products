import React, { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', 
  },
});

export default function FormPayProducts({ datos, setDatos }) {

  const [open, setOpen] = React.useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [tipoAlert, setTipoAlert] = useState('')
  
  const [newData, setNewData] = useState({
    sku: '',
    name: '',
    quantity: '',
    price: ''
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleInputChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name] : event.target.value
    })
  }

  const sendData = (event) => {
    event.preventDefault();
    if(newData.sku != '' && newData.name != '' && newData.quantity != '' && newData.price != ''){
      setDatos([...datos, newData])
      document.getElementById('sku').value = ''
      document.getElementById('name').value = ''
      document.getElementById('quantity').value = ''
      document.getElementById('price').value = ''
      setNewData({
        sku: '',
        name: '',
        quantity: '',
        price: ''
      })
    } else {
      setAlertMessage('Rellena todos los campos por favor')
      setTipoAlert('warning')
      setOpen(true)
    }
  }

  return (
    <>
      <form onSubmit={sendData}>
        <Box
        component="form"
        noValidate
        sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr' },
            gap: 2,
        }}
        > 
        <ValidationTextField
            label='Sku'
            required
            variant="outlined"
            defaultValue=""
            id='sku'
            name='sku'
            type='text'
            onChange={handleInputChange}
        />
        <ValidationTextField
            label='Name'
            required
            variant="outlined"
            defaultValue=""
            id='name'
            type='text'
            name='name'
            onChange={handleInputChange}
        />
        <ValidationTextField
            label='Quantity'
            required
            variant="outlined"
            defaultValue=""
            id='quantity'
            type='number'
            name='quantity'
            onChange={handleInputChange}
        />
        <ValidationTextField
            label='Price'
            required
            variant="outlined"
            defaultValue="-"
            id='price'
            type='number'
            name='price'
            onChange={handleInputChange}
        />
        </Box>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            m={3}
        >
        <Button 
          variant="contained" 
          endIcon={<AddCircleIcon />} 
          color="success" 
          type='submit'
        > Agregar producto
        </Button>
        </Stack>
      </form>
      <Snackbar style={{ width: '100%', textAlign:'center' }} spacing={2} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity={tipoAlert}>{alertMessage}</Alert>
      </Snackbar>
    </>
  );
}
