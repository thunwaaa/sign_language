import { default as React, useState } from 'react';
import Header from '../components/Header';

function Translate() {
  const [text, setText] = useState('');
  return (
    <>
      <Header />
      <div style={styles.container}>
      {/* Text input */}
      <div style={styles.leftPanel}>
        <h2 style={{ color: '#1a0dab' }}>Text To Sign Language Translator</h2>
        <textarea
          placeholder="Type something to translate to sign language..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />
      </div>

      {/* 3D */}
      <div style={styles.rightPanel}>
        <h2>3D Hand Preview</h2>
        <div style={styles.handPlaceholder}>
          {/* เอาไว้ใส้ 3D  */}
          <p style={{ color: '#aaa' }}>[3D hand animation for: {text}]</p>
        </div>
      </div>
    </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f7f8fa',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  leftPanel: {
    flex: '0 0 600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  rightPanel: {
    flex: '0 0 600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  textarea: {
    width: '100%',
    height: '300px',
    fontSize: '1.1rem',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    backgroundColor: '#fff',
  },
  handPlaceholder: {
    width: '100%',
    height: '300px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
};



export default Translate;
