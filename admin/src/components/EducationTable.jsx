const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function EducationTable({ rows, onDelete }) {
  if (!rows.length) return <p className="empty">No Education records found.</p>;

  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
              <th>institute</th>
              <th>degree</th>
              <th>passingYear</th>
              <th>Created</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
                <td>{formatValue(row.institute)}</td>
                <td>{formatValue(row.degree)}</td>
                <td>{formatValue(row.passingYear)}</td>
                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                <td><button className="btn danger" onClick={() => onDelete(row._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
