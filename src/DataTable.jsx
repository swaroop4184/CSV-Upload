
import Row from './Row';
import './DataTable.css';

const DataTable = ({data}) => {
const columns = Object.keys(data[0]);
  return (
    <table className='table' cellSpacing='0'>
      <thead id='tableHeader'>
        <tr id='tableHeader'>
          {columns.map((column) => (
            <th key={column} className='header'>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <Row key={index} index={index} rowData={rowData} />
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
