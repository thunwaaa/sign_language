// ตัวอย่างการตั้งค่า Firebase และการเข้าถึงข้อมูล
import { initializeApp } from "firebase/app";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../firebase";

const storage = getStorage();

// ฟังก์ชันดึงข้อมูลคำศัพท์ทั้งหมด
async function getAllSigns() {
  try {
    const signsCollection = collection(db, "vocabulary");
  const signSnapshot = await getDocs(signsCollection);
  return signSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() // แค่ใช้ spread operator เพื่อแมปข้อมูลทั้งหมด
  }));
  } catch (error) {
    console.error("Error fetching signs:", error);
    throw error;
  }
  
}

// ฟังก์ชันดึงข้อมูลคำศัพท์เฉพาะคำ
async function getSignById(signId) {
  const signDoc = doc(db, "vocabulary", signId);
  const signSnapshot = await getDoc(signDoc);
  
  if (signSnapshot.exists()) {
    return {
      id: signSnapshot.id,
      ...signSnapshot.data()
    };
  } else {
    throw new Error("ไม่พบคำศัพท์ที่ระบุ");
  }
}

// ฟังก์ชันเพิ่มคำศัพท์ใหม่
async function addNewSign(signData, modelFile, thumbnailFile) {
  try {
    // 1. อัปโหลดไฟล์โมเดล
    const modelRef = ref(storage, `models/${modelFile.name}`);
    await uploadBytes(modelRef, modelFile);
    const modelURL = await getDownloadURL(modelRef);
    
    // 2. อัปโหลดรูปภาพตัวอย่าง
    const thumbRef = ref(storage, `thumbnails/${thumbnailFile.name}`);
    await uploadBytes(thumbRef, thumbnailFile);
    const thumbnailURL = await getDownloadURL(thumbRef);
    
    // 3. เพิ่มข้อมูลคำศัพท์ลงใน Firestore
    const newSignData = {
      ...signData,
      modelURL,
      thumbnailURL,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, "vocabulary"), newSignData);
    return docRef.id;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเพิ่มคำศัพท์:", error);
    throw error;
  }
}

// ฟังก์ชันอัปเดตข้อมูลคำศัพท์
async function updateSign(signId, updateData, newModelFile, newThumbnailFile) {
  try {
    const signDoc = doc(db, "vocabulary", signId);
    const signSnapshot = await getDoc(signDoc);

    if (!signSnapshot.exists()) {
      throw new Error("ไม่พบคำศัพท์ที่ต้องการอัปเดต");
    }

    const currentData = signSnapshot.data();
    let modelURL = currentData.modelURL;
    let thumbnailURL = currentData.thumbnailURL;

    // อัปเดตไฟล์โมเดลถ้ามีการเปลี่ยนแปลง
    if (newModelFile) {
      const modelRef = ref(storage, `models/${newModelFile.name}`);
      await uploadBytes(modelRef, newModelFile);
      modelURL = await getDownloadURL(modelRef);
    }

    // อัปเดตรูปภาพถ้ามีการเปลี่ยนแปลง
    if (newThumbnailFile) {
      const thumbRef = ref(storage, `thumbnails/${newThumbnailFile.name}`);
      await uploadBytes(thumbRef, newThumbnailFile);
      thumbnailURL = await getDownloadURL(thumbRef);
    }

    const updatedData = {
      ...updateData,
      modelURL,
      thumbnailURL,
      updatedAt: new Date()
    };

    await updateDoc(signDoc, updatedData);
    return signId;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตคำศัพท์:", error);
    throw error;
  }
}

// ฟังก์ชันลบคำศัพท์
// ฟังก์ชันลบคำศัพท์
async function deleteSign(signId) {
  try {
    // ดึงข้อมูลก่อนลบเพื่อเอา URL ของไฟล์
    const signDoc = doc(db, "vocabulary", signId);
    const signSnapshot = await getDoc(signDoc);

    if (!signSnapshot.exists()) {
      throw new Error("ไม่พบคำศัพท์ที่ต้องการลบ");
    }

    const signData = signSnapshot.data();

    // ลบไฟล์จาก Storage
    if (signData.modelURL) {
      // แปลง URL เป็น path
      const modelPath = signData.modelURL.split('/').slice(-2).join('/'); // แยกส่วน models/filename.glb
      const modelRef = ref(storage, modelPath);
      try {
        await deleteObject(modelRef);
      } catch (e) {
        console.warn("ไม่สามารถลบไฟล์โมเดล", e);
      }
    }
    
    if (signData.thumbnailURL) {
      // แปลง URL เป็น path
      const thumbnailPath = signData.thumbnailURL.split('/').slice(-2).join('/'); // แยกส่วน thumbnails/filename.jpg
      const thumbRef = ref(storage, thumbnailPath);
      try {
        await deleteObject(thumbRef);
      } catch (e) {
        console.warn("ไม่สามารถลบรูปภาพขนาดย่อ", e);
      }
    }

    // ลบข้อมูลจาก Firestore
    await deleteDoc(signDoc);
    return signId;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบคำศัพท์:", error);
    throw error;
  }
}

export { getAllSigns, getSignById, addNewSign, updateSign, deleteSign };