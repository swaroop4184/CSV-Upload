
function Row({ rowData , index}) {
    return (
      <tr
      className={(index%2===0)?"even":"odd"}
      >
        {Object.keys(rowData).map((key) => (
          <td key={key}>{rowData[key]}</td>
        ))}
      </tr>
    );
  }
  
  export default Row;
  