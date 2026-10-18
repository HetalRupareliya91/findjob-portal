const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function PaymentTable({ rows, onDelete }) {
  if (!rows.length) return <p className="empty">No Payment records found.</p>;

  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
              <th>amount</th>
              <th>currency</th>
              <th>status</th>
              <th>Created</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
                <td>{formatValue(row.amount)}</td>
                <td>{formatValue(row.currency)}</td>
                <td>{formatValue(row.status)}</td>
                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                <td><button className="btn danger" onClick={() => onDelete(row._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
