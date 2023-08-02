
import { useCardTokenizationMutation, useGenerateCardUrlMutation } from "@/redux/apis/paymentApi";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";

const PaymentCardsModal = ({
    savedCards,
    openCardsModal,
    handleToggleCardsModal,
    amount,
    type,
    inspectionReportId,
    cb
}) => {
    const [generateUrlQ, generateUrlRes] = useGenerateCardUrlMutation();
    const [cardTokenQ] = useCardTokenizationMutation();
    const [selectedCard, setSelectedCard] = useState();
    const handleToggleCard = (e) => setSelectedCard(e.target.value);
    const handleUseCard = () => {
        cardTokenQ({ amount, card: selectedCard, type, inspectionReportId }).unwrap()
            .then(({ url }) => {
                const newWindow = window.open(url,"","height=200,width=400,scrollbars=no")
                const interval = setInterval(() => {
                    if (newWindow.closed) {
                        clearInterval(interval);
                        if (cb) cb()
                        else window.location.reload()
                    }
                }, 500);
                setSelectedCard()
            }).catch(e => {

            })
    }

    const handleAddNewCard = () => {
        generateUrlQ({ amount, type, inspectionReportId }).unwrap()
            .then(({ url }) => {
                // const newWindow = window.open(url)
                const newWindow = window.open(url,"","height=200,width=400,scrollbars=no")
                
                const interval = setInterval(() => {
                    if (newWindow.closed) {
                        clearInterval(interval);
                        if (cb) cb()
                        else window.location.reload()
                    }
                }, 500);

            }).catch(e => {

            })
    }
    return (
        <Dialog open={openCardsModal} onClose={handleToggleCardsModal} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box display={"flex"} justifyContent={"center"} p={0}>
                    <p>Your cards</p>
                </Box>
            </DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Saved Cards</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={handleToggleCard}
                    >
                        {savedCards?.map((card, i) => {
                            return (
                                <FormControlLabel key={i} sx={{ height: 60 }} value={card.id} control={<Radio />} label={
                                    <>
                                        <Typography fontSize={14} fontWeight={800}>
                                            Ending in:&nbsp;  ***{card.cardNumber}

                                        </Typography>
                                        <Typography
                                            variant="overline"
                                            fontWeight={600}
                                        >
                                            {card.brand}
                                            &nbsp;&nbsp;
                                            <Typography
                                                fontSize={12}
                                                sx={{ display: 'inline-block' }}
                                            >
                                                Expires:{card.expiryDate}
                                            </Typography>
                                        </Typography>


                                    </>
                                } />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleToggleCardsModal();setSelectedCard();}}>Cancel</Button>
                <Button onClick={handleUseCard} disabled={!selectedCard}>Ok</Button>
                <Button onClick={handleAddNewCard}>Add new card</Button>

            </DialogActions>

        </Dialog>
    )
}


export default PaymentCardsModal;