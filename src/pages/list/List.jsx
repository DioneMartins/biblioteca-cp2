import React from 'react';
import { Navbar, BookCard, Unfinished } from '../../components';

export default function List() {
  return (
    <div>
      <Navbar />
      <Unfinished
        pageName="Futuro componente de header."
        message={['Aleatorização', 'Contagem']}
        respDev="Leo e Argo"
        devOrder="3"
      />
      <BookCard />
      <Unfinished
        pageName="Futuro componente de paginação."
        message={['Itens de paginação']}
        respDev="Leo e Argo"
        devOrder="2"
      />
    </div>
  );
}
