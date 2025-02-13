import { useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const EditDescriptionPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <PageWrapper backButton hideTabBar>
      <p className="defaultText">{id}</p>
    </PageWrapper>
  );
};

export default EditDescriptionPage;
