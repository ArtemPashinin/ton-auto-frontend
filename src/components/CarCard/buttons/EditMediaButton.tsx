import { Button, Col } from "react-bootstrap";

const EditMediaButton = () => {
  return (
    <Col className="p-0  mt-2" xs={12}>
      <Button
        className="w-100 fade-outline-button py-2"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        Manage photos
      </Button>
    </Col>
  );
};

export default EditMediaButton;
