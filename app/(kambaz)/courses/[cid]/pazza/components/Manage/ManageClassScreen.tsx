'use client';

import { useState } from 'react';
import ClassAtAGlance from '../ClassGlance';
import ManageFoldersTab from './ManageFoldersTab';

export default function ManageClassScreen() {
  const [activeTab, setActiveTab] = useState('folders');

  const tabs = [
    { id: 'general', label: 'General Settings', enabled: false, },
    { id: 'customize', label: 'Customize Q&A', enabled: false, },
    { id: 'folders', label: 'Manage Folders', enabled: true, },
    { id: 'enrollment', label: 'Manage Enrollment', enabled: false, },
    { id: 'groups', label: 'Create Groups', enabled: false, },
    { id: 'course-page', label: 'Customize Course Page', enabled: false, },
    { id: 'network', label: 'Pazza Network Settings', enabled: false, },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex justify-center items-stretch px-2 bg-gray-600 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 font-medium text-sm border-none flex items-center justify-center text-center
            ${activeTab === tab.id
                ? 'bg-white text-gray-900'
                : 'bg-gray-600 text-gray-600'
              }`}
            disabled={!tab.enabled}
            style={{ border: 'none', height: '40px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 bg-white">
        {activeTab === 'folders' && (
          <ManageFoldersTab />
        )}
      </div>
    </div>
  );
}