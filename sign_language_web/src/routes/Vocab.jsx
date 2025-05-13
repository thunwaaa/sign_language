import React, { useEffect, useState } from "react";
import { getAllSigns } from "../api/vocab";
import { Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SignGrid from "../components/SignGrid";

const Vocab = () => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSigns = async () => {
      try {
        const vocabCol = collection(db, "vocabulary");
        const vocabSnap = await getDocs(vocabCol);
        const vocabList = vocabSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSigns(vocabList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data : ", err);
        setError("Can not loading data, please try again");
        setLoading(false);
      }
    };

    fetchSigns();
  }, []);

  const filteredSigns = signs.filter(sign => {
    // Check if sign has name property
    if (sign.name && typeof sign.name === 'string') {
      return sign.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    // Fallback to word property if name is not available
    else if (sign.word && typeof sign.word === 'string') {
      return sign.word.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.heading}>Sign Language Vocabulary</h1>
        <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <SignGrid signs={filteredSigns} />
        )}
      </main>
    </div>
  );
};
const styles = {
  container: {
    backgroundColor:'#f7f8fa',
    padding: "2rem",
    textAlign: "center",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#1a0dab",
  },
  cardContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default Vocab;
