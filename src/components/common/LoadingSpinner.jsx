import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="danger" role="status">
        <span className="visually-hidden">Loading movies</span>
      </Spinner>
    </div>
  )
}

export default LoadingSpinner