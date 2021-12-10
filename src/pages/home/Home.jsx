import React from 'react';
import { Header, Navbar, Unfinished } from '../../components';

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <Unfinished
        pageName="DEV INFO: MISSING SEARCH. Prioridade: 1"
        message={['Next in production line']}
      />
      <Unfinished
        pageName="Futuro componente de inicialização. Prioridade: 3"
        message={['Card do YouTube', 'Card do blog', 'Card do Instagram']}
      />
      <Unfinished
        pageName="Futuro componente do rodapé. Prioridade: 4"
        message={['Direito de uso', 'Github', 'Email de contato', 'Autores']}
      />
    </div>
  );
}
