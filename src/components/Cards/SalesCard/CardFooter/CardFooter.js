import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Typography, Grid} from '@mui/material';

const CardFooter = ({vehiclePrice, analytics, totalBids}) => {
    return (
        <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{padding: '5px 10px 5px 10px'}}>
            <Grid item>
                <Grid container flex>
                    <Grid item>
                        <ShoppingCartIcon sx={{color: 'white', marginRight: 1, fontSize: 20}}/>
                    </Grid>
                    <Grid item>
                        <Typography color={'white'} fontSize={14} fontWeight={'bold'}>{vehiclePrice?.currency.code} {vehiclePrice?.amount}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item padding={1}>
                <Grid container spacing={1}>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <VisibilityIcon sx={{marginRight:1, fontSize:14}}/>
                            </Grid>
                            <Grid item>
                                <Typography fontSize={14} >{analytics.views}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <ShoppingCartIcon sx={{fontSize:14, marginRight:1}} />
                            </Grid>
                            <Grid item>
                                <Typography fontSize={14}>{totalBids}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default CardFooter;