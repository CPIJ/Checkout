import labelMapping from "@/assets/class_names.transform.json"

export const randomIntBetween = (min, max) => Math.floor(Math.random() * max) + min;

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const isMobile = () =>
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i);

export const mediaConstraints = isMobile()
  ? { video: { facingMode: { exact: "environment" } } }
  : { video: true };


export const transformLabels = (original) => original.map(label => labelMapping[label] ? labelMapping[label] : label)