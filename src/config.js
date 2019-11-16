import * as FaceDetector from 'expo-face-detector'
 //kumpon df if = 192.168.43.216 and gateway 10.0.2.2
 //champ 192.168.1.40
<<<<<<< HEAD
export const ip_server = '192.168.43.216' // my ip address
=======
export const ip_server = '10.237.9.115' // my ip address
>>>>>>> a037d08923dd279891466ec5ffd371fa6e3a610c
export const port = 3001
export const server_url = `http://${ip_server}:${port}`

export const faceDetectorSetting = {
    mode: FaceDetector.Constants.Mode.accurate,
    detectLandmarks: FaceDetector.Constants.Landmarks.none,
    runClassifications: FaceDetector.Constants.Classifications.none,
    minDetectionInterval: 100,
    tracking: false
}