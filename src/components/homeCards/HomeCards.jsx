import React, { useState, useEffect } from 'react';
import { getInitCards } from '../../api/api';

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
    <div>
      <p>Lembrar</p>
    </div>
  );
}
