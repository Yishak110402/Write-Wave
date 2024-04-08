import './Homepage.css'

export default function Homepage({ activeUser }) {
  return (
    <div className="homepage">
      {!activeUser ? (
        <h2>Please login to access this page</h2>
      ) : (
        <>
        </>
      )}
    </div>
  );
}
