import * as FaceDetector from 'expo-face-detector'
 //kumpon df if = 192.168.43.216 and gateway 10.0.2.2
 //champ 192.168.1.40
<<<<<<< HEAD
 //touch 172.20.10.7
export const ip_server = '172.20.10.7' // my ip address
=======
export const ip_server = '10.234.157.91' // my ip address
>>>>>>> 521c8303c151865e98aa826f6f638d330592ac89
export const port = 3001
export const server_url = `http://${ip_server}:${port}`

export const faceDetectorSetting = {
    mode: FaceDetector.Constants.Mode.accurate,
    detectLandmarks: FaceDetector.Constants.Landmarks.none,
    runClassifications: FaceDetector.Constants.Classifications.none,
    minDetectionInterval: 100,
    tracking: false
}   