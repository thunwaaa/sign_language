import { X } from "lucide-react";
import FavButton from "./FavButton";
import { useState, useEffect, useRef } from "react";
import { getSignById } from "../api/vocab";
import ReactPlayer from 'react-player';

const CardPopUp = ({ signId, onClose, onFavoriteChange }) => {
  const [sign, setSign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    async function fetchSignDetails() {
      try {
        setLoading(true);
        
        if (!signId) {
          throw new Error("Sign ID is missing");
        }
        const signData = await getSignById(signId);
        
        
        if (!signData) {
          throw new Error("Failed to fetch sign data");
        }
        
        setSign(signData);
      } catch (error) {
        console.error("Error fetching sign details:", error);
        setError(error.message || "Failed to load sign details");
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
  
  
  const handleFavoriteChange = (isNowFavorite, favoriteData) => {
    
    if (!isNowFavorite) {
      onFavoriteChange?.(isNowFavorite, favoriteData);
      onClose();
    }
  };

  if (loading)
    return (
      <div style={style.popupOverlay}>
        <div style={style.popupBox}>
          <div style={style.loadingIndicator}>กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
    
  if (error)
    return (
      <div style={style.popupOverlay}>
        <div style={style.popupBox}>
          <div style={style.errorMessage}>{error}</div>
          <button style={style.closeButtonSmall} onClick={onClose}>
            ปิด
          </button>
        </div>
      </div>
    );
    
  if (!sign) return null;

  return (
    <div style={style.popupOverlay}>
      <div style={style.popupBox}>
        <h3 style={style.title} className="thai-font">
          {sign.word || "ไม่มีชื่อ"}
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
                {sign.modelURL && (
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
                )}
                <div style={style.logoOverlay}></div>
              </div>
            )}
          </div>
          <div style={style.contentContainer}>
            <h4 style={style.contentTitle}>Meaning :</h4>
            <p style={style.content} className="thai-font">
              {sign.meaning || "ไม่มีข้อมูล"}
            </p>
            <h4 style={style.contentTitle}>Description :</h4>
            <p style={style.content} className="thai-font">
              {sign.description || "ไม่มีข้อมูล"}
            </p>
            <div style={style.favButtonContainer}>
              <FavButton 
                sign={sign} 
                onFavoriteChange={handleFavoriteChange} 
              />
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
  closeButtonSmall: {
    padding: "8px 16px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
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
    transform: "translate(-50%, -50%)",
    width: "130% !important",
    height: "130% !important",
    objectFit: "contain",
    zIndex: 1,
  },
  logoOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "120px",
    height: "60px",
    backgroundColor: "#000000",
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
  loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '18px',
    color: '#3B4CCA',
  },
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: '18px',
    padding: '20px',
  },
};

export default CardPopUp;