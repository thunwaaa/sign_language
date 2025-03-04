import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe import solutions
from mediapipe.framework.formats import landmark_pb2
import numpy as np
import cv2
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Load labels
CSV_LABELS = "sign_labels.csv"
LABELS = pd.read_csv(CSV_LABELS)["Label"].tolist()

MARGIN = 10  # pixels
FONT_SIZE = 1
FONT_THICKNESS = 1
HANDEDNESS_TEXT_COLOR = (88, 205, 54)  # vibrant green

# Prepare to collect gesture data
sequence_data = []
labels = []
frame_id = 0

# Function to collect landmarks data
def save_landmarks(landmarks, label):
    sequence_data.append(landmarks)
    labels.append(label)

def draw_landmarks_on_image(rgb_image, detection_result):
    hand_landmarks_list = detection_result.hand_landmarks
    handedness_list = detection_result.handedness
    annotated_image = np.copy(rgb_image)

    # Loop through the detected hands to visualize.
    for idx in range(len(hand_landmarks_list)):
        hand_landmarks = hand_landmarks_list[idx]
        handedness = handedness_list[idx]

        # Draw the hand landmarks.
        hand_landmarks_proto = mp.framework.formats.landmark_pb2.NormalizedLandmarkList()
        hand_landmarks_proto.landmark.extend([mp.framework.formats.landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in hand_landmarks])
        
        mp.solutions.drawing_utils.draw_landmarks(
            annotated_image,
            hand_landmarks_proto,
            mp.solutions.hands.HAND_CONNECTIONS,
            mp.solutions.drawing_styles.get_default_hand_landmarks_style(),
            mp.solutions.drawing_styles.get_default_hand_connections_style())
        
        # Get the top left corner of the detected hand's bounding box.
        height, width, _ = annotated_image.shape
        x_coordinates = [landmark.x for landmark in hand_landmarks]
        y_coordinates = [landmark.y for landmark in hand_landmarks]
        text_x = int(min(x_coordinates) * width)
        text_y = int(min(y_coordinates) * height) - MARGIN
        
        # Draw handedness (left or right hand) on the image.
        cv2.putText(annotated_image, f"{handedness[0].category_name}",
                    (text_x, text_y), cv2.FONT_HERSHEY_DUPLEX,
                    FONT_SIZE, HANDEDNESS_TEXT_COLOR, FONT_THICKNESS, cv2.LINE_AA)

    return annotated_image

# Train the model with LSTM
def build_model(input_shape):
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, input_shape=input_shape))
    model.add(LSTM(64))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(len(LABELS), activation='softmax'))  # Number of classes (labels)
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# Preprocess Data (for training)
def preprocess_data():
    X = np.array(sequence_data)
    Y = pd.get_dummies(labels).values  # One-hot encode labels
    return X, Y

# Train model
def train_model():
    X, Y = preprocess_data()
    model = build_model((X.shape[1], X.shape[2]))  # X.shape[1] = number of landmarks, X.shape[2] = 3 (x, y, z)
    model.fit(X, Y, epochs=50, batch_size=32)
    return model

# Predict gesture from landmarks
def predict_gesture(model, landmarks):
    landmarks = np.expand_dims(landmarks, axis=0)  # Add batch dimension
    predictions = model.predict(landmarks)
    predicted_class = np.argmax(predictions)
    return LABELS[predicted_class]

def main():
    model_path = r"C:\Users\sitta\Documents\project\hand_landmarker.task"    

    # Create a hand landmarker instance
    options = mp.tasks.vision.HandLandmarkerOptions(
        base_options=mp.tasks.BaseOptions(model_asset_path=model_path),
        running_mode=mp.tasks.vision.RunningMode.IMAGE,  # Using IMAGE mode for frame-by-frame processing
        num_hands=2)
    
    detector = mp.tasks.vision.HandLandmarker.create_from_options(options)

    # Open webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam")
        return

    try:
        while cap.isOpened():
            # Read frame from webcam
            ret, frame = cap.read()
            if not ret:
                print("Error: Could not read frame")
                break

            # Convert the frame to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)

            # Detect hand landmarks
            detection_result = detector.detect(mp_image)

            # Draw landmarks on the frame
            annotated_image = draw_landmarks_on_image(frame_rgb, detection_result)
            
            # แสดงปุ่มควบคุมบนหน้าจอ
            cv2.putText(annotated_image, "Press 's' to start and 'e' to stop recording",
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

            # เช็คสถานะว่ากำลังบันทึกหรือไม่
            if recording:
                cv2.putText(annotated_image, "Recording...", (10, 60),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
            # Extract landmarks for prediction
            if detection_result.hand_landmarks and recording:
                for hand_landmarks in detection_result.hand_landmarks:
                    landmarks = []
                    for landmark in hand_landmarks.landmark:
                        landmarks.extend([landmark.x, landmark.y, landmark.z])

                    save_landmarks(landmarks, "label_placeholder")
            
            # Convert back to BGR for display
            annotated_image = cv2.cvtColor(annotated_image, cv2.COLOR_RGB2BGR)
            
            # Display the frame
            cv2.imshow('Hand Tracking', annotated_image)

            # Break the loop if 'q' is pressed
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == ord('s'):  # กด 's' เพื่อเริ่มบันทึก
                recording = True
                print("Recording started...")
            elif key == ord('e'):  # กด 'e' เพื่อหยุดบันทึก
                recording = False
                print("Recording stopped.")
                
    except Exception as e:
        print(f"Error occurred: {str(e)}")
    finally:
        # Clean up
        detector.close()
        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    main()