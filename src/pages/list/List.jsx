import React from 'react';
import { Navbar, BookCard, Unfinished } from '../../components';

export default function List() {
  return (
    <div>
      <Navbar />
      <Unfinished
        pageName="Futuro componente de header. Prioridade: 2"
        message={['Aleatorização', 'Contagem']}
      />
      <BookCard />
      <Unfinished
        pageName="Futuro componente de paginação. Prioridade: 5"
        message={['Itens de paginação']}
      />
    </div>
  );
}
