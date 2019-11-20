import * as FaceDetector from 'expo-face-detector'
 //kumpon df if = 192.168.43.216 and gateway 10.0.2.2
 //champ 192.168.1.40
<<<<<<< HEAD
export const ip_server = '192.168.43.216' // my ip address
=======
//<<<<<<< HEAD
 //touch 172.20.10.7
export const ip_server = '172.20.10.7' // my ip address
//=======
//export const ip_server = '10.234.157.91' // my ip address
//>>>>>>> 521c8303c151865e98aa826f6f638d330592ac89
>>>>>>> 0841650f3edcb4723d32cfea1226f4996183b2a0
export const port = 3001
export const server_url = `http://${ip_server}:${port}`

export const faceDetectorSetting = {
    mode: FaceDetector.Constants.Mode.accurate,
    detectLandmarks: FaceDetector.Constants.Landmarks.none,
    runClassifications: FaceDetector.Constants.Classifications.none,
    minDetectionInterval: 100,
    tracking: false
}