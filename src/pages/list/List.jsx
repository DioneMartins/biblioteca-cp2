import React from 'react';
import { Navbar, BookCard, Unfinished } from '../../components';

export default function List() {
  return (
    <div>
      <Navbar />
      <Unfinished
        pageName="Futuro componente de header."
        message={['Aleatorização', 'Contagem']}
        respDev="Leo e Dione"
        devOrder="2"
      />
      <BookCard />
      <Unfinished
        pageName="Futuro componente de paginação."
        message={['Itens de paginação']}
        respDev="Leo e Dione"
        devOrder="1"
      />
    </div>
  );
}
