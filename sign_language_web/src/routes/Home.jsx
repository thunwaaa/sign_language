import Man from '../components/A-man-holding-a-briefcase-going-to-work-1.png';
import Header from '../components/Header';
function Home() {
  return (
    <div style={styles.wrapper}>
      <Header />

      <section style={styles.heroSection}>
      <div style={styles.heroContent}>
        <div style={styles.textBox}>
          <h1>
            Whether you're learning or communicating <span style={styles.highlight}>HandsUp!</span> is made for you.
          </h1>
          <p className='thai-font'>
            เว็บไซต์เพื่อฝึกและเรียนรู้ภาษามือหรือการสื่อสารด้วยมือ ออกแบบมาเพื่อทั้งผู้เรียนและผู้สื่อสารจริง รองรับผู้ที่มีความบกพร่องทางการได้ยิน ช่วยเรียนรู้ หรือสื่อสารในชีวิตประจำวัน
          </p>
          <button style={styles.ctaButton}>Let's Start !</button>
        </div>
        <img src={Man} alt="Hero" style={styles.heroImage} />
      </div>
    </section>


      {/* Features Section */}
<section style={styles.featuresSection}>
  <div style={styles.innerWrapper}>
    <h2 style={styles.sectionTitle}>Explore Our Features</h2>
    <p style={styles.sectionDesc}>
      HandsUp! offers powerful tools to help you learn and <br />
      communicate using sign language.
    </p>
    <div style={{ height: '5rem' }}></div>
    {/* Vocabulary Row */}
    <div style={styles.featuresRow}>
      {/* Favorites Card */}
      <div style={styles.imageCard}>
        <div style={styles.placeholderBox}></div>
        <div style={styles.favoriteBox}>
          <span role="img" aria-label="heart">💙</span> Favorites
        </div>
      </div>

      {/* Text */}
      <div style={styles.textBlock1}>
        <h3 style={styles.featureTitle}>Sign Language Vocabulary</h3>
        <p style={styles.featureDesc} className='thai-font'>
          เรียนรู้คำศัพท์ภาษามือไทยจากคลังคำศัพท์<br />
          มาพร้อมความหมาย ตัวอย่างคำภาพ<br />
          และการแสดงท่าทางมือ
        </p>
        <p style={styles.featureDesc} className='thai-font'>
          กด “Favorites” คำที่ชอบหรือใช้งาน<br />
          เพื่อเก็บไว้ดูภายหลัง
        </p>
        <div style={{ height: '1.5rem' }}></div>
        <a href="/Vocabulary" style={styles.learnMore}>Learn More</a>
      </div>
    </div>
    <div style={{ height: '9rem' }}></div>
    {/* Translate Row */}
    <div style={styles.featuresRow}>
      {/* Text */}
      <div style={styles.textBlock2}>
        <h3 style={styles.featureTitle} >Translate Text to Sign Language</h3>
        <p style={styles.featureDesc} className='thai-font'>
          แปลพิมพ์ข้อความภาษาไทย ระบบจะแสดงท่าทางภาษามือ<br />
          ผ่าน โมเดล 3 มิติ และดูประวัติการแปลข้อความได้ตลอดเวลา
        </p>
        <p style={styles.featureDesc} className='thai-font'>
          เหมาะสำหรับการเรียนรู้ การสื่อสาร<br />
          หรือใช้งานเชิงประจําวัน
        </p>
        <div style={{ height: '1.5rem' }}></div>
        <a href="/Translate" style={styles.learnMore}>Learn More</a>
      </div>

      {/* Input Preview */}
      <div style={styles.inputPreview}>
        <p style={styles.inputText}>Type something . . .</p>
      </div>
    </div>
    <div style={{ height: '9rem' }}></div>
    {/* Final CTA */}
    <div style={styles.finalCTA}>
      <h3 style={styles.finalTitle}>Ready to start your sign language journey ?</h3>
      <p style={styles.finalDesc}>
        Join HandsUp! today and connect with the sign language community.
      </p>
      <div style={{ height: '5rem' }}></div>
      <a href="/Translate" style={styles.ctaButton}>Let's Start !</a>
    </div>
  </div>
  <div style={{ height: '6rem' }}></div>
</section>


      {/* Footer */}
      <footer style={styles.footer}>
        <div>
          <h4>HandsUp!</h4>
          <p>
            HandsUp! empowers everyone to learn and use sign language.
            Learn, translate, and connect with confidence.
          </p>
        </div>
        <div>
          <h4>Navigation</h4>
          <a href="/Vocabulary">Vocabulary</a><br />
          <a href="/Translate">Translate</a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p></p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
    color: '#333'
  },
  heroSection: {
    backgroundColor: '#f4f4f9',
    padding: '4rem 2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    maxWidth: '1200px',
    width: '100%',
    flexWrap: 'wrap', // for mobile
  },
  textBox: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '550px',
  },
  highlight: {
    color: '#2a00e0',
  },
  ctaButton: {
    marginTop: '1rem',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#2a00e0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  heroImage: {
    flex: '1',
    maxWidth: '450px',
    width: '100%',
  },
  featuresSection: {
    background: 'linear-gradient(to bottom, #1A1FDE, #DD88E1)',
    color: 'white',
    padding: '4rem 0',
  },
  innerWrapper: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  sectionDesc: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    lineHeight: '1.6',
  },
  featuresRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '4rem',
  },
  imageCard: {
    background: 'white',
    borderRadius: '1rem',
    padding: '1rem',
    width: '400px',
    minWidth: '260px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
  },
  placeholderBox: {
    width: '100%',
    height: '200px',
    backgroundColor: '#f0b1cf',
    borderRadius: '10px',
    marginBottom: '1rem',
  },
  favoriteBox: {
    backgroundColor: '#2a00e0',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontWeight: 'bold',
  },
  textBlock1: {
  flex: 1,
  minWidth: '260px',
  textAlign: 'left',
  marginLeft: '15rem',
  display: 'flex-end',
  flexDirection: 'column',
  alignItems: 'flex-start',
},
textBlock2: {
  flex: 1,
  minWidth: '260px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
},
  featureTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.7rem',
  },
  featureDesc: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '0.7rem',
    gap: '0.rem',
  },
  learnMore: {
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'underline',
    
    fontSize: '1rem',
  },
  inputPreview: {
    backgroundColor: 'white',
    color: '#2a00e0',
    border: '3px dashed #2a00e0',
    borderRadius: '15px',
    padding: '2rem',
    width: '400px',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  inputText: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  finalCTA: {
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    paddingTop: '3rem',
    paddingBottom: '2rem',
  },
  finalTitle: {
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  finalDesc: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  ctaButton: {
    backgroundColor: '#2a00e0',
    color: 'white',
    padding: '0.7rem 2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    borderRadius: '10px',
    textDecoration: 'none',
  },
  footer: {
    backgroundColor: '#111',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem',
    flexWrap: 'wrap',
  },
  
};

export default Home;


