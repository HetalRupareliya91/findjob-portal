const formatValue = (v) => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (v === undefined || v === null || v === '') return '-';
  return String(v);
};

export default function JobTable({ rows, onDelete }) {
  if (!rows.length) return <p className="empty">No Job records found.</p>;

  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
              <th>title</th>
              <th>description</th>
              <th>salary</th>
              <th>jobType</th>
              <th>Created</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
                <td>{formatValue(row.title)}</td>
                <td>{formatValue(row.description)}</td>
                <td>{formatValue(row.salary)}</td>
                <td>{formatValue(row.jobType)}</td>
                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                <td><button className="btn danger" onClick={() => onDelete(row._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
