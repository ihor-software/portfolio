import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from 'src/ui/common/Icon/Icon';
import styles from './NavItem.module.css';

export type NavItemProps = {
  label: string;
  icon: string;
  reduced?: boolean;
  link: string;
  action?: () => void;
};

const NavItem: FC<NavItemProps> = ({ label, icon, reduced = false, link, action }) => {
  const location = useLocation();
  return (
    <NavLink
      onClick={action}
      to={link}
      className={({ isActive }) =>
        (isActive ? `${styles.active}` : `${styles.inactive}`) +
        ` ${styles.navLink} relative group overflow-hidden`
      }
    >
      <Icon src={icon} alt={label} iconColor={location.pathname === link ? 'main' : 'white'} />
      <p className={`${reduced ? `${styles.navItemText}` : 'inline'} text-base whitespace-nowrap`}>
        {label}
      </p>
    </NavLink>
  );
};

export default NavItem;
