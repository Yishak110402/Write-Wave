import { useState } from "react";
import "./UpdateProfile.css";

export default function UpdateProfile({activeUser}) {
  const [formData, setFormData] = useState({});

  return (
    <div className="update-profile">
      <h1>Edit user profile</h1>
      <form>
        <div>
          <label>Name</label>
          <input
            onChange={(e) =>
              setFormData((form) => ({ ...form, name: e.target.value }))
            }
            type="text"
            required
            value={activeUser.name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            required
            onChange={(e) =>
              setFormData((form) => ({ ...form, email: e.target.value }))
            }
            value={activeUser.email}
          />
        </div>
        <div>
          <label>Old password</label>
          <input
            type="text"
            required
            placeholder="Leave empty to not change"
            onChange={(e) =>
              setFormData((form) => ({ ...form, oldPassword: e.target.value }))
            }
          />
        </div>
        <div>
          <label>New password</label>
          <input
            type="text"
            required
            placeholder="Leave empty to not change"
            onChange={(e) =>
              setFormData((form) => ({ ...form, newPassword: e.target.value }))
            }
          />
        </div>
      </form>
    </div>
  );
}
