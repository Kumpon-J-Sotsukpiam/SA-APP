import * as FaceDetector from 'expo-face-detector'
 //kumpon df if = 192.168.43.216 and 192.168.42.196 and gateway 10.0.2.2
 //champ 192.168.1.39
export const ip_server = '192.168.1.39' // my ip address
export const port = 3001
export const deep_port = 5000
export const server_url = `http://${ip_server}:${port}`
export const deep_server_url = `http://${ip_server}:${deep_port}`

export const faceDetectorSetting = {
    mode: FaceDetector.Constants.Mode.accurate,
    detectLandmarks: FaceDetector.Constants.Landmarks.none,
    runClassifications: FaceDetector.Constants.Classifications.none,
    minDetectionInterval: 100,
    tracking: false
}