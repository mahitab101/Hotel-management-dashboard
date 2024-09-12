import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isPending, booking } = useBooking();
  const { ischeckingIn, checkinFun } = useCheckin();
  const { isPending:isLoadingSettings,settings } = useSettings();
  const moveBack = useMoveBack();
  //
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking])
console.log("settings>>",settings);

  
if (isPending || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numOfNights,
  } = booking;

  const optionalBreakfastPrice =
  settings?.breakfastPrice * numOfNights * numGuests;
console.log("optionalBreakfastPrice>>",numOfNights);

  function handleCheckin() {
    if (!confirmPaid) return;
    if(addBreakfast){
      checkinFun({bookingId,breakfast:{
        hasBreakfast:true,
        extraPrice:totalPrice+optionalBreakfastPrice,
      }})
    }else{
      checkinFun({bookingId,breakfast:{}})
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {hasBreakfast && <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add)
            setConfirmPaid(false)
          }}
          id="breakfast"
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || ischeckingIn}
        >
          I confirm that {guests.fullName} has paid the total amout 
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button variation="primary" onClick={handleCheckin} disabled={!confirmPaid || ischeckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
