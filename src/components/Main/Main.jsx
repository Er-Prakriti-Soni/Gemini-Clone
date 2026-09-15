import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = async () => {
    if (!input || !input.trim() || loading) return;

    await onSent(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCardClick = async (prompt) => {
    if (loading) return;

    setInput(prompt);
    await onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>

              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>
                  Suggest beautiful places to see on an upcoming road trip
                </p>

                <img src={assets.compass_icon} alt="Places" />
              </div>

              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Briefly summarize this concept: urban planning"
                  )
                }
              >
                <p>Briefly summarize this concept: urban planning</p>

                <img src={assets.bulb_icon} alt="Summary" />
              </div>

              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>
                  Brainstorm team bonding activities for our work retreat
                </p>

                <img src={assets.message_icon} alt="Brainstorm" />
              </div>

              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Improve the readability of the following code"
                  )
                }
              >
                <p>Improve the readability of the following code</p>

                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Aivora" />

              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resultData}</p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <div>
              <img
                src={assets.gallery_icon}
                alt="Gallery"
              />

              <img
                src={assets.mic_icon}
                alt="Microphone"
              />

              {input && input.trim() && !loading ? (
                <img
                  onClick={handleSend}
                  src={assets.send_icon}
                  alt="Send"
                />
              ) : null}
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate information, including information
            about people, so double-check its responses. Your privacy and
            security are important.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;