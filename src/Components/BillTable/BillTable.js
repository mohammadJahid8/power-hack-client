import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./BillTable.css";

function BillTable() {
  return (
    <div className="container">
      <Table responsive>
        <thead>
          <tr>
            <th>Billing Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Paid amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>

            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <div className="action-container d-flex justify-content-center">
                <Button
                  className="btn btn-primary me-2 btn-margin"
                  size="sm"
                  variant="primary"
                >
                  Edit
                </Button>
                <Button className="btn btn-danger " size="sm" variant="danger">
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default BillTable;
