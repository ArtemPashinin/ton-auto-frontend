import { appRoutesData } from '../../enums/app-routes';
import TabBarButton from '../buttons/TabBarButton/TabBarButton';

import style from './TabBar.module.css';

const TabBar = () => {
  return (
    <div className={`fixed-bottom p-2 pb-4 d-grid rounded-4 ${style.searchMenu}`}>
      {appRoutesData.map((appRouteData, index) => (
        <TabBarButton key={index} {...appRouteData} />
      ))}
    </div>
  );
};

export default TabBar;
