
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from '../features/cabins/CabinTable'
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from '../features/cabins/AddCabinOperations'

function Cabins() {

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations />
    </Row>
     <AddCabin />
    <Row>
      <CabinTable />
    </Row>
    </>
  );
}

export default Cabins;
