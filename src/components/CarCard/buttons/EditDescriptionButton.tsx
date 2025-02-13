import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface EditDescriptionButtonProps {
  id: string;
}

const EditDescriptionButton = ({ id }: EditDescriptionButtonProps) => {
  const navigate = useNavigate();

  return (
    <Col className="p-0  mt-2" xs={12}>
      <Button
        className="w-100 fade-outline-button py-2"
        onClick={(event) => {
          event.stopPropagation();
          navigate(`${id}/editDescription`);
        }}
      >
        Edit
      </Button>
    </Col>
  );
};

export default EditDescriptionButton;
