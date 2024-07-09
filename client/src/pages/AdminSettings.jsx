import { NavLink, Outlet } from "react-router-dom";

function AdminSettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Settings Page</h2>
      <nav className="flex mb-4">
        <NavLink
          to="/admin/settings/usersSettings"
          className="mr-4 text-blue-500 hover:text-blue-700"
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/settings/cropsSettings"
          className="text-blue-500 hover:text-blue-700"
        >
          Crops
        </NavLink>
      </nav>
      <div className="border border-black p-4">
        {/* Content for Users and Crops */}
      </div>
      <Outlet />
    </div>
  );
}

export default AdminSettings;
