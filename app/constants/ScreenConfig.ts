import { Dimensions } from "react-native"

const WindowWidth = Dimensions.get("window").width

export const CONTAINER_PADDING = WindowWidth / 25
export const ROW_PADDING = CONTAINER_PADDING / 4
export const ROW_GAP = ROW_PADDING * 2
export const ButtonWidthHeight = (WindowWidth - 2 * CONTAINER_PADDING - 3 * ROW_GAP) / 4

export const MAX_CURRENT_VALUE_LENGTH = 15