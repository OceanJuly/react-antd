import react from 'react';
import DashboardWidget from './dashboard-widgets';

class RootStore {
  dashboardWidget: DashboardWidget;
  constructor() {
    this.dashboardWidget = new DashboardWidget()
  }
}

const context = react.createContext(new RootStore())
export const useStore = () => react.useContext(context)