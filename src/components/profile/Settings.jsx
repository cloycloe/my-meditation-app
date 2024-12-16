import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/common/PageTransition";

export default function Settings() {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken"); // Ensure correct key is used
    console.log("Token after removal:", localStorage.getItem("authToken")); // Debugging log
    navigate("/login"); // Redirect to login page
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    // Example API call for password change
    alert("Password changed successfully!");
    setChangePasswordModalOpen(false); // Close the modal
  };

  return (
    <div className="rounded-lg bg-white p-6 mb-6 shadow-md">
      <h3 className="text-xl font-semibold text-black mb-4">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-black font-medium">Meditation Reminders</p>
            <p className="text-sm text-black/70">Get daily notifications</p>
          </div>
          <Switch
            checked={remindersEnabled}
            onCheckedChange={setRemindersEnabled}
          />
        </div>

        <button
          className="w-full py-2 px-4 bg-[#a2d0b3] text-black rounded-md hover:bg-[#8fb99e] transition-colors"
          onClick={() => setChangePasswordModalOpen(true)}
        >
          Change Password
        </button>

        <button
          className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {isChangePasswordModalOpen && (
        <PageTransition>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h4 className="text-xl font-semibold mb-4">
                Change Your Password
              </h4>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full py-2 px-4 border rounded-md"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full py-2 px-4 border rounded-md"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-2 px-4 border rounded-md"
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handlePasswordChange}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Change Password
                </button>
                <button
                  onClick={() => setChangePasswordModalOpen(false)}
                  className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </PageTransition>
      )}
    </div>
  );
}
