import React, { useState, useEffect } from 'react';
import { getInitCards } from '../../api/api';
import HomeCardsItem from './homeCarditem/HomeCardItem';
import styles from './HomeCards.module.css';

const { homeCardWrapper } = styles;

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
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <>
      {isLoading && !failed && (
        <div className={homeCardWrapper}>
          <p>Carregando</p>
        </div>
      )}
      {failed && (
        <div>
          <p>Erro</p>
        </div>
      )}
      <div className={homeCardWrapper}>
        {!isLoading && !failed && (
          <>
            {initCardsData.map(({ cardTitle, img, link, priority }, index) => {
              return (
                <HomeCardsItem
                  key={index}
                  title={cardTitle}
                  image={img}
                  link={link}
                  priority={priority}
                  index={index}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
