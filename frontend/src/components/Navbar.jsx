import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <ShoppingCart size={24} color="#6366f1" />
        Chaos<span>Cart</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/products" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>
        <NavLink to="/users" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Users</NavLink>
        <NavLink to="/orders" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Orders</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
