import _ from 'lodash';

function transformTransitionDuration(stringDuration: string): number {
  // always get the first duration
  const durationArr = _.split(stringDuration, ',');
  const timeInSeconds = _.toNumber(_.trimEnd(_.toLower(durationArr[0]), 's'));
  if (_.isNaN(timeInSeconds)) {
    return 0;
  }

  return timeInSeconds * 1000;
}

export default function getTransitionDurationFromElement(element: Element): number {
  if (!element) {
    return 0;
  }

  const elementStyle = window.getComputedStyle(element, null);
  const animationDuration = elementStyle.getPropertyValue('animation-duration');
  const transitionDuration = elementStyle.getPropertyValue('transition-duration');
  const durationArr = [];
  durationArr.push(transformTransitionDuration(animationDuration));
  durationArr.push(transformTransitionDuration(transitionDuration));
  return _.max(durationArr);
}
