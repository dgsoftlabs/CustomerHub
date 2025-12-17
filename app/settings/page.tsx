"use client";

import { useState } from "react";
import { Save, Bell, Lock, Database, Palette } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
    autoBackup: true,
    backupFrequency: "daily",
  });

  const handleSave = () => {
    // In a real app, you'd save to database or API
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your application preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Push Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications about new customers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Email Alerts</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get email updates for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme across the application</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Database */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold">Database</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Auto Backup</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup your database</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label htmlFor="backupFrequency" className="block font-medium text-gray-900 dark:text-gray-100 mb-2">
              Backup Frequency
            </label>
            <select
              id="backupFrequency"
              value={settings.backupFrequency}
              onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
              className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block font-medium text-gray-900 dark:text-gray-100 mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block font-medium text-gray-900 dark:text-gray-100 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium text-gray-900 dark:text-gray-100 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border rounded text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
