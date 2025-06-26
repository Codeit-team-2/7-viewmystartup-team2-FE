export function formatFromTrillionFloat(num) {
  if (typeof num !== "number" || num <= 0) return "0원";

  const trillion = Math.floor(num / 10000); // 1조 = 10000억
  const billion = num % 10000; // 억 단위 나머지

  let result = "";
  if (trillion > 0) result += `${trillion}조 `;
  if (billion > 0) result += `${billion}억`;

  return result.trim() || "0원";
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
