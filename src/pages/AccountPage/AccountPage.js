import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';

function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    language: 'English',
    autoplay: true,
    notifications: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically save to your backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>Account Settings</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="account-content">
        <div className="account-sidebar">
          <nav className="account-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Information
            </button>
            <button
              className={`nav-item ${activeTab === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscription')}
            >
              Subscription & Billing
            </button>
            <button
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              Viewing Preferences
            </button>
            <button
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security & Privacy
            </button>
          </nav>
        </div>

        <div className="account-main">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Profile Information</h2>
              <form onSubmit={handleSave} className="account-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Add phone number"
                  />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="tab-content">
              <h2>Subscription & Billing</h2>
              <div className="subscription-info">
                <div className="plan-card">
                  <h3>Current Plan</h3>
                  <div className="plan-details">
                    <span className="plan-name">Premium Plan</span>
                    <span className="plan-price">$15.99/month</span>
                  </div>
                  <ul className="plan-features">
                    <li>4K Ultra HD streaming</li>
                    <li>Watch on 4 devices at once</li>
                    <li>Download on 6 devices</li>
                    <li>Unlimited movies and TV shows</li>
                  </ul>
                  <button className="change-plan-btn">Change Plan</button>
                </div>
                
                <div className="billing-info">
                  <h3>Billing Information</h3>
                  <div className="billing-details">
                    <p><strong>Next billing date:</strong> January 15, 2025</p>
                    <p><strong>Payment method:</strong> •••• •••• •••• 1234</p>
                    <p><strong>Billing address:</strong> 123 Main St, City, State 12345</p>
                  </div>
                  <button className="update-payment-btn">Update Payment Method</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h2>Viewing Preferences</h2>
              <form onSubmit={handleSave} className="account-form">
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="autoplay"
                      checked={formData.autoplay}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Autoplay next episode
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Email notifications for new releases
                  </label>
                </div>
                
                <button type="submit" className="save-btn">Save Preferences</button>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <h2>Security & Privacy</h2>
              <div className="security-section">
                <div className="security-item">
                  <h3>Password</h3>
                  <p>Last changed: 3 months ago</p>
                  <button className="security-btn">Change Password</button>
                </div>
                
                <div className="security-item">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                  <button className="security-btn">Enable 2FA</button>
                </div>
                
                <div className="security-item">
                  <h3>Active Sessions</h3>
                  <p>Manage devices that are signed in to your account</p>
                  <button className="security-btn">View Sessions</button>
                </div>
                
                <div className="security-item">
                  <h3>Download Your Data</h3>
                  <p>Get a copy of your Netflix data</p>
                  <button className="security-btn">Request Data</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;