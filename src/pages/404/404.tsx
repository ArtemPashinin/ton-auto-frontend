import NotFound from "../../components/NotFound/NotFound";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const NotFoundPage = () => {
  return (
    <PageWrapper hideTabBar={true}>
      <NotFound />
    </PageWrapper>
  );
};

export default NotFoundPage;
