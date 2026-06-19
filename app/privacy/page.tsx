import AppBar from "@/components/appBar";
import MaxWidth from "@/components/maxWidth";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MaxWidth>
        <AppBar exitButton={true} goBack={true} />
        <div className="pt-30 pb-5 flex flex-col gap-2 w-full text-(--gray)">
          <h2 className="text-2xl pb-4">
            <span>Política Privacidade</span>
          </h2>
          <div>
            <span>
              A sua privacidade é importante para nós. É política do{" "}
              <a
                href="https://palpita-muito.vercel.app"
                className="text-blue-700 font-bold"
              >
                Palpita Muito
              </a>{" "}
              respeitar a sua privacidade em relação a qualquer informação sua
              que possamos coletar no site{" "}
              <a
                href="https://palpita-muito.vercel.app"
                className="text-blue-700 font-bold"
              >
                Palpita Muito
              </a>
              , e outros sites que possuímos e operamos.
            </span>
          </div>
          <div>
            <span>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.
            </span>
          </div>
          <div>
            <span>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis ​​para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </span>
          </div>
          <div>
            <span>
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.
            </span>
          </div>
          <div>
            <span>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas{" "}
            </span>
            <a
              href="https://politicaprivacidade.com/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-700 font-bold"
            >
              políticas de privacidade
            </a>
            <span>.</span>
          </div>
          <div>
            <span>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </span>
          </div>
          <div>
            <span>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto connosco.
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <ul className="pl-4 list-disc">
              <li>
                <span>
                  O serviço Google AdSense que usamos para veicular publicidade
                  usa um cookie DoubleClick para veicular anúncios mais
                  relevantes em toda a Web e limitar o número de vezes que um
                  determinado anúncio é exibido para você.
                </span>
              </li>
              <li>
                <span>
                  Para mais informações sobre o Google AdSense, consulte as FAQs
                  oficiais sobre privacidade do Google AdSense.
                </span>
              </li>
              <li>
                <span>
                  Utilizamos anúncios para compensar os custos de funcionamento
                  deste site e fornecer financiamento para futuros
                  desenvolvimentos. Os cookies de publicidade comportamental
                  usados ​​por este site foram projetados para garantir que você
                  forneça os anúncios mais relevantes sempre que possível,
                  rastreando anonimamente seus interesses e apresentando coisas
                  semelhantes que possam ser do seu interesse.
                </span>
              </li>
              <li>
                <span>
                  Vários parceiros anunciam em nosso nome e os cookies de
                  rastreamento de afiliados simplesmente nos permitem ver se
                  nossos clientes acessaram o site através de um dos sites de
                  nossos parceiros, para que possamos creditá-los adequadamente
                  e, quando aplicável, permitir que nossos parceiros afiliados
                  ofereçam qualquer promoção que pode fornecê-lo para fazer uma
                  compra.
                </span>
              </li>
            </ul>
          </div>
          <br />
          <h3 className="text-lg pb-2">
            <span>Compromisso do Usuário</span>
          </h3>
          <div>
            <span>
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que o{" "}
              <a
                href="https://palpita-muito.vercel.app"
                className="text-blue-700 font-bold"
              >
                Palpita Muito
              </a>{" "}
              oferece no site e com caráter enunciativo, mas não limitativo:
            </span>
          </div>
          <ul className="pl-4 list-decimal">
            <li>
              <span>
                Não se envolver em atividades que sejam ilegais ou contrárias à
                boa fé a à ordem pública;
              </span>
            </li>
            <li>
              <span>
                Não difundir propaganda ou conteúdo de natureza racista,
                xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia
                ilegal, de apologia ao terrorismo ou contra os direitos humanos;
              </span>
            </li>
            <li>
              <span>
                Não causar danos aos sistemas físicos (hardwares) e lógicos
                (softwares) do{" "}
                <a
                  href="https://palpita-muito.vercel.app"
                  className="text-blue-700 font-bold"
                >
                  Palpita Muito
                </a>{" "}
                , de seus fornecedores ou terceiros, para introduzir ou
                disseminar vírus informáticos ou quaisquer outros sistemas de
                hardware ou software que sejam capazes de causar danos
                anteriormente mencionados.
              </span>
            </li>
          </ul>
          <br />
          <h3 className="text-lg pb-2">
            <span>Mais informações</span>
          </h3>
          <div>
            <span>
              Esperemos que esteja esclarecido e, como mencionado anteriormente,
              se houver algo que você não tem certeza se precisa ou não,
              geralmente é mais seguro deixar os cookies ativados, caso interaja
              com um dos recursos que você usa em nosso site.
            </span>
          </div>
          <div>
            <span>Esta política é efetiva a partir de 15 June 2026 23:11</span>
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}
