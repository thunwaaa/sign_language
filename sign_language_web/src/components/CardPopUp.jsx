import { X } from "lucide-react";
import FavButton from "./FavButton";
import { useState, useEffect } from "react";
import { getSignById } from "../api/vocab";

const CardPopUp = ({ signId, onClose }) => {
  const [sign, setSign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            {/* ตรงนี้จะใส่ 3D Model viewer component */}
            <img
              src={sign.modelURL}
              alt={sign.word}
              style={style.modelImage}
            />
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
              <FavButton />
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
    height: "calc(100% - 70px)", // Subtracting title height and margins
  },
  container3d: {
    backgroundColor: "#D9D9D9",
    flex: 2,
    marginRight: "20px",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modelImage: {
    width: "100%",
    height: "90%",
    objectFit: "contain",
    maxHeight: "90%",
    paddingBottom: "20px",
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
};

export default CardPopUp;