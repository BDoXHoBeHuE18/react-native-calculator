import { Dimensions, Platform } from "react-native"

export const WindowWidth = Platform.OS === 'web' ?
    Math.min(Dimensions.get("window").width, 600) :
    Dimensions.get("window").width

const WindowHeight = Dimensions.get("window").height
export const MonitorHeight = 160

export const CONTAINER_PADDING = WindowWidth / 25
export const ROW_PADDING = CONTAINER_PADDING / 4
export const ROW_GAP = ROW_PADDING * 2

export const KeyboardHeight = WindowHeight - MonitorHeight - CONTAINER_PADDING

export const ButtonWidth = (WindowWidth - 2 * CONTAINER_PADDING - 3 * ROW_GAP) / 4
export const ButtonHeight = (KeyboardHeight - 12 * ROW_PADDING) / 6 - CONTAINER_PADDING

export const MAX_CURRENT_VALUE_LENGTH = 12
export const ROUND_TO = MAX_CURRENT_VALUE_LENGTH - 5

export default {}