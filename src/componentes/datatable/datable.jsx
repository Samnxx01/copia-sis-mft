import React from 'react'
import DataTable from 'datatables.net-dt';
 
let table = new DataTable('#myTable')

export default function datable() {
  return (
    <div>
      <table id="myTable" className="display">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Data 1</td>
            <td>Row 1 Data 2</td>
        </tr>
        <tr>
            <td>Row 2 Data 1</td>
            <td>Row 2 Data 2</td>
        </tr>
    </tbody>
</table>
    </div>
  )
}
