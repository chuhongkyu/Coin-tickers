const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const data = await response.json();

  // 20개만 반환하도록 데이터를 제한합니다.
  const limitedData = data.slice(0, 20);

  return limitedData;
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 2;//
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then((response) =>
    response.json()
  );
}