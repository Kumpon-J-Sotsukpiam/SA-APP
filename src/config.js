import * as FaceDetector from 'expo-face-detector'
 //kumpon df if = 192.168.43.216
 //champ 192.168.1.39
export const ip_server = '192.168.42.196' // my ip address
export const port = 3001
export const server_url = `http://${ip_server}:${port}`

export const faceDetectorSetting = {
    mode: FaceDetector.Constants.Mode.accurate,
    detectLandmarks: FaceDetector.Constants.Landmarks.none,
    runClassifications: FaceDetector.Constants.Classifications.none,
    minDetectionInterval: 100,
    tracking: false
}