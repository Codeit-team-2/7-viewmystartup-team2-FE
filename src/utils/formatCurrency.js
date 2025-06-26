export function formatFromTrillionFloat(num) {
  if (typeof num !== "number" || num <= 0) return "0원";

  const kyung = Math.floor(num / 1e16); // 경 (10^16)
  const trillion = Math.floor((num % 1e16) / 1e12); // 조 (10^12)
  const billion = Math.floor((num % 1e12) / 1e8); // 억 (10^8)
  const man = Math.floor((num % 1e8) / 1e4); // 만 (10^4)
  const won = num % 1e4; // 원

  let result = "";

  if (kyung > 0) result += `${kyung}경 `;
  if (trillion > 0) result += `${trillion}조 `;
  if (billion > 0) result += `${billion}억 `;

  // 경 이상 또는 조 이상 또는 억 이상이면 원 단위는 제외
  if (kyung === 0 && trillion === 0 && billion === 0) {
    if (man > 0) result += `${man}만 `;
    if (won > 0 || result === "") result += `${won}원`;
  } else {
    // 억 이상일 때는 만 단위까지만 표시, 원은 제외
    if (man > 0) result += `${man}만 `;
  }

  return result.trim();
}
export function formatFromBillionFloat(num) {
  if (!num || typeof num !== "number") return "0원";

  const billion = Math.floor(num);
  const tenThousand = Math.floor((num - billion) * 10000);

  let result = "";
  if (billion > 0) result += `${billion}억 `;
  if (tenThousand > 0) result += `${tenThousand}만`;

  return result.trim() || "0원";
}

export function formatFromBillion(num) {
  if (!num || typeof num !== "number") return "0억";

  const billion = Math.floor(num);

  return `${billion}억`;
}
