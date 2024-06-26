import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_API;

// 선택한 연도의 키워드
export const getYearSummary = (year) => {
  const apiUrl = `${baseUrl}/result/summary?year=${year}`;

  return axios
    .get(apiUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 과거와 연결된 기사
export const postRelationArticles = (articleIds) => {
  const apiUrl = `${baseUrl}/result/related`;
  return axios
    .post(apiUrl, { id: articleIds })
    .then((response) => {
      return response.data; // 데이터 반환
    })
    .catch((error) => {
      console.error('Error requesting data:', error);
      throw error;
    });
};

// 게임 결과를 post하는 API
export const postGameResult = (resultData) => {
  const apiUrl = `${baseUrl}/my/result`;

  return axios
    .post(apiUrl, resultData)
    .then((response) => {
      console.log('게임 결과 Post 성공');
    })
    .catch((error) => {
      console.log('Error requesting data: ', error);
      throw error;
    });
};
