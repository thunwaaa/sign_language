import { X } from "lucide-react";
import FavButton from "./FavButton";
import { useState, useEffect, useRef } from "react";
import { getSignById } from "../api/vocab";
import ReactPlayer from 'react-player';

const CardPopUp = ({ signId, onClose }) => {
  const [sign, setSign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    async function fetchSignDetails() {
      try {
        const signData = await getSignById(signId);
        setSign(signData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSignDetails();
  }, [signId]);

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoading(false);
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  if (loading)
    return (
      <div style={style.popupOverlay}>
        <div style={style.popupBox}>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div style={style.popupOverlay}>
        <div style={style.popupBox}>{error}</div>
      </div>
    );
  if (!sign) return null;

  return (
    <div style={style.popupOverlay}>
      <div style={style.popupBox}>
        <h3 style={style.title} className="thai-font">
          {sign.word}
        </h3>
        <div style={style.line}></div>
        <div style={style.contentLayout}>
          <div style={style.container3d}>
            {videoLoading && (
              <div style={style.videoLoading}>กำลังโหลดวิดีโอ...</div>
            )}
            {videoError ? (
              <div style={style.videoError}>
                ไม่สามารถโหลดวิดีโอได้ กรุณาลองใหม่อีกครั้ง
              </div>
            ) : (
              <div style={style.playerWrapper}>
                <ReactPlayer
                  ref={playerRef}
                  url={sign.modelURL}
                  loop={true}
                  playing={true}
                  width="180%"
                  height="180%"
                  style={style.modelImage}
                  onError={handleVideoError}
                  onReady={handleVideoLoad}
                  config={{
                    youtube: {
                      playerVars: {
                        autoplay: 1,
                        showinfo: 0,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        fs: 0,
                        origin: window.location.origin,
                        iv_load_policy: 3,
                        disablekb: 1,
                        cc_load_policy: 0,
                        playsinline: 1,
                        enablejsapi: 1,
                        widget_referrer: window.location.origin,
                        mute: 0,
                        loop: 1,
                        playlist: sign.modelURL.split('v=')[1],
                        host: 'https://www.youtube-nocookie.com',
                      },
                      embedOptions: {
                        showinfo: 0,
                        modestbranding: 1,
                      }
                    }
                  }}
                />
                {/* เพิ่มโอเวอร์เลย์เพื่อปกปิดโลโก้ YouTube */}
                <div style={style.logoOverlay}></div>
              </div>
            )}
          </div>
          <div style={style.contentContainer}>
            <h4 style={style.contentTitle}>Meaning :</h4>
            <p style={style.content} className="thai-font">
              {sign.meaning}
            </p>
            <h4 style={style.contentTitle}>Description :</h4>
            <p style={style.content} className="thai-font">
              {sign.description}
            </p>
            <div style={style.favButtonContainer}>
              <FavButton sign={sign} />
            </div>
          </div>
        </div>
        <X style={style.closeButton} onClick={onClose} />
      </div>
    </div>
  );
};

const style = {
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupBox: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "1000px",
    height: "500px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    marginTop: "18px",
    marginRight: "15px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#555",
  },
  title: {
    fontSize: "30px",
    fontWeight: "500",
    marginBottom: "10px",
    marginTop: "0",
  },
  contentLayout: {
    display: "flex",
    height: "calc(100% - 70px)",
  },
  container3d: {
    backgroundColor: "#000000",
    flex: 2,
    marginRight: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  playerWrapper: {
    position: "relative",
    width: "150%",
    height: "150%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modelImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // ปรับจุดศูนย์กลางให้อยู่กึ่งกลางพอดี
    width: "130% !important", // ปรับขนาดให้ใหญ่ขึ้น
    height: "130% !important",
    objectFit: "contain",
    zIndex: 1,
  },
  // เพิ่มโอเวอร์เลย์สำหรับปิดโลโก้ที่มุมขวาล่าง
  logoOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "120px",  // ปรับขนาดให้พอดีกับโลโก้และชื่อช่อง
    height: "60px",  // ปรับความสูงให้พอดีกับโลโก้
    backgroundColor: "#000000", // สีดำเพื่อให้กลมกลืนกับพื้นหลัง
    zIndex: 10,
  },
  line: {
    border: "1px solid rgba(188, 188, 188, 0.12)",
    width: "100%",
    marginBottom: "20px",
  },
  contentContainer: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  contentTitle: {
    textAlign: "left",
    margin: "10px",
    marginBottom: "5px",
    fontSize: "24px",
  },
  content: {
    textAlign: "left",
    margin: "10px",
    marginTop: "-5px",
    fontSize: "18px",
    fontWeight: "400",
  },
  favButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    paddingBottom: "10px",
  },
  videoLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#666',
    fontSize: '16px',
  },
  videoError: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#dc3545',
    fontSize: '16px',
    textAlign: 'center',
    padding: '20px',
  },
};

export default CardPopUp;