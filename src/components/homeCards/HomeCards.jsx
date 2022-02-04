import React, { useState, useEffect } from 'react';
import { getInitCards } from '../../api/api';
import HomeCardsItem from './homeCarditem/HomeCardItem';

export default function HomeCards() {
  const [initCardsData, setInitCardsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  async function loadCards() {
    try {
      const cardArray = await getInitCards();
      setInitCardsData(cardArray);
    } catch (e) {
      setFailed(true);
    } finally {
      setLoading(false);
      console.log(initCardsData);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <>
      {isLoading && !failed && (
        <div>
          <p>Carregando</p>
        </div>
      )}
      {failed && (
        <div>
          <p>Erro</p>
        </div>
      )}
      {!isLoading && !failed && (
        <>
          {initCardsData.map(({ cardTitle, img, link, priority }, index) => {
            return <HomeCardsItem />;
          })}
        </>
      )}
    </>
  );
}
