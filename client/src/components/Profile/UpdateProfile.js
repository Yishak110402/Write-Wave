import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile({ activeUser, setActiveUser }) {
  const [formData, setFormData] = useState({});
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [err, setErr] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);
  const navigate = useNavigate();
  if (formData.name == "") {
    setFormData((form) => ({ ...form, name: undefined }));
  }
  if (formData.email == "") {
    setFormData((form) => ({ ...form, email: undefined }));
  }
  async function handleUpdateForm(e) {
    e.preventDefault();
    setShowSuccessMsg(false);
    setShowErrorMsg(false);
    const renderURL = `https://writewave-backend-api.onrender.com/users/${activeUser._id}`;
    if (formData == {}) {
      return;
    }
    setShowProgress(true);

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
        setShowProgress(false);
      }
      if (data.status == "fail") {
        setShowErrorMsg(true);
        setErr(data.message);
        setShowProgress(false);
      }
      setFormData({});
    } catch (err) {}
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    const renderURL = `https://writewave-backend-api.onrender.com/users/${activeUser._id}`;
    try {
      const res = await fetch(`http://127.0.0.1:6969/users/${activeUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setActiveUser(null);
        navigate("/login");
        setDeleting(false);
      }
      if (data.status === "fail") {
        setErr(data.message);
        setShowErrorMsg(true);
        setDeleting(false);
      }
    } catch (err) {}
  }
  async function handleChangeProfilePic() {
    const formData = new FormData();
    formData.append("profile-pic", selectedPic);
    const res = await fetch(
      `http://127.0.0.1:6969/users/addprofilepic/${activeUser._id}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    setSelectedPic(null);
    setActiveUser((user) => ({ ...user, profilePicture: data.picture }));
    alert("Uploaded Successfully");
    window.location.reload()
  }

  return (
    <div className="update-profile">
      <div className="profile-pic">
        <img
          src={`http://127.0.0.1:6969/profiles/${activeUser.profilePicture}`}
        />
        <div>
          <label htmlFor="profile">Change profile picture</label>
          <input
            onChange={(e) => setSelectedPic(e.target.files[0])}
            type="file"
            id="profile"
          />
          {selectedPic && (
            <>
              <p>{selectedPic.name}</p>
              <button
                onClick={handleChangeProfilePic}
                className="submit-profile"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
      <h1>Edit user profile</h1>
      {showProgress && <div className="progress-msg">Updating...</div>}
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
            value={formData.name}
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
            value={formData.email}
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
        <div className="account-btns">
          <button type="submit">Update profile</button>
          <button
            type="button"
            id="delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </form>
      {showDeleteModal && (
        <div className="delete-confirm-modal">
          <div>
            <h2>Are you sure you want to delete your account?</h2>
            <span>
              All your posts and your account will be deleted permanently
            </span>
            <div className="confirm-btns">
              <button disabled={deleting} onClick={handleDeleteAccount}>
                {deleting ? "Deleting..." : "Yes, I'm Sure"}
              </button>
              <button
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
