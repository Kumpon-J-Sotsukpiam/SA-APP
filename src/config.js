import * as FaceDetector from 'expo-face-detector'
 //kumpon df if = 192.168.43.216
 //champ 192.168.1.39
<<<<<<< HEAD
export const ip_server = '10.12.23.149' // my ip address
=======
export const ip_server = '192.168.1.39' // my ip address
>>>>>>> b8b7ea1c99028e07b5ba76e25654387b34f08321
export const port = 3001
export const server_url = `http://${ip_server}:${port}`

export const faceDetectorSetting = {
    mode: FaceDetector.Constants.Mode.accurate,
    detectLandmarks: FaceDetector.Constants.Landmarks.none,
    runClassifications: FaceDetector.Constants.Classifications.none,
    minDetectionInterval: 100,
    tracking: false
}