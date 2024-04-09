import { useState } from "react";
import "./UserDescription.css";
import MyPosts from "./MyPosts";
import UpdateProfile from "./UpdateProfile";

export default function UserDescription({activeUser}) {
  const tabs = ["My Posts", "Update Profile"];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="profile-header">
        <h1>{activeUser.name}'s profile page</h1>
        <nav>
          <ul>
            {tabs.map((tab, index) => (
              <li
                onClick={() => setActiveTab(index)}
                className={`${activeTab == index ? "selected" : ""}`}
                key={index}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {activeTab === 0 && <MyPosts activeUser={activeUser} />}
      {activeTab === 1 && <UpdateProfile activeUser={activeUser} />}
    </>
  );
}
