import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [kycStatus, setKycStatus] = useState('');
  const [kycDocs, setKycDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email });
        setKycStatus(res.data.isKYCVerified ? 'Verified' : 'Not Verified');
        setKycDocs(res.data.kycDocs || []);
      } catch (err) {
        setMessage('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.put('/auth/profile', form);
      setMessage('Profile updated!');
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleKycUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!file) return setMessage('Please select a file');
    const formData = new FormData();
    formData.append('kycDocs', file);
    try {
      const res = await api.post('/auth/kyc', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setKycDocs(res.data.kycDocs);
      setKycStatus('Not Verified');
      setMessage('KYC document uploaded!');
    } catch (err) {
      setMessage('Error uploading KYC document');
    }
  };

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
        </div>
        <button type="submit" className="btn-primary">Update Profile</button>
      </form>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">KYC Status: <span className={kycStatus === 'Verified' ? 'text-green-600' : 'text-yellow-600'}>{kycStatus}</span></h3>
        <form onSubmit={handleKycUpload} className="flex items-center space-x-2 mb-2">
          <input type="file" onChange={handleFileChange} className="border rounded-lg px-2 py-1" />
          <button type="submit" className="btn-secondary">Upload KYC</button>
        </form>
        <div className="text-sm text-gray-600 mb-2">Uploaded Docs:</div>
        <ul className="list-disc ml-6 text-sm">
          {kycDocs.map((doc, i) => (
            <li key={i}><a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{doc.split('/').pop()}</a></li>
          ))}
        </ul>
      </div>
      {message && <div className="text-center text-primary-600 mt-4">{message}</div>}
    </div>
  );
};

export default Profile; 