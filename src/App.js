import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TablePay from './components/TablePayment';
import FormPayProducts from './components/FormPay';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function AutoGrid() {

  const [datos, setDatos] = useState([])
  const [products, setProducts] = useState([])
  const [numOrder, setNumOrder] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [flag, setFlag] = useState(false)

  const [open, setOpen] = React.useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [tipoAlert, setTipoAlert] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleChangeOrder = (event) => {
    setNumOrder(event.target.value);
    let orderFilter = products.filter(producto => producto.number == event.target.value)[0];
    setDatos(orderFilter.items)
  };

  const handleMessagePay = (event) => {
    setAlertMessage('Pago realizado correctamente')
    setTipoAlert('info')
    setOpen(true)
  }
  
  const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajd ZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyD bMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ';
  const apiURL = 'https://eshop-deve.herokuapp.com/api/v2/orders';

    const authAxios = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await authAxios.get(`${apiURL}`)
                if(request && request['data'] && request['data']['orders']) {
                    let response = request['data']['orders']
                    setProducts(response)
                    if(!flag){
                      let items = []
                      let ordenes = []
                      response.map(ele => {
                        items.push(ele.items)
                        ordenes.push(ele.number)
                      })
                      let objs = []
                      items.forEach(element => {
                        element.forEach(element2 => {
                          objs.push(element2)
                        });
                      });
                      setDatos(objs)
                      setOrders(ordenes)
                      setFlag(true)
                    }
                }
            } catch (err) {
                console.log('err', err)
            }
        }
        fetchData();
    }, []);

  return (

    <Grid container style={{ background: '#006500' }}>
      <Box sx={{ flexGrow: 1 }} m={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Item>
            <Div>{"Agregar producto"}</Div>
            <FormPayProducts datos={datos} setDatos={setDatos} />
          </Item>
        </Grid>

        <Grid item xs={2}>
        <Item style={{ textAlign: 'left' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"># Orden</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={numOrder}
                label="NumOrder"
                onChange={handleChangeOrder}
              >
                {
                  orders.map((ele, index) => {
                    return <MenuItem value={ele}>#{ele}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            </Item>
        </Grid>

        <Grid 
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          item xs={10}
        >
          <Item style={{ textAlign: 'left' }}>
            <h3 style={{ color: '#000000' }}>Número de orden: {numOrder}</h3>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Item>
            <Div>{"Listado de productos"}</Div>
            <TablePay products={datos} />
          </Item>
        </Grid>
        <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              m={3}
            >
              <Button 
                variant="contained" 
                endIcon={<PaidIcon />} 
                color="info" 
                onClick={handleMessagePay}
              > Pagar
              </Button>
            </Stack>
          <Snackbar spacing={6} open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity={tipoAlert}>{alertMessage}</Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
    </Grid>
  );
}
