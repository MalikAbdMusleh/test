import { Typography, Grid, Container, Button } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { green } from '@mui/material/colors'
import { Avatar } from '@mui/material'
import BoxData from '@/components/Cards/BoxData'
import { Warning } from '@mui/icons-material'
import { orange } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostCompleteSuccess from '../c2c/post-complete-success';

export default function TopUp() {
  const [copied, setCopied] = useState(false);
  const { user } = useSelector(state => state.auth)

  let boxes = [
    { title: 'Beneficiary name', value: user?.favouriteBank?.name },
    { title: 'Bank name', value: user?.favouriteBank?.beneficiaryName },
    { title: 'Your assigned IBAN', value: user?.virtualIban },
    { title: 'For reference', value: '+966078543154' },
  ]
  const renderBox = boxes.map((box, i) => <BoxData
    key={i}
    text={box.title}
    value={box.value}
    onCopy={() => {
      navigator.clipboard.writeText(box.value)
      setCopied(true)
    }}
    copied={copied}
  />
  )


  useEffect(() => {
    if (copied) {
      navigator.clipboard.readText()
    }
  }, [copied])

  return (
    <Grid
      container
      width={'100%'}
      alignItems={'center'}
      px={{ xs: 0, sm: 3 }}
      height={'100%'}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: '30px' }}
        >
          <Avatar sx={{ bgcolor: green[500] }}>
            <CheckCircle sx={{ color: 'white' }} />
          </Avatar>{' '}
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          display="flex"
          justifyContent="center"
          mb={1}
        >
          TipTop
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          style={{ textAlign: 'center' }}
        >
          <Typography fontSize={16}>
            We have assigned a unique IBAN for you to use when making payments to us.
            Only transfer money to the IBAN assigned to you.
            Please do not share it with anyone.
            You will receive a notification once we receive your payment.
          </Typography>
        </Grid>
      </Grid>

      {renderBox}
      <Grid
        item
        xs={12}
        container
        my={2}
        alignItems={'center'}
      >
        <Grid item mr={1}>
          <Avatar sx={{ bgcolor: orange[500], width: '30px', height: '30px' }}>
            <Warning sx={{ color: 'black', fontSize: '14px' }} />
          </Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography fontSize={14}>
            Note that the bank transfer might take a couple of days to reach your wallet.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}