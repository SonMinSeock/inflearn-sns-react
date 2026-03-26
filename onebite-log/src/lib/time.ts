export function formatTimeAgo(time: Date | string | number) {
  const start = new Date(time);
  const end = new Date();

  const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1000); // 1000(1ms)으로 초 단위로 변환

  if (secondDiff < 60) return "방금 전"; // 60초 전이면

  const minuteDiff = Math.floor(secondDiff / 60); // 분 변환

  if (minuteDiff < 60) return `${minuteDiff}분 전`; // 60분 전이면

  const hourDiff = Math.floor(minuteDiff / 60); // 시 변환

  if (hourDiff < 24) return `${hourDiff}시간 전`; // 24기간 전이면

  const dayDiff = Math.floor(hourDiff / 24); // 일 단위의 시간차

  return `${dayDiff}일 전`;
}
