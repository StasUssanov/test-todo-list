import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

import { ROUTE_HOME, ROUTE_PROFILE } from '../../Routes';

function Sidebar() {
  return (
    <div className="tbg-sidebar">
      <NavLink
        className="tbg-sidebar-link"
        exact
        activeClassName="tbg-sidebar-link--active"
        to={ROUTE_HOME}
      >
        <span>
          My Tasks
        </span>
      </NavLink>
      <NavLink
        className="tbg-sidebar-link"
        exact
        activeClassName="tbg-sidebar-link--active"
        to={ROUTE_PROFILE}
      >
        <span>
          My Profile
        </span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
