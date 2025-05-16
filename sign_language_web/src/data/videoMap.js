// ใช้ ID ของไฟล์ใน Google Drive
const videoMap = {
    "สวัสดี": "1e7sid-x3OUX93Ub-Xt4i2NpcNh2_KiJi", //https://drive.google.com/file/d/1e7sid-x3OUX93Ub-Xt4i2NpcNh2_KiJi/view?usp=sharing
    hello : "1e7sid-x3OUX93Ub-Xt4i2NpcNh2_KiJi", //https://drive.google.com/file/d/1e7sid-x3OUX93Ub-Xt4i2NpcNh2_KiJi/view?usp=sharing
    "ขอบคุณ": "18etbWUxzYpMsrHccpZlmXluu7qk3DbEm", //https://drive.google.com/file/d/18etbWUxzYpMsrHccpZlmXluu7qk3DbEm/view?usp=sharing
    thankyou : "18etbWUxzYpMsrHccpZlmXluu7qk3DbEm", //https://drive.google.com/file/d/18etbWUxzYpMsrHccpZlmXluu7qk3DbEm/view?usp=sharing
    thanks : "18etbWUxzYpMsrHccpZlmXluu7qk3DbEm", //https://drive.google.com/file/d/18etbWUxzYpMsrHccpZlmXluu7qk3DbEm/view?usp=sharing
    "ขอโทษ": "1SobW2L2ik79qYrBipdT4ZOp2UwkZkrOZ", //https://drive.google.com/file/d/1SobW2L2ik79qYrBipdT4ZOp2UwkZkrOZ/view?usp=sharing
    sorry : "1SobW2L2ik79qYrBipdT4ZOp2UwkZkrOZ", //https://drive.google.com/file/d/1SobW2L2ik79qYrBipdT4ZOp2UwkZkrOZ/view?usp=sharing
    "กิน": "1ZRrrShoVw-U4PCYAEhSZ_pLZ3Nr07nrC", //https://drive.google.com/file/d/1ZRrrShoVw-U4PCYAEhSZ_pLZ3Nr07nrC/view?usp=sharing
    eat : "1ZRrrShoVw-U4PCYAEhSZ_pLZ3Nr07nrC", //https://drive.google.com/file/d/1ZRrrShoVw-U4PCYAEhSZ_pLZ3Nr07nrC/view?usp=sharing
    "เขา": "11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg", //https://drive.google.com/file/d/11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg/view?usp=sharing
    he : "11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg", //https://drive.google.com/file/d/11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg/view?usp=sharing
    "คิดถึง": "11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg", //https://drive.google.com/file/d/11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg/view?usp=sharing
    miss : "11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg", //https://drive.google.com/file/d/11lx3Kp_AFoul03GzYbrHnQKAf5WghJtg/view?usp=sharing
    "ง่วง": "1T8TuKhX4CvF1FWypTGft0IhNQ5gfC-x7", //https://drive.google.com/file/d/1T8TuKhX4CvF1FWypTGft0IhNQ5gfC-x7/view?usp=sharing
    "ง่วงนอน": "1T8TuKhX4CvF1FWypTGft0IhNQ5gfC-x7",
    sleepy : "1T8TuKhX4CvF1FWypTGft0IhNQ5gfC-x7", //https://drive.google.com/file/d/1T8TuKhX4CvF1FWypTGft0IhNQ5gfC-x7/view?usp=sharing
    "เธอ": "1vNF5z2XSjQb_fuh09qwOv2e0mcRz4L9S", //https://drive.google.com/file/d/1vNF5z2XSjQb_fuh09qwOv2e0mcRz4L9S/view?usp=sharing
    her : "1vNF5z2XSjQb_fuh09qwOv2e0mcRz4L9S", //https://drive.google.com/file/d/1vNF5z2XSjQb_fuh09qwOv2e0mcRz4L9S/view?usp=sharing
    "ป่วย": "1B2mYIpYCehzolni7Xac5l9HScXLokVeW", //https://drive.google.com/file/d/1B2mYIpYCehzolni7Xac5l9HScXLokVeW/view?usp=drive_link
    sick : "1B2mYIpYCehzolni7Xac5l9HScXLokVeW", //https://drive.google.com/file/d/1B2mYIpYCehzolni7Xac5l9HScXLokVeW/view?usp=sharing
    "ไม่ใช่": "1dfEQgV-kZshuh5B83ZiPQKgJLY-Z17Km", //https://drive.google.com/file/d/1dfEQgV-kZshuh5B83ZiPQKgJLY-Z17Km/view?usp=sharing
    no : "1dfEQgV-kZshuh5B83ZiPQKgJLY-Z17Km", //https://drive.google.com/file/d/1dfEQgV-kZshuh5B83ZiPQKgJLY-Z17Km/view?usp=sharing
    "ร้อน": "1rE5-AeD_IMwStnzpVnGxMYboQdnbT1Bc", //https://drive.google.com/file/d/1rE5-AeD_IMwStnzpVnGxMYboQdnbT1Bc/view?usp=sharing
    hot : "1rE5-AeD_IMwStnzpVnGxMYboQdnbT1Bc", //https://drive.google.com/file/d/1rE5-AeD_IMwStnzpVnGxMYboQdnbT1Bc/view?usp=sharing
    "รัก": "1Xp1zuXGA3mfLM1ykrlM-Mo_pFPC3rRBD", //https://drive.google.com/file/d/1Xp1zuXGA3mfLM1ykrlM-Mo_pFPC3rRBD/view?usp=drive_link
    love : "1Xp1zuXGA3mfLM1ykrlM-Mo_pFPC3rRBD", //https://drive.google.com/file/d/1Xp1zuXGA3mfLM1ykrlM-Mo_pFPC3rRBD/view?usp=drive_link
    "หิว": "1ImnEJaykDMLUBIolQ4Gsv4MPBnCXntTY", //https://drive.google.com/file/d/1ImnEJaykDMLUBIolQ4Gsv4MPBnCXntTY/view?usp=drive_link
    hungry : "1ImnEJaykDMLUBIolQ4Gsv4MPBnCXntTY", //https://drive.google.com/file/d/1ImnEJaykDMLUBIolQ4Gsv4MPBnCXntTY/view?usp=drive_link
    "อะไร": "1Y8qYfPLFyG-VPuIhtK4ZA82fZYmwumEA", //https://drive.google.com/file/d/1Y8qYfPLFyG-VPuIhtK4ZA82fZYmwumEA/view?usp=drive_link
    what : "1Y8qYfPLFyG-VPuIhtK4ZA82fZYmwumEA", //https://drive.google.com/file/d/1Y8qYfPLFyG-VPuIhtK4ZA82fZYmwumEA/view?usp=drive_link
    "อยาก": "1Z1gueNJm4EG4mkEL38adV51eV9d403FH", //https://drive.google.com/file/d/1Z1gueNJm4EG4mkEL38adV51eV9d403FH/view?usp=drive_link
    want : "1Z1gueNJm4EG4mkEL38adV51eV9d403FH", //https://drive.google.com/file/d/1Z1gueNJm4EG4mkEL38adV51eV9d403FH/view?usp=drive_link
};

export default videoMap;
