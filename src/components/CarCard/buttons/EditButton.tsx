import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  id: string;
  title: string;
  path: string;
}

const EditButton = ({ id, title, path }: EditButtonProps) => {
  const navigate = useNavigate();
  return (
    <Col className="p-0  mt-2" xs={12}>
      <Button
        className="w-100 fade-outline-button py-2"
        onClick={(event) => {
          event.stopPropagation();
          navigate(`${id}/${path}`);
        }}
      >
        {title}
      </Button>
    </Col>
  );
};

export default EditButton;
