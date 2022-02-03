import React from 'react';
import { Header, Navbar, Unfinished } from '../../components';

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <Unfinished
        pageName="DEV INFO: MISSING SEARCH."
        message={['Last in production line']}
        respDev="Argo"
        devOrder="4"
      />
      <Unfinished
        pageName="DEV INFO: DESKTOP CSS."
        message={['Needs web formating']}
        respDev="Leo"
        devOrder="1"
      />
      <Unfinished
        pageName="Futuro componente de inicialização."
        message={['Card do YouTube', 'Card do blog', 'Card do Instagram']}
        respDev="Douglas"
        devOrder="1"
      />
      <Unfinished
        pageName="Futuro componente do rodapé."
        message={['Direito de uso', 'Github', 'Email de contato', 'Autores']}
        respDev="Daniel"
        devOrder="1"
      />
    </div>
  );
}
