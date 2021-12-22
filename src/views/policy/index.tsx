import React from "react";

import { Wrapper, Container, Title } from "../../components/pagedefault";
import CommonLayout from "../../layout/common";

import {
  DescriptionLabel,
  TermPart,
  TermContainer,
  TermTitle,
  TermSubTitle,
} from "./index.style";

export default function index() {
  return (
    <CommonLayout>
      <Wrapper>
        <Container>
          <TermContainer>
            <TermPart>
              <Title>Políticas de Privacidade</Title>
              <DescriptionLabel>
                Toda informação ou dado pessoal prestado pelo Usuário à TreeBee
                é armazenada em servidores ou meios magnéticos de alta segurança
                e segue todos os critérios da Política de Privacidade, embasada
                na Lei Geral de Proteção de Dados (LGPD), que é parte deste
                Contrato. A TreeBee tomará todas as medidas possíveis para
                manter a confidencialidade e a segurança necessárias, porém não
                responderá por prejuízo que possa ser derivado da violação
                dessas medidas por parte de terceiros que utilizem as redes
                públicas ou a internet, subvertendo os sistemas de segurança
                para acessar as informações do Usuário. O Usuário será
                responsável por enviar as informações referentes ao status dos
                produtos aos compradores cuja venda tenha realizado, durante o
                processo de entrega dos pedidos. O prazo de entrega deverá ser
                estabelecido pela Usuário, sendo efetuados através dos meios de
                transporte que a Usuário determinar.
                <br />
                <br />A TreeBee não se responsabiliza por não cumprimento de
                obrigação fiscal pelo Usuário. Tais como: Falta de emissão de
                notas fiscais, mercadorias sem origem comprovada. Em caso de
                interpelação judicial que tenha como réu a Usuário, cujos fatos
                fundem-se em ações, omissões, imprudência, negligencia e
                imperícia do Usuário, este será chamado ao processo, devendo
                arcar com todos os ônus que daí decorram, nos termos do artigo
                125, II, do Código de Processo Civil. A TreeBee será eximida de
                responsabilidade da Usuário e os seus diretores, gerentes,
                empregados, agentes, operários, representantes e procuradores
                por ações ou omissões que violem os termos deste contrato. O
                Usuário, desde que faça a venda na plataforma, deve assumir, que
                os produtos anunciados na livecommerce, o vincula, na medida em
                que atua como um fornecedor de produtos, nos termos do artigo 30
                do Código de Defesa do Consumidor e do artigo 429 do Código
                Civil, cujo cumprimento pode ser exigido judicialmente pelo
                consumidor. O Usuário será responsável por realizar as trocas
                dos produtos que venham a apresentar defeitos e/ou vícios, nos
                termos do Código de Defesa do Consumidor e legislação aplicável.
                Por razões de segurança, o cadastro do Usuário poderá ser
                suspenso, a critério da TreeBee, caso esta suspeite de qualquer
                ilegitimidade, fraude ou qualquer outro ato contrário às
                disposições dos presentes termos e condições ou ainda até a
                apuração e verificação de: I - questões relativas à idoneidade
                do Usuário; II - reclamações pendentes; e, III - excesso de
                reclamações
              </DescriptionLabel>
            </TermPart>
          </TermContainer>
        </Container>
      </Wrapper>
    </CommonLayout>
  );
}
