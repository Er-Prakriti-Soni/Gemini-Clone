import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)

  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat
  } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">

      <div className="top">

        <img
          onClick={() => setExtended(true)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />

        <div
          onClick={() => newChat()}
          className="new-chat"
        >
          <img src={assets.plus_icon} alt="New chat" />

          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">

            <p className="recent-title">
              Recent
            </p>

            {prevPrompts && prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img
                    src={assets.message_icon}
                    alt="Message"
                  />

                  <p>
                    {item.length > 18
                      ? `${item.slice(0, 18)}...`
                      : item}
                  </p>
                </div>
              ))
            ) : (
              <p className="no-recent">
                No recent chats
              </p>
            )}

          </div>
        )}

      </div>

      <div className="bottom">

        <div className="bottom-item recent-entry">
          <img
            src={assets.question_icon}
            alt="Help"
          />

          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img
            src={assets.history_icon}
            alt="Activity"
          />

          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img
            src={assets.setting_icon}
            alt="Settings"
          />

          {extended && <p>Settings</p>}
        </div>

      </div>

    </div>
  )
}

export default Sidebar