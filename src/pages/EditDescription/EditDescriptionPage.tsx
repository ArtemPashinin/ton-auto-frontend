import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EditDescription from '../../components/EditDescription/EditDescription';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { getAllData } from '../../redux/slices/data-slice/data-slice';
import { editenAdvertisementSelector } from '../../redux/slices/description-slice/description-slice';
import { fetchDescription } from '../../redux/slices/description-slice/thunks/fetch-advertisement';
import { AppDispatch } from '../../redux/store';

const EditDescriptionPage = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(getAllData);
  const advertisement = useSelector(editenAdvertisementSelector);

  useEffect(() => {
    if (id) dispatch(fetchDescription(id));
  }, [dispatch, id]);

  if (!id) return;

  return (
    <PageWrapper backButton hideTabBar>
      <EditDescription data={data} advertisement={advertisement} />
    </PageWrapper>
  );
};

export default EditDescriptionPage;
