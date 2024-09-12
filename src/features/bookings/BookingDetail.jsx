import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isPending, booking } = useBooking();
  const { ischeckingOut, checkoutFun } = useCheckout();
  const {isDeleting,DeleteBooking} = useDeleteBooking();
  // const booking = {};
  // const status = "checked-in";

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />

  const {status ,id:bookingId} = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      {status==="unconfirmed" && <Button variation="primary" onClick={()=>navigate(`/checkin/${bookingId}`)}>Check in</Button>}
      {status==="checked-in" && <Button variation="primary" onClick={()=>{checkoutFun(bookingId)}} disabled={ischeckingOut}>Check out</Button>}
      <Modal>
      <Modal.Open opens="delete">
              <Button variation="danger">Delete Booking</Button>
            </Modal.Open>
         

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => DeleteBooking(bookingId,{
                onSuccess:()=>navigate(-1)
              })}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;