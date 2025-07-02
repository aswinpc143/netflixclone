import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfilePage.css';

function ProfilePage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: user?.name || 'Main Profile',
      avatar: 'https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png',
      isKids: false,
      isMain: true
    },
    {
      id: 2,
      name: 'Kids',
      avatar: 'https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg',
      isKids: true,
      isMain: false
    }
  ]);

  const [showAddProfile, setShowAddProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newProfile, setNewProfile] = useState({
    name: '',
    isKids: false,
    avatar: 'https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
  });

  const avatarOptions = [
    'https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png',
    'https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg',
    'https://i.pinimg.com/564x/8b/3f/6b/8b3f6b8c8f8e8c8f8e8c8f8e8c8f8e8c.jpg',
    'https://i.pinimg.com/564x/2c/4e/6a/2c4e6a8f8e8c8f8e8c8f8e8c8f8e8c8f.jpg'
  ];

  const handleAddProfile = () => {
    if (newProfile.name.trim()) {
      const profile = {
        id: Date.now(),
        name: newProfile.name,
        avatar: newProfile.avatar,
        isKids: newProfile.isKids,
        isMain: false
      };
      setProfiles([...profiles, profile]);
      setNewProfile({ name: '', isKids: false, avatar: avatarOptions[0] });
      setShowAddProfile(false);
    }
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setNewProfile({
      name: profile.name,
      isKids: profile.isKids,
      avatar: profile.avatar
    });
  };

  const handleUpdateProfile = () => {
    if (newProfile.name.trim()) {
      setProfiles(profiles.map(p => 
        p.id === editingProfile.id 
          ? { ...p, name: newProfile.name, isKids: newProfile.isKids, avatar: newProfile.avatar }
          : p
      ));
      setEditingProfile(null);
      setNewProfile({ name: '', isKids: false, avatar: avatarOptions[0] });
    }
  };

  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setProfiles(profiles.filter(p => p.id !== profileId));
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Manage Profiles</h1>
        <p>Create profiles for different members of your household</p>
      </div>

      <div className="profiles-grid">
        {profiles.map(profile => (
          <div key={profile.id} className="profile-card">
            <div className="profile-avatar-container">
              <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
              {profile.isKids && <span className="kids-badge">KIDS</span>}
            </div>
            <h3 className="profile-name">{profile.name}</h3>
            <div className="profile-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEditProfile(profile)}
              >
                Edit
              </button>
              {!profile.isMain && (
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteProfile(profile.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}

        {profiles.length < 5 && (
          <div className="add-profile-card" onClick={() => setShowAddProfile(true)}>
            <div className="add-profile-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </div>
            <h3>Add Profile</h3>
          </div>
        )}
      </div>

      {(showAddProfile || editingProfile) && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>{editingProfile ? 'Edit Profile' : 'Add Profile'}</h2>
            
            <div className="modal-content">
              <div className="avatar-selection">
                <h3>Choose Avatar</h3>
                <div className="avatar-grid">
                  {avatarOptions.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className={`avatar-option ${newProfile.avatar === avatar ? 'selected' : ''}`}
                      onClick={() => setNewProfile({ ...newProfile, avatar })}
                    />
                  ))}
                </div>
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="profileName">Profile Name</label>
                  <input
                    type="text"
                    id="profileName"
                    value={newProfile.name}
                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                    placeholder="Enter profile name"
                    maxLength="20"
                  />
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newProfile.isKids}
                      onChange={(e) => setNewProfile({ ...newProfile, isKids: e.target.checked })}
                    />
                    <span className="checkmark"></span>
                    Kids Profile (Only shows content suitable for children)
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowAddProfile(false);
                  setEditingProfile(null);
                  setNewProfile({ name: '', isKids: false, avatar: avatarOptions[0] });
                }}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={editingProfile ? handleUpdateProfile : handleAddProfile}
                disabled={!newProfile.name.trim()}
              >
                {editingProfile ? 'Update' : 'Add Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;