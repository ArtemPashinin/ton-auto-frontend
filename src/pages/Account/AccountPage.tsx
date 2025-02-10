import { Suspense } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { AccountSkeleton } from "../../components/skeletons";
import AccountPage from "../../components/account/Account";

const Account = () => {
  return (
    <PageWrapper>
      <Suspense fallback={<AccountSkeleton />}>
        <AccountPage />
      </Suspense>
    </PageWrapper>
  );
};

export default Account;
