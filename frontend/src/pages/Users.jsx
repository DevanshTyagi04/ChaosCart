import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { UserPlus, Mail } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { name, email });
      setName('');
      setEmail('');
      fetchUsers();
    } catch (err) {
      setError('Failed to create user. Email may already exist.');
    }
  };

  if (loading) return <div className="loading">Loading Users...</div>;

  return (
    <div>
      <h1>User Management</h1>
      {error && <div className="error">{error}</div>}
      
      <div className="grid grid-cols-2">
        <div className="card">
          <h2 className="card-title flex items-center gap-4"><UserPlus size={20}/> Register User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" />
            </div>
            <button type="submit" className="btn mb-4">Create User</button>
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td className="flex items-center gap-4"><Mail size={14} color="#9ca3af" /> {user.email}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan="3" style={{textAlign: 'center', color: '#9ca3af'}}>No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
