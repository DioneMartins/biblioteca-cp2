import React from 'react';
import { Navbar, BookCard, Unfinished, PagHeader, PagFooter } from '../../components';

export default function List() {
  return (
    <div>
      <Navbar />
      <PagHeader />
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
      <PagFooter />
    </div>
  );
}
