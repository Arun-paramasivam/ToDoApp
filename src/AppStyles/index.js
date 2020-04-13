import { StyleSheet,Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window");
const standardScreenHeight = height
export const AppColors = {
  GREEN: "#22b71a",
  LIGHT_RED: 'rgba(209, 33, 21, 0.2)',
  RED: "#d12115",
  BLACK: "#272727",
  BLUE: "#09599a",
  GRAY: '#A8A8A8',
  WHITE: "#FFFFFF",
  TRANSPARENT: "transparent",
  LIGHT_GRAY: "#E8E8E8",
  LIGHT_GREEN: 'rgba(133, 216, 95, 0.2)',
  // APP_THEME: '#FF0000',
  // APP_THEME: 'rgb(30,144,255)',
  APP_THEME: '#04006B',
  HELPS_COLOR: '#CCCCCC',
  ACTIVE_QUESTION_TEXT_COLOR: '#07C8C2',
  ANSWER_PREVIEW_COLOR: '#EEEEEE',
  ACTIVE_QUESTION_COLOR: '#F9F9F9',
  LIGHT_APP_THEME: '#E9E8FF'
};

export const STYLES = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
