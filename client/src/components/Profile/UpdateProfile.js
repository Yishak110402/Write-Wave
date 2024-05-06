import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile({ activeUser, setActiveUser }) {
  const [formData, setFormData] = useState({});
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [code, setCode] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [err, setErr] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [rerender, setRerender] = useState(0);
  const navigate = useNavigate();
  if (formData.name == "") {
    setFormData((form) => ({ ...form, name: undefined }));
  }
  if (formData.email == "") {
    setFormData((form) => ({ ...form, email: undefined }));
  }
  // async function handleUpdateForm(e) {
  //   e.preventDefault();
  //   setShowSuccessMsg(false);
  //   setShowErrorMsg(false);
  //   const renderURL = `https://writewave-backend-api.onrender.com/users/${activeUser._id}`;
  //   if (formData == {}) {
  //     return;
  //   }
  //   setShowProgress(true);

  //   try {
  //     const res = await fetch(renderURL, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (data.status == "success") {
  //       if (formData.name) {
  //         setActiveUser((user) => ({ ...user, name: formData.name }));
  //       }
  //       if (formData.email) {
  //         setActiveUser((user) => ({ ...user, email: formData.email }));
  //       }
  //       setShowSuccessMsg(true);
  //       setShowProgress(false);
  //     }
  //     if (data.status == "fail") {
  //       setShowErrorMsg(true);
  //       setErr(data.message);
  //       setShowProgress(false);
  //     }
  //     setFormData({});
  //   } catch (err) {}
  // }

  async function changeName() {
    try {
      setShowErrorMsg(false);
      setShowSuccessMsg(false);
      setShowProgress(true);
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/users/${activeUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        setShowSuccessMsg(true);
        setActiveUser((user)=>({...user, name:formData.name}))
      } else {
        setErr(data.message);
        setShowErrorMsg(true);
      }
      setShowProgress(false);
    } catch (err) {
      setErr(err.message);
      setShowErrorMsg(true);
    }
  }
  async function changePassword() {
    setShowErrorMsg(false)
    setShowSuccessMsg(false)
    setShowProgress(true)
    try {
      setShowErrorMsg(false);
      setShowSuccessMsg(false);
      setShowProgress(true);
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/users/${activeUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        setShowSuccessMsg(true);
        setShowProgress(false)
        setActiveUser((user)=>({...user, password:formData.newPassword}))
      } else {
        setShowProgress(false)
        setErr(data.message);
        setShowErrorMsg(true);
      }
      setShowProgress(false);
    } catch (err) {
      setErr(err.message);
      setShowErrorMsg(true);
      setShowProgress(false)
    }
  }


  async function handleDeleteAccount() {
    setDeleting(true);
    const renderURL = `https://writewave-backend-api.onrender.com/users/${activeUser._id}`;
    try {
      const res = await fetch(renderURL, {
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
    setUploadingProfile(true);
    const renderURL = `https://writewave-backend-api.onrender.com/users/addprofilepic/${activeUser._id}`;
    const formData = new FormData();
    formData.append("profile-pic", selectedPic);
    const res = await fetch(renderURL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    setSelectedPic(null);
    setActiveUser((user) => ({ ...user, profilePicture: data.picture }));
    setRerender(rerender + 1);
    setUploadingProfile(false);
  }

  async function sendVerification(){
    setShowErrorMsg(false)
    setShowSuccessMsg(false)
    try {
      const res = await fetch("https://writewave-backend-api.onrender.com/users/verify",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify({
          name:activeUser.name,
          email: formData.email
        })
      })
      const data = await res.json()
      console.log(data);
      if(data.status === "Success"){
        setCode(data.code)
        setShowVerification(true)
      }
      if(data.status === "fail"){
        setErr(data.message)
        setShowErrorMsg(true)
      }      
    } catch (err) {
      setErr(err.message)
      setShowErrorMsg(true)
      
    }
  }

  return (
    <div className="update-profile">
      <div className="profile-pic">
        {uploadingProfile && (
          <div className="profile-uploading">
            <div></div>
          </div>
        )}
        <img
          src={`https://writewave-backend-api.onrender.com/profiles/${activeUser.profilePicture}`}
        />
        <div>
          <label htmlFor="profile">Change profile picture</label>
          <input
            onChange={(e) => setSelectedPic(e.target.files[0])}
            type="file"
            id="profile"
            accept="image/*"
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

      <div className="form">
        <div className="name-input">
          <label>Name</label>
          <input
            onChange={(e) =>
              setFormData((form) => ({ ...form, name: e.target.value }))
            }
            type="text"
            placeholder={activeUser.name}
            value={formData.name}
          />
          <button onClick={changeName}>Change Name</button>
        </div>
        <div className="email-input">
          <label>Email</label>
          <input
            type="text"
            onChange={(e) =>
              setFormData((form) => ({ ...form, email: e.target.value }))
            }
            placeholder={activeUser.email}
            value={formData.email}
          />
          <button onClick={sendVerification}>Verifiy New Email</button>
        </div>
        {showVerification && (
          <div className="verify-email-input">
            <label>Verification Code</label>
            <input type="number" placeholder="123456" />
            <button type="button">Change Email</button>
          </div>
        )}
        <div className="password-input old">
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
        <div className="password-input new">
          <label>New password</label>
          <input
            type="text"
            required={formData.oldPassword}
            placeholder="Leave empty to not change"
            onChange={(e) =>
              setFormData((form) => ({ ...form, newPassword: e.target.value }))
            }
          />
          <button onClick={changePassword}>Change Password</button>
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
      </div>
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
