// src/utils/getCurrentPageData.js

/**
 * 현재 페이지 데이터 슬라이싱
 * @param {Array} data 전체 데이터
 * @param {number} page 현재 페이지
 * @param {number} pageSize 페이지당 아이템 수
 * @returns {Object} { currentPageData, startIndex, endIndex }
 */
export const getCurrentPageData = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);
  return { currentPageData, startIndex, endIndex };
};
