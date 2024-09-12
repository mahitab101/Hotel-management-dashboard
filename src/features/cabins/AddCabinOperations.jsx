import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

export default function AddCabinOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={[
        { value: "all", label: "all" },
        { value: "no-discount", label: "No Discount" },
        { value: "with-discount", label: "With Discount" },
      ]} />

      <SortBy options={[
        { value: "name-asc", label: "Sort by name (a-z)" },
        { value: "name-desc", label: "Sort by name (z-a)" },
        { value: "regularPrice-asc", label: "Sort by price (low first)" },
        { value: "regularPrice-desc", label: "Sort by price (high first)" },
        { value: "maxCapacity-asc", label: "Sort by Capacity (low first)" },
        { value: "maxCapacity-desc", label: "Sort by Capacity (high first)" },
      ]} />
    </TableOperations>
  )
}
