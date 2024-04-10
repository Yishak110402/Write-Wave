import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile({ activeUser, setActiveUser }) {
  const [formData, setFormData] = useState({});
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate()

  async function handleUpdateForm(e) {
    setShowSuccessMsg(false);
    setShowErrorMsg(false);
    

    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:6969/users/${activeUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status == "success") {
        if (formData.name) {
          setActiveUser((user) => ({ ...user, name: formData.name }));
        }
        if (formData.email) {
          setActiveUser((user) => ({ ...user, email: formData.email }));
        }
        setShowSuccessMsg(true);
      }
      if (data.status == "fail") {
        setShowErrorMsg(true);
        setErr(data.message);
      }
      setFormData({});
    } catch (err) {}
  }

  return (
    <div className="update-profile">
      <h1>Edit user profile</h1>
      {showSuccessMsg && (
        <div className="update-success-msg">Profile updated successfully</div>
      )}
      {showErrorMsg && (
        <div className="update-error-msg">{err ? err : "Unable to update"}</div>
      )}
      <form onSubmit={(e) => handleUpdateForm(e)}>
        <div>
          <label>Name</label>
          <input
            onChange={(e) =>
              setFormData((form) => ({ ...form, name: e.target.value }))
            }
            type="text"
            placeholder={activeUser.name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData((form) => ({ ...form, email: e.target.value }))
            }
            placeholder={activeUser.email}
          />
        </div>
        <div>
          <label>Old password</label>
          <input
            type="text"
            required={formData.newPassword}
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
            required={formData.oldPassword}
            placeholder="Leave empty to not change"
            onChange={(e) =>
              setFormData((form) => ({ ...form, newPassword: e.target.value }))
            }
          />
        </div>
        <button type="submit">Update profile</button>
      </form>
    </div>
  );
}
