// ================================================================
// STATE
// ================================================================
let allFares = [];
let ratesData = {};
let ratesReadingDate = '';

// ================================================================
// AIRPORT NAMES
// ================================================================
const NAMES = {
  BUE:'Buenos Aires', EZE:'Buenos Aires', AEP:'Buenos Aires',
  COR:'Córdoba', ROS:'Rosario', MDZ:'Mendoza',
  GRU:'São Paulo', SAO:'São Paulo', GIG:'Río de Janeiro', RIO:'Río de Janeiro',
  SCL:'Santiago de Chile',
  BOG:'Bogotá', MDE:'Medellín', CLO:'Cali', BAQ:'Barranquilla', CTG:'Cartagena',
  SJO:'San José', UIO:'Quito', GYE:'Guayaquil', ASU:'Asunción',
  POS:'Puerto España', MVD:'Montevideo', LIM:'Lima',
  CUN:'Cancún', MEX:'Ciudad de México', GDL:'Guadalajara', MTY:'Monterrey',
  PTY:'Panamá', MIA:'Miami', JFK:'Nueva York', MCO:'Orlando',
  SAN:'San Diego', LAX:'Los Ángeles',
  GUA:'Ciudad de Guatemala', SAL:'San Salvador',
  SAP:'San Pedro Sula', XPL:'Comayagua, Tegucigalpa',
  MBJ:'Montego Bay', PUJ:'Punta Cana', GEO:'Georgetown',
  HAV:'La Habana', SDQ:'Santo Domingo', LPB:'La Paz', VVI:'Santa Cruz de la Sierra',
};
const gn = c => NAMES[c] || c;

const TC_CURR = ['COP','BRL','ARS','CLP','CRC','MXN','PEN','GTQ','HNL','CAD'];

// ================================================================
// TRANSLATIONS
// ================================================================
const TR = {
  es: {
    titlePrefix: 'Tarifas promocionales',
    p1: 'Las siguientes tarifas promocionales aplican para vuelos operados por Copa Airlines y Aerorepública S.A. (operando bajo la marca Copa Airlines Colombia), operados a través del Hub de las Américas® en Panamá.',
    p2: 'Aplica para vuelos de ida y vuelta en cabina económica, para las rutas detalladas en el apartado \u201cRutas incluidas y sillas disponibles\u201d, según el mercado de venta correspondiente. No aplica para itinerarios multi-ciudad ni vuelos en código compartido.',
    p3a: 'Las tarifas se muestran en la moneda local de cada país utilizando las siguientes tasas de cambio al',
    p3b: '. Para compras en moneda local, se aplicará el tipo de cambio referencial del día de la compra. Las tasas de cambio indicadas son únicamente referenciales y no garantizan el monto final a pagar, el cual dependerá del tipo de cambio vigente al momento de la compra, conforme a la moneda y medio de pago seleccionados.',
    p4: 'Los impuestos aeroportuarios y cargos gubernamentales no forman parte del descuento promocional y pueden variar según el aeropuerto y la fecha de viaje.',
    p5: 'Para compras en moneda local, se aplicará el tipo de cambio referencial del día de la compra. Las tasas de cambio indicadas son únicamente referenciales y no garantizan el monto final a pagar, el cual dependerá del tipo de cambio vigente al momento de la compra, conforme a la moneda y medio de pago seleccionados.',
    h3_buy: 'Reglas de compra y estadía',
    p_buy: 'Compra anticipada mínima: La compra del boleto deberá realizarse con una antelación mínima de {adv} respecto de la fecha de salida del primer vuelo del itinerario. La compra anticipada aplicable en cada ruta está detallada en la sección de \u201cRutas incluidas y sillas disponibles\u201d. No aplica estadía mínima.',
    h3_val: 'Vigencia de la promoción',
    p_val: 'Las tarifas promocionales estarán sujetas a las siguientes fechas, las cuales pueden variar por ruta y mercado:',
    li1: 'Primera fecha de compra: {d}', li2: 'Última fecha de compra: {d}',
    li3: 'Primera fecha de inicio de vuelo: {d}', li4: 'Última fecha de viaje: {d}',
    h3_rts: 'Rutas incluidas y sillas disponibles',
    p_rts: 'Las tarifas promocionales aplican exclusivamente para las siguientes rutas, con inventario limitado por cada una de ellas:',
    r_adv: 'Compra anticipada mínima: {n} días',
    r_seats: 'Sillas disponibles: {n}',
    r_bo: 'Blackout: {s} \u2013 {e}',
    p_inv: 'Una vez agotado el inventario asignado para una ruta específica, la tarifa promocional dejará de estar disponible para dicha ruta, aun cuando la promoción continúe vigente para otras rutas.  Las cantidades de sillas disponibles corresponden al total asignado por ruta para toda la vigencia de la promoción, y no garantizan disponibilidad en todos los vuelos, fechas u horarios.',
    h3_ch: 'Canales de compra y exclusiones',
    p_ch1: 'Válido únicamente para compras realizadas a través de copa.com, nuestro centro de reservaciones, oficinas de Copa Airlines y agencias de viajes. Para compras presenciales, agencias de viajes y centros de atención telefónica, se aplicará una tarifa administrativa adicional, la cual será informada antes de confirmar la compra.',
    p_ch2: 'La tarifa es por persona e incluye cargos por combustible, impuestos aeroportuarios y cargos gubernamentales, excepto impuestos o cargos no cobrados por Copa Airlines (por ejemplo, tasas de salida pagadas directamente en el aeropuerto).  No incluye tarifa administrativa, cargos de agencias de viajes, cargos por equipaje adicional o exceso, ni servicios opcionales. El desglose del precio total, incluyendo impuestos y cargos, será mostrado al pasajero antes de confirmar la compra. No es acumulable con otras promociones o descuentos.',
    h_fin: 'Disposiciones finales',
    p_fin1: 'Las tarifas están sujetas a disponibilidad al momento de la búsqueda y pueden no estar disponibles en todas las fechas o vuelos. Copa Airlines se reserva el derecho de modificar, extender o finalizar esta promoción respecto de tarifas no adquiridas, sin afectar boletos ya emitidos conforme a las condiciones vigentes al momento de la compra.',
    p_fin2: 'Es responsabilidad del pasajero cumplir con todos los requisitos migratorios y de salud exigidos por las autoridades de salida, tránsito y destino. Algunas regulaciones migratorias requieren comprobante de salida del país de destino.',
    p_fin3: 'Aplican las condiciones y restricciones de la clase tarifaria adquirida. Las condiciones de cambios, cancelaciones y reembolsos aplicarán conforme a la clase y/o familia tarifaria adquirida, incluyendo las penalidades y cargos aplicables, así como cualquier diferencia tarifaria que pueda generarse al momento del cambio.',
    p_fin4: 'Para consultas, el pasajero podrá comunicarse a través de los canales oficiales de atención al cliente de Copa Airlines: Centros de llamadas, Oficinas de Venta, Redes sociales o el Centro de ayuda en copa.com\u00a0\u00a0',
    h3_co: 'Términos y Condiciones Adicionales (SÓLO COLOMBIA)',
    co1: 'La presente es una tarifa promocional, no reembolsable, debidamente registrada ante la UAEAC. En consecuencia, no aplica el derecho de desistimiento.',
    co2: 'Derecho de retracto (aplicable únicamente a compras realizadas por canales no presenciales): El pasajero podrá ejercer el derecho de retracto cuando la compra del tiquete se haya realizado a través de canales no presenciales (incluyendo sitio web, aplicación móvil',
    co3: 'o\u00a0call\u00a0center), dentro de los\u00a0cinco (5) días\u00a0hábiles siguientes a la compra, siempre que el vuelo no esté programado para dentro de los cinco (5) días siguientes a la compra y no se haya iniciado el viaje.',
    co4: 'Para vuelos nacionales, el retracto deberá ejercerse con una anterioridad mínima de ocho (8) días calendario respecto de la fecha prevista para el inicio del vuelo. En el caso de vuelos internacionales, dicho término será de al menos quince (15) días calendario.',
    co5: 'En caso de ejercicio del derecho de retracto, no se aplicarán penalidades sobre la tarifa, sin perjuicio de la retención de la tarifa administrativa y de aquellos impuestos, tasas o cargos que, por disposición regulatoria, no sean reembolsables.',
    co6: 'Los datos personales recibidos y/o recopilados serán tratados de conformidad con la normativa vigente y aplicable en materia de protección de datos personales. Para conocer el detalle de nuestras políticas de privacidad y el tratamiento de los datos, puede consultar aquí:\u00a0',
    co7: 'Para conocer los requisitos de viaje, consulte:\u00a0',
    helpUrl: 'https://help.copaair.com/hc/es-419',
    privUrl: 'https://www.copaair.com/es-gs/legal/terminos-y-condiciones/politica-de-privacidad/',
    trvUrl: 'https://www.copaair.com/es/web/gs/requisitos-de-viaje',
    rPfx: 'al', conn: 'o', unit: 'días',
    months: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
    dateFmt: (d, m, y) => `${d} de ${m} de ${y}`,
  },
  en: {
    titlePrefix: 'Promotional Fares',
    p1: 'The following promotional fares apply to flights operated by Copa Airlines and Aerorepública S.A. (operating under the Copa Airlines Colombia brand), operated through the Hub of the Americas® in Panama.',
    p2: 'Applies to roundtrip flights in economy class, for the routes detailed in the "Included Routes and Available Seats" section, according to the corresponding sales market. Does not apply to multi-city itineraries or codeshare flights.',
    p3a: 'Fares are displayed in the local currency of each country using the following exchange rates as of',
    p3b: '. For purchases in local currency, the reference exchange rate of the day of purchase will apply. The indicated exchange rates are for reference purposes only and do not guarantee the final amount to be paid, which will depend on the exchange rate in effect at the time of purchase, in accordance with the selected currency and payment method.',
    p4: 'Airport taxes and government charges are not part of the promotional discount and may vary depending on the airport and travel date.',
    p5: 'For purchases in local currency, the reference exchange rate of the day of purchase will apply. The indicated exchange rates are for reference purposes only and do not guarantee the final amount to be paid, which will depend on the exchange rate in effect at the time of purchase, in accordance with the selected currency and payment method.',
    h3_buy: 'Purchase and Stay Rules',
    p_buy: 'Minimum advance purchase: The ticket must be purchased a minimum of {adv} in advance of the departure date of the first flight of the itinerary. The applicable advance purchase for each route is detailed in the "Included Routes and Available Seats" section. No minimum stay required.',
    h3_val: 'Promotion Validity',
    p_val: 'Promotional fares will be subject to the following dates, which may vary by route and market:',
    li1: 'First purchase date: {d}', li2: 'Last purchase date: {d}',
    li3: 'First flight start date: {d}', li4: 'Last travel date: {d}',
    h3_rts: 'Included Routes and Available Seats',
    p_rts: 'Promotional fares apply exclusively to the following routes, with limited inventory per route:',
    r_adv: 'Minimum advance purchase: {n} days',
    r_seats: 'Available seats: {n}',
    r_bo: 'Blackout: {s} \u2013 {e}',
    p_inv: "Once the inventory assigned for a specific route is exhausted, the promotional fare will no longer be available for that route, even if the promotion remains valid for other routes. The number of available seats corresponds to the total assigned per route for the entire promotion period and does not guarantee availability on all flights, dates, or schedules.",
    h3_ch: 'Purchase Channels and Exclusions',
    p_ch1: 'Valid only for purchases made through copa.com, our reservations center, Copa Airlines offices, and travel agencies. For in-person purchases, travel agencies, and telephone service centers, an additional administrative fee will apply, which will be disclosed before confirming the purchase.',
    p_ch2: 'The fare is per person and includes fuel charges, airport taxes, and government charges, except taxes or charges not collected by Copa Airlines (e.g., departure taxes paid directly at the airport). It does not include administrative fees, travel agency charges, additional or excess baggage fees, or optional services. The total price breakdown, including taxes and charges, will be shown to the passenger before confirming the purchase. It cannot be combined with other promotions or discounts.',
    h_fin: 'Final Provisions',
    p_fin1: 'Fares are subject to availability at the time of search and may not be available on all dates or flights. Copa Airlines reserves the right to modify, extend, or terminate this promotion with respect to unsold fares, without affecting tickets already issued under the conditions in effect at the time of purchase.',
    p_fin2: "It is the passenger's responsibility to comply with all immigration and health requirements imposed by the departure, transit, and destination authorities. Some immigration regulations require proof of departure from the destination country.",
    p_fin3: 'The conditions and restrictions of the purchased fare class apply. The conditions for changes, cancellations, and refunds will apply in accordance with the purchased fare class and/or fare family, including applicable penalties and charges, as well as any fare difference that may arise at the time of change.',
    p_fin4: 'For inquiries, passengers may contact Copa Airlines through official customer service channels: Call Centers, Sales Offices, Social Media, or the Help Center at copa.com\u00a0\u00a0',
    h3_co: 'Additional Terms and Conditions (COLOMBIA ONLY)',
    co1: 'This is a promotional, non-refundable fare, duly registered with the UAEAC. Therefore, the right of withdrawal does not apply.',
    co2: 'Right of retraction (applicable only to purchases made through non-in-person channels): The passenger may exercise the right of retraction when the ticket purchase was made through non-in-person channels (including website, mobile app',
    co3: 'or call center), within the five (5) business days following the purchase, provided that the flight is not scheduled within the five (5) days following the purchase and the trip has not begun.',
    co4: 'For domestic flights, the retraction must be exercised at least eight (8) calendar days before the scheduled start of the flight. For international flights, this period shall be at least fifteen (15) calendar days.',
    co5: 'In the event of exercising the right of retraction, no penalties will be applied to the fare, without prejudice to the retention of the administrative fee and any taxes, duties, or charges that, by regulatory provision, are non-refundable.',
    co6: 'Personal data received and/or collected will be processed in accordance with current applicable regulations on personal data protection. For details on our privacy policies and data processing, please consult:\u00a0',
    co7: 'To learn about travel requirements, consult:\u00a0',
    helpUrl: 'https://help.copaair.com',
    privUrl: 'https://www.copaair.com/en-gs/legal/terms-conditions/privacy-policy/',
    trvUrl: 'https://www.copaair.com/en/web/gs/travel-requirements',
    rPfx: 'as of', conn: 'or', unit: 'days',
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    dateFmt: (d, m, y) => `${m} ${d}, ${y}`,
  },
  pt: {
    titlePrefix: 'Tarifas Promocionais',
    p1: 'As seguintes tarifas promocionais aplicam-se a voos operados pela Copa Airlines e Aerorepública S.A. (operando sob a marca Copa Airlines Colombia), operados por meio do Hub das Américas® no Panamá.',
    p2: 'Aplica-se a voos de ida e volta na cabine econômica, para as rotas detalhadas na seção \u201cRotas incluídas e assentos disponíveis\u201d, de acordo com o mercado de venda correspondente. Não se aplica a itinerários de múltiplas cidades nem voos em código compartilhado.',
    p3a: 'As tarifas são exibidas na moeda local de cada país utilizando as seguintes taxas de câmbio em',
    p3b: '. Para compras em moeda local, será aplicada a taxa de câmbio de referência do dia da compra. As taxas de câmbio indicadas são apenas para referência e não garantem o valor final a ser pago, que dependerá da taxa de câmbio vigente no momento da compra, de acordo com a moeda e o meio de pagamento selecionados.',
    p4: 'Os impostos aeroportuários e encargos governamentais não fazem parte do desconto promocional e podem variar dependendo do aeroporto e da data de viagem.',
    p5: 'Para compras em moeda local, será aplicada a taxa de câmbio de referência do dia da compra. As taxas de câmbio indicadas são apenas para referência e não garantem o valor final a ser pago, que dependerá da taxa de câmbio vigente no momento da compra, de acordo com a moeda e o meio de pagamento selecionados.',
    h3_buy: 'Regras de compra e estadia',
    p_buy: 'Compra antecipada mínima: A compra do bilhete deve ser realizada com antecedência mínima de {adv} em relação à data de partida do primeiro voo do itinerário. A compra antecipada aplicável a cada rota está detalhada na seção de \u201cRotas incluídas e assentos disponíveis\u201d. Não há estadia mínima obrigatória.',
    h3_val: 'Vigência da promoção',
    p_val: 'As tarifas promocionais estarão sujeitas às seguintes datas, que podem variar por rota e mercado:',
    li1: 'Primeira data de compra: {d}', li2: 'Última data de compra: {d}',
    li3: 'Primeira data de início do voo: {d}', li4: 'Última data de viagem: {d}',
    h3_rts: 'Rotas incluídas e assentos disponíveis',
    p_rts: 'As tarifas promocionais aplicam-se exclusivamente às seguintes rotas, com inventário limitado para cada uma delas:',
    r_adv: 'Compra antecipada mínima: {n} dias',
    r_seats: 'Assentos disponíveis: {n}',
    r_bo: 'Blackout: {s} \u2013 {e}',
    p_inv: 'Uma vez esgotado o inventário atribuído a uma rota específica, a tarifa promocional não estará mais disponível para essa rota, mesmo que a promoção continue vigente para outras rotas. As quantidades de assentos disponíveis correspondem ao total atribuído por rota para toda a vigência da promoção e não garantem disponibilidade em todos os voos, datas ou horários.',
    h3_ch: 'Canais de compra e exclusões',
    p_ch1: 'Válido apenas para compras realizadas por meio de copa.com, nosso centro de reservas, escritórios da Copa Airlines e agências de viagens. Para compras presenciais, agências de viagens e centrais de atendimento telefônico, será aplicada uma taxa administrativa adicional, que será informada antes de confirmar a compra.',
    p_ch2: 'A tarifa é por pessoa e inclui encargos de combustível, impostos aeroportuários e encargos governamentais, exceto impostos ou encargos não cobrados pela Copa Airlines (por exemplo, taxas de saída pagas diretamente no aeroporto). Não inclui taxa administrativa, encargos de agências de viagens, taxas por bagagem adicional ou excesso, nem serviços opcionais. O detalhamento do preço total, incluindo impostos e encargos, será mostrado ao passageiro antes de confirmar a compra. Não é acumulável com outras promoções ou descontos.',
    h_fin: 'Disposições finais',
    p_fin1: 'As tarifas estão sujeitas à disponibilidade no momento da pesquisa e podem não estar disponíveis em todas as datas ou voos. A Copa Airlines reserva-se o direito de modificar, estender ou encerrar esta promoção em relação a tarifas não adquiridas, sem afetar bilhetes já emitidos de acordo com as condições vigentes no momento da compra.',
    p_fin2: 'É responsabilidade do passageiro cumprir todos os requisitos de imigração e saúde exigidos pelas autoridades de saída, trânsito e destino. Alguns regulamentos de imigração exigem comprovante de saída do país de destino.',
    p_fin3: 'Aplicam-se as condições e restrições da classe tarifária adquirida. As condições de alterações, cancelamentos e reembolsos aplicar-se-ão de acordo com a classe e/ou família tarifária adquirida, incluindo as penalidades e encargos aplicáveis, bem como qualquer diferença tarifária que possa ocorrer no momento da alteração.',
    p_fin4: 'Para consultas, o passageiro poderá entrar em contato por meio dos canais oficiais de atendimento ao cliente da Copa Airlines: Centrais de atendimento, Escritórios de Vendas, Redes sociais ou o Centro de Ajuda em copa.com\u00a0\u00a0',
    h3_co: 'Termos e Condições Adicionais (APENAS COLÔMBIA)',
    co1: 'A presente é uma tarifa promocional, não reembolsável, devidamente registrada perante a UAEAC. Por conseguinte, não se aplica o direito de arrependimento.',
    co2: 'Direito de retratação (aplicável apenas a compras realizadas por canais não presenciais): O passageiro poderá exercer o direito de retratação quando a compra do bilhete tiver sido realizada por meio de canais não presenciais (incluindo site, aplicativo móvel',
    co3: 'ou call center), dentro dos cinco (5) dias úteis seguintes à compra, desde que o voo não esteja programado para os cinco (5) dias seguintes à compra e a viagem não tenha sido iniciada.',
    co4: 'Para voos domésticos, a retratação deverá ser exercida com antecedência mínima de oito (8) dias corridos em relação à data prevista para o início do voo. No caso de voos internacionais, esse prazo será de pelo menos quinze (15) dias corridos.',
    co5: 'Em caso de exercício do direito de retratação, não serão aplicadas penalidades sobre a tarifa, sem prejuízo da retenção da taxa administrativa e dos impostos, taxas ou encargos que, por disposição regulatória, não sejam reembolsáveis.',
    co6: 'Os dados pessoais recebidos e/ou coletados serão tratados em conformidade com a regulamentação vigente e aplicável em matéria de proteção de dados pessoais. Para conhecer os detalhes de nossas políticas de privacidade e o tratamento dos dados, consulte aqui:\u00a0',
    co7: 'Para conhecer os requisitos de viagem, consulte:\u00a0',
    helpUrl: 'https://help.copaair.com',
    privUrl: 'https://www.copaair.com/pt-gs/legal/termos-condicoes/politica-privacidade/',
    trvUrl: 'https://www.copaair.com/pt/web/gs/requisitos-de-viagem',
    rPfx: 'em', conn: 'ou', unit: 'dias',
    months: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'],
    dateFmt: (d, m, y) => `${d} de ${m} de ${y}`,
  }
};

// ================================================================
// DRAG & DROP
// ================================================================
const uz = document.getElementById('uz');
uz.addEventListener('dragover', e => { e.preventDefault(); uz.classList.add('drag'); });
uz.addEventListener('dragleave', () => uz.classList.remove('drag'));
uz.addEventListener('drop', e => {
  e.preventDefault();
  uz.classList.remove('drag');
  handleFile({ target: { files: e.dataTransfer.files } });
});

// ================================================================
// FILE HANDLER
// ================================================================
function handleFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb = XLSX.read(e.target.result, { type: 'binary', cellDates: true });
      processFares(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' }));
      if (wb.SheetNames.length > 1)
        processRates(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], { defval: '' }));
      document.getElementById('fname').textContent = '✓ ' + file.name;
      document.getElementById('fname').style.display = 'block';
      uz.classList.add('ok');
      document.getElementById('genBtn').disabled = false;
      setStatus(`✓ ${allFares.length} rutas cargadas`, 's');
    } catch (err) {
      setStatus('✗ Error: ' + err.message, 'e');
    }
  };
  reader.readAsBinaryString(file);
}

// ================================================================
// PROCESS FARES
// ================================================================
function processFares(rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const fc = (...ns) => {
    for (const n of ns) {
      const f = keys.find(k => k.toLowerCase().replace(/\s/g, '').includes(n.toLowerCase().replace(/\s/g, '')));
      if (f) return f;
    }
    return null;
  };
  // Column positions: C(2)=ORI D(3)=DES X(23)=fp Y(24)=lp Z(25)=ff AA(26)=ignored AB(27)=lf
  const cOri = keys[2] ?? fc('ORI', 'Origin');
  const cDes = keys[3] ?? fc('DES', 'Dest');
  const cFP  = keys[23] ?? fc('PrimeraFechaCompra', 'StartDate');
  const cLP  = keys[24] ?? fc('UltimaFechaCompra', 'LastPurchase');
  const cFF  = keys[25] ?? fc('PrimeraFechaInicio', 'FirstFlight');
  const cLF  = keys[27] ?? fc('UltimaFechaVuelo', 'LastFlight');
  const cSt  = fc('Sillas', 'Seats', 'Available');
  const cAdv = fc('Advance', 'AdvPurch', 'ADVANCE');
  const cBOS = fc('BLACKOUT', 'BlackoutStart', 'Blackout Start');
  const cBOE = fc('BLACKOUT FIN', 'BlackoutEnd');

  const seen = new Set();
  allFares = rows.filter(r => r[cOri] && r[cDes]).reduce((acc, r) => {
    const k = `${String(r[cOri]).trim().toUpperCase()}-${String(r[cDes]).trim().toUpperCase()}`;
    if (seen.has(k)) return acc;
    seen.add(k);
    acc.push({
      ori: String(r[cOri] || '').trim().toUpperCase(),
      des: String(r[cDes] || '').trim().toUpperCase(),
      seats: r[cSt] ? fmtN(r[cSt]) : null,
      adv: r[cAdv] ? parseInt(r[cAdv]) : 7,
      fp: pDate(r[cFP]), lp: pDate(r[cLP]),
      ff: pDate(r[cFF]), lf: pDate(r[cLF]),
      bos: pDate(r[cBOS]), boe: pDate(r[cBOE]),
    });
    return acc;
  }, []);

  const mn = a => a.filter(Boolean).sort()[0];
  const mx = a => a.filter(Boolean).sort().slice(-1)[0];
  const fp = mn(allFares.map(r => r.fp)), lp = mx(allFares.map(r => r.lp));
  const ff = mn(allFares.map(r => r.ff)), lf = mx(allFares.map(r => r.lf));
  if (fp) document.getElementById('fp').value = fp;
  if (lp) document.getElementById('lp').value = lp;
  if (ff) document.getElementById('ff').value = ff;
  if (lf) document.getElementById('lf').value = lf;

  const tags = document.getElementById('rTags');
  tags.innerHTML = allFares.map(r =>
    `<span class="rt">${r.ori}→${r.des} <span class="rb">${r.adv}d</span>${r.seats ? `<span class="rb">${r.seats}</span>` : ''} ${r.bos && r.boe ? '<span class="rb" style="background:#fef9c3;color:#92400e">BO</span>' : ''}</span>`
  ).join('');
  document.getElementById('rCount').textContent = `(${allFares.length})`;
  document.getElementById('routesSec').style.display = 'block';
}

// ================================================================
// PROCESS RATES
// ================================================================
function processRates(rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const fc = (...ns) => {
    for (const n of ns) {
      const f = keys.find(k => k.toLowerCase().includes(n.toLowerCase()));
      if (f) return f;
    }
    return null;
  };
  const cC = fc('Currency'), cV = fc('Value in USD', 'Value'), cD = fc('Reading Date', 'Date');
  ratesData = {};
  rows.forEach(r => {
    const c = String(r[cC] || '').trim(), v = parseFloat(r[cV]) || 0;
    if (c && v && !ratesData[c]) ratesData[c] = v;
    if (!ratesReadingDate && r[cD]) ratesReadingDate = pDate(r[cD]);
  });
  document.getElementById('rList').innerHTML = TC_CURR.filter(c => ratesData[c])
    .map(c => `<div class="rc"><div class="cur">${c}</div><div class="val">${ratesData[c].toFixed(5)}</div></div>`)
    .join('');
  if (ratesReadingDate)
    document.getElementById('rDate').textContent = '(al ' + fmtD(ratesReadingDate, 'es') + ')';
  document.getElementById('ratesSec').style.display = 'block';
}

// ================================================================
// GENERATE ALL
// ================================================================
function generateAll() {
  const p = getParams();
  if (!p) return;
  document.getElementById('ph').style.display = 'none';
  ['es', 'en', 'pt'].forEach(lang => {
    const html = buildAirTRFX(lang, p);
    document.getElementById('out-' + lang).value = html;
    document.getElementById('meta-' + lang).textContent = `${html.length.toLocaleString()} car · ${allFares.length} rutas`;
    document.getElementById('card-' + lang).classList.add('visible');
  });
}

// ================================================================
// BUILD AIRTRFX HTML
// ================================================================
function buildAirTRFX(lang, p) {
  const t = TR[lang], e = encH, fd = d => fmtD(d, lang);
  const rDate = ratesReadingDate ? fd(ratesReadingDate) : '[fecha]';
  const rLine = buildRatesLine();
  const adv = buildAdv(lang);
  const { campaignName, divId, fp, lp, ff, lf } = p;

  const routesLI = allFares.map(r => {
    const pts = [
      `${e(gn(r.ori))} (${r.ori}) \u2013 ${e(gn(r.des))} (${r.des})`,
      t.r_adv.replace('{n}', r.adv),
    ];
    if (r.seats) pts.push(t.r_seats.replace('{n}', r.seats));
    if (r.bos && r.boe) pts.push(t.r_bo.replace('{s}', fd(r.bos)).replace('{e}', fd(r.boe)));
    return `<li>${pts.join(' | ')}</li>`;
  }).join('\n');

  const ap = (txt, ccp = '{}') =>
    `<p><span data-contrast="auto">${e(txt)}</span><span data-ccp-props="${ccp}">&nbsp;</span></p>`;
  const CCP  = '{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;335559738&quot;:240,&quot;335559739&quot;:240}';
  const CCP2 = '{&quot;335551550&quot;:6,&quot;335551620&quot;:6}';

  return `<div class="cm-design-system styles-override" id="${divId}" style="padding-top: 80px;">
<h2>${e(t.titlePrefix)} | ${e(campaignName)}</h2>
${ap(t.p1)}
${ap(t.p2)}
<p><span data-contrast="auto">${e(t.p3a)}&nbsp;${rDate}:&nbsp;</span><span data-contrast="auto">${rLine}</span><span data-contrast="auto">${e(t.p3b)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>
${ap(t.p4)}
${ap(t.p5, CCP)}
<h3>${e(t.h3_buy)}</h3>
${ap(t.p_buy.replace('{adv}', adv))}
<h3>${e(t.h3_val)}</h3>
<p>${e(t.p_val)}</p>
<ul>
<li>${e(t.li1.replace('{d}', fd(fp)))}</li>
<li>${e(t.li2.replace('{d}', fd(lp)))}</li>
<li>${e(t.li3.replace('{d}', fd(ff)))}</li>
<li>${e(t.li4.replace('{d}', fd(lf)))}</li>
</ul>
<h3>${e(t.h3_rts)}</h3>
<p>${e(t.p_rts)}</p>
<ul>
${routesLI}
</ul>
<p><span data-contrast="auto" xml:lang="ES-PA" lang="ES-PA">${e(t.p_inv)}</span><span class="EOP Selected SCXW48040990 BCX0" data-ccp-props="${CCP2}">&nbsp;</span></p>
<h3>${e(t.h3_ch)}</h3>
<p><span data-contrast="auto">${e(t.p_ch1)}</span><span data-ccp-props="${CCP2}">&nbsp;</span></p>
<p><span data-contrast="auto">${e(t.p_ch2)}</span><span data-ccp-props="${CCP2}">&nbsp;</span></p>
<p><strong>${e(t.h_fin)}</strong></p>
${ap(t.p_fin1)}
${ap(t.p_fin2)}
<p><span data-contrast="auto">${e(t.p_fin3)}</span><span data-ccp-props="${CCP2}">&nbsp;</span></p>
<p><span data-contrast="auto">${e(t.p_fin4)}</span><a href="${t.helpUrl}"><span data-contrast="auto">${t.helpUrl}</span></a><span data-ccp-props="${CCP}">&nbsp;</span></p>
<h3>${e(t.h3_co)}</h3>
<p><span data-contrast="none">${e(t.co1)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>
<p><span data-contrast="none">${e(t.co2)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>
<p><span data-contrast="none">${e(t.co3)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>
<p><span data-contrast="none">${e(t.co4)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>
<p><span data-contrast="none">${e(t.co5)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>
<p><span data-contrast="auto">${e(t.co6)}</span><a href="${t.privUrl}"><span data-contrast="auto">${t.privUrl}</span></a><span data-ccp-props="{}">&nbsp;</span></p>
<p><span data-contrast="auto">${e(t.co7)}</span><a href="${t.trvUrl}"><span data-contrast="auto">${t.trvUrl}</span></a><span data-ccp-props="{}">&nbsp;</span></p>
</div>`;
}

// ================================================================
// BUILD CONTENT STRUCTURE (for DOCX)
// ================================================================
function buildContent(lang, p) {
  const t = TR[lang], fd = d => fmtD(d, lang);
  const rDate = ratesReadingDate ? fd(ratesReadingDate) : '[fecha]';
  const rLine = buildRatesLine(), adv = buildAdv(lang);
  const { campaignName, fp, lp, ff, lf } = p;
  const paras = [];
  const P = (type, text, extra = {}) => paras.push({ type, ...extra, text: String(text) });

  P('h1', `${t.titlePrefix} | ${campaignName}`);
  P('p', t.p1); P('p', t.p2);
  P('p', `${t.p3a} ${rDate}: ${rLine}${t.p3b}`);
  P('p', t.p4); P('p', t.p5);
  P('h2', t.h3_buy); P('p', t.p_buy.replace('{adv}', adv));
  P('h2', t.h3_val); P('p', t.p_val);
  P('li', t.li1.replace('{d}', fd(fp))); P('li', t.li2.replace('{d}', fd(lp)));
  P('li', t.li3.replace('{d}', fd(ff))); P('li', t.li4.replace('{d}', fd(lf)));
  P('h2', t.h3_rts); P('p', t.p_rts);
  allFares.forEach(r => {
    const pts = [
      `${gn(r.ori)} (${r.ori}) \u2013 ${gn(r.des)} (${r.des})`,
      t.r_adv.replace('{n}', r.adv),
    ];
    if (r.seats) pts.push(t.r_seats.replace('{n}', r.seats));
    if (r.bos && r.boe) pts.push(t.r_bo.replace('{s}', fd(r.bos)).replace('{e}', fd(r.boe)));
    P('li', pts.join(' | '));
  });
  P('p', t.p_inv);
  P('h2', t.h3_ch); P('p', t.p_ch1); P('p', t.p_ch2);
  P('bold', t.h_fin);
  P('p', t.p_fin1); P('p', t.p_fin2); P('p', t.p_fin3);
  P('plink', t.p_fin4, { linkText: t.helpUrl, url: t.helpUrl });
  P('h2', t.h3_co);
  P('p', t.co1); P('p', t.co2); P('p', t.co3); P('p', t.co4); P('p', t.co5);
  P('plink', t.co6, { linkText: t.privUrl, url: t.privUrl });
  P('plink', t.co7, { linkText: t.trvUrl, url: t.trvUrl });
  return paras;
}

// ================================================================
// DOWNLOAD DOCX
// ================================================================
async function downloadDOCX(lang) {
  const p = getParams();
  if (!p) return;
  const btn = document.getElementById('dl-' + lang);
  btn.disabled = true;
  btn.textContent = '⏳ Generando...';
  try {
    const slug = document.getElementById('slug').value.trim() || 'TC';
    const paras = buildContent(lang, p);
    const blob = await makeDOCX(paras);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TC_${slug}_${lang.toUpperCase()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    alert('Error al generar DOCX: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = lang === 'en' ? '📥 Download DOCX' : lang === 'pt' ? '📥 Baixar DOCX' : '📥 Descargar DOCX';
  }
}

// ================================================================
// MAKE DOCX (JSZip + OOXML)
// ================================================================
async function makeDOCX(paras) {
  const hyperlinks = [];
  const bodyParas = paras.map(para => paraToXML(para, hyperlinks)).join('\n');

  const docXML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<w:body>
${bodyParas}
<w:sectPr>
  <w:pgSz w:w="12240" w:h="15840"/>
  <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
</w:sectPr>
</w:body>
</w:document>`;

  const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
${hyperlinks.map(h => `  <Relationship Id="${h.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${escXML(h.url)}" TargetMode="External"/>`).join('\n')}
</Relationships>`;

  const zip = new JSZip();
  zip.file('[Content_Types].xml', CONTENT_TYPES);
  zip.file('_rels/.rels', PACKAGE_RELS);
  zip.file('word/document.xml', docXML);
  zip.file('word/styles.xml', STYLES_XML);
  zip.file('word/settings.xml', SETTINGS_XML);
  zip.file('word/_rels/document.xml.rels', docRels);
  return await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

function paraToXML(para, hyperlinks) {
  const x = escXML;
  switch (para.type) {
    case 'h1':
      return `<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t xml:space="preserve">${x(para.text)}</w:t></w:r></w:p>`;
    case 'h2':
      return `<w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr><w:r><w:t xml:space="preserve">${x(para.text)}</w:t></w:r></w:p>`;
    case 'p':
      return `<w:p><w:r><w:t xml:space="preserve">${x(para.text)}</w:t></w:r></w:p>`;
    case 'bold':
      return `<w:p><w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">${x(para.text)}</w:t></w:r></w:p>`;
    case 'li':
      return `<w:p><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr><w:r><w:t xml:space="preserve">\u2022\u00a0\u00a0${x(para.text)}</w:t></w:r></w:p>`;
    case 'plink': {
      const rId = `rLnk${hyperlinks.length + 1}`;
      hyperlinks.push({ id: rId, url: para.url });
      return `<w:p><w:r><w:t xml:space="preserve">${x(para.text)}</w:t></w:r><w:hyperlink r:id="${rId}"><w:r><w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr><w:t xml:space="preserve">${x(para.linkText)}</w:t></w:r></w:hyperlink></w:p>`;
    }
    default:
      return '';
  }
}

// ================================================================
// DOCX STATIC XML STRINGS
// ================================================================
const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
</Types>`;

const PACKAGE_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const SETTINGS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:defaultTabStop w:val="720"/>
</w:settings>`;

const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:docDefaults>
    <w:rPrDefault><w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
      <w:sz w:val="22"/><w:szCs w:val="22"/>
    </w:rPr></w:rPrDefault>
    <w:pPrDefault><w:pPr>
      <w:spacing w:after="120"/>
    </w:pPr></w:pPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
  </w:style>
  <w:style w:type="character" w:styleId="DefaultParagraphFont">
    <w:name w:val="Default Paragraph Font"/>
  </w:style>
  <w:style w:type="character" w:styleId="Hyperlink">
    <w:name w:val="Hyperlink"/>
    <w:basedOn w:val="DefaultParagraphFont"/>
    <w:rPr><w:color w:val="0563C1"/><w:u w:val="single"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="240" w:after="60"/><w:outlineLvl w:val="0"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:bCs/><w:color w:val="1F3864"/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="200" w:after="60"/><w:outlineLvl w:val="1"/></w:pPr>
    <w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:bCs/><w:color w:val="1F3864"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>
  </w:style>
</w:styles>`;

// ================================================================
// UTILITIES
// ================================================================
function getParams() {
  const campaignName = document.getElementById('campName').value.trim();
  const divId = document.getElementById('divId').value.trim();
  const fp = document.getElementById('fp').value, lp = document.getElementById('lp').value;
  const ff = document.getElementById('ff').value, lf = document.getElementById('lf').value;
  if (!campaignName) { alert('Ingresa el nombre de la campaña'); return null; }
  if (!fp || !lp || !ff || !lf) { alert('Completa todas las fechas'); return null; }
  return { campaignName, divId, fp, lp, ff, lf };
}

function buildRatesLine() {
  const pts = TC_CURR.filter(c => ratesData[c]).map(c => `${ratesData[c].toFixed(5)} ${c}`);
  pts.push('1.00 USD');
  return pts.join(' | ');
}

function buildAdv(lang) {
  const t = TR[lang];
  const vs = [...new Set(allFares.map(r => r.adv).filter(Boolean))].sort((a, b) => a - b);
  if (!vs.length) return `7 ${t.unit}`;
  return vs.map(v => `${v} ${t.unit}`).join(` ${t.conn} `);
}

function fmtD(ds, lang) {
  if (!ds) return '';
  const t = TR[lang], [y, m, d] = ds.split('-');
  return t.dateFmt(parseInt(d), t.months[parseInt(m) - 1], y);
}

function pDate(val) {
  if (!val) return null;
  if (val instanceof Date) {
    const y = val.getFullYear(), m = val.getMonth() + 1, d = val.getDate();
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  if (typeof val === 'string') {
    let m;
    m = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
    m = val.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return m[0];
  }
  if (typeof val === 'number') {
    try {
      const d = XLSX.SSF.parse_date_code(val);
      if (d) return `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`;
    } catch (e) { /* ignore */ }
  }
  return null;
}

function fmtN(n) {
  const num = parseInt(String(n).replace(/[^0-9]/g, ''));
  return isNaN(num) ? String(n) : num.toLocaleString('en-US');
}

function encH(s) {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/á/g, '&aacute;').replace(/é/g, '&eacute;').replace(/í/g, '&iacute;')
    .replace(/ó/g, '&oacute;').replace(/ú/g, '&uacute;').replace(/ñ/g, '&ntilde;')
    .replace(/ü/g, '&uuml;').replace(/Á/g, '&Aacute;').replace(/É/g, '&Eacute;')
    .replace(/Í/g, '&Iacute;').replace(/Ó/g, '&Oacute;').replace(/Ú/g, '&Uacute;')
    .replace(/Ñ/g, '&Ntilde;').replace(/ã/g, '&atilde;').replace(/õ/g, '&otilde;')
    .replace(/â/g, '&acirc;').replace(/ê/g, '&ecirc;').replace(/ô/g, '&ocirc;')
    .replace(/ç/g, '&ccedil;').replace(/è/g, '&egrave;').replace(/à/g, '&agrave;')
    .replace(/®/g, '&reg;').replace(/\u201c/g, '&ldquo;').replace(/\u201d/g, '&rdquo;')
    .replace(/\u2013/g, '&ndash;').replace(/\u00a0/g, '&nbsp;');
}

function escXML(s) {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function copyLang(lang) {
  const ta = document.getElementById('out-' + lang);
  navigator.clipboard.writeText(ta.value).then(() => {
    const btn = document.getElementById('cp-' + lang);
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

function setStatus(msg, type) {
  document.getElementById('lstatus').innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
}

// ================================================================
// TAB SWITCHER
// ================================================================
function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.remove('hidden');
  document.getElementById('tab-btn-' + tab).classList.add('active');
}

// ================================================================
// FARES GENERATOR — CONFIG
// ================================================================
const STOREFRONTS = {
  pa: ['es', 'en'],
  ec: ['es', 'en', 'pt', 'fr'],
  us: ['es', 'en', 'pt'],
  br: ['en', 'pt'],
  ar: ['es', 'en', 'pt'],
  mx: ['es', 'en'],
  ca: ['es', 'en', 'fr'],
  co: ['es', 'en'],
  cl: ['es', 'en', 'pt'],
  cr: ['es', 'en', 'pt'],
  gs: ['es', 'en', 'pt', 'fr'],
};

const AIRPORT_SF = {
  PTY:'pa',
  UIO:'ec', GYE:'ec',
  MCO:'us', JFK:'us', SAN:'us', LAX:'us', MIA:'us',
  GRU:'br', GIG:'br', CGH:'br',
  EZE:'ar', AEP:'ar', MDZ:'ar', COR:'ar', ROS:'ar',
  CUN:'mx', MEX:'mx', GDL:'mx', MTY:'mx',
  YYZ:'ca', YVR:'ca', YUL:'ca',
  BOG:'co', MDE:'co', CLO:'co', BAQ:'co', CTG:'co',
  SCL:'cl',
  SJO:'cr',
};

// currency per storefront (same logic as Svelte getCurrencyCode)
const SF_CURRENCY = {
  pa:'USD', ec:'USD', us:'USD', br:'BRL', ar:'USD',
  mx:'MXN', ca:'CAD', co:'COP', cl:'CLP', cr:'CRC', gs:'USD',
};

// multilingual city names (HTML-entity encoded where needed)
const FARE_CITIES = {
  PTY:{ es:'Panam&aacute;',      en:'Panama',           pt:'Panam&aacute;',      fr:'Panama' },
  BOG:{ es:'Bogot&aacute;',      en:'Bogota',           pt:'Bogot&aacute;',      fr:'Bogota' },
  MDE:{ es:'Medell&iacute;n',    en:'Medellin',         pt:'Medell&iacute;n',    fr:'Medell&iacute;n' },
  CLO:{ es:'Cali',               en:'Cali',             pt:'Cali',               fr:'Cali' },
  BAQ:{ es:'Barranquilla',       en:'Barranquilla',     pt:'Barranquilla',       fr:'Barranquilla' },
  CTG:{ es:'Cartagena',          en:'Cartagena',        pt:'Cartagena',          fr:'Cartagena' },
  UIO:{ es:'Quito',              en:'Quito',            pt:'Quito',              fr:'Quito' },
  GYE:{ es:'Guayaquil',         en:'Guayaquil',        pt:'Guayaquil',          fr:'Guayaquil' },
  MCO:{ es:'Orlando',            en:'Orlando',          pt:'Orlando',            fr:'Orlando' },
  JFK:{ es:'Nueva York',         en:'New York',         pt:'Nova York',          fr:'New York' },
  SAN:{ es:'San Diego',          en:'San Diego',        pt:'San Diego',          fr:'San Diego' },
  LAX:{ es:'Los &Aacute;ngeles', en:'Los Angeles',      pt:'Los Angeles',        fr:'Los Angeles' },
  MIA:{ es:'Miami',              en:'Miami',            pt:'Miami',              fr:'Miami' },
  GRU:{ es:'Sao Paulo',          en:'Sao Paulo',        pt:'Sao Paulo',          fr:'Sao Paulo' },
  CGH:{ es:'Sao Paulo',          en:'Sao Paulo',        pt:'Sao Paulo',          fr:'Sao Paulo' },
  GIG:{ es:'Rio de Janeiro',     en:'Rio de Janeiro',   pt:'Rio de Janeiro',     fr:'Rio de Janeiro' },
  EZE:{ es:'Buenos Aires',       en:'Buenos Aires',     pt:'Buenos Aires',       fr:'Buenos Aires' },
  AEP:{ es:'Buenos Aires',       en:'Buenos Aires',     pt:'Buenos Aires',       fr:'Buenos Aires' },
  MDZ:{ es:'Mendoza',            en:'Mendoza',          pt:'Mendoza',            fr:'Mendoza' },
  COR:{ es:'C&oacute;rdoba',     en:'Cordoba',          pt:'Cordoba',            fr:'Cordoba' },
  ROS:{ es:'Rosario',            en:'Rosario',          pt:'Ros&aacute;rio',     fr:'Rosario' },
  CUN:{ es:'Cancun',             en:'Cancun',           pt:'Cancun',             fr:'Cancun' },
  MEX:{ es:'Ciudad de M&eacute;xico', en:'Mexico City', pt:'Cidade do M&eacute;xico', fr:'Mexico' },
  GDL:{ es:'Guadalajara',        en:'Guadalajara',      pt:'Guadalajara',        fr:'Guadalajara' },
  MTY:{ es:'Monterrey',          en:'Monterrey',        pt:'Monterrey',          fr:'Monterrey' },
  YYZ:{ es:'Toronto',            en:'Toronto',          pt:'Toronto',            fr:'Toronto' },
  YVR:{ es:'Vancouver',          en:'Vancouver',        pt:'Vancouver',          fr:'Vancouver' },
  YUL:{ es:'Montreal',           en:'Montreal',         pt:'Montreal',           fr:'Montr&eacute;al' },
  SCL:{ es:'Santiago de Chile',  en:'Santiago de Chile',pt:'Santiago de Chile',  fr:'Santiago de Chile' },
  SJO:{ es:'San Jos&eacute;',    en:'San Jos&eacute;',  pt:'San Jos&eacute;',    fr:'San Jos&eacute;' },
  MBJ:{ es:'Montego Bay',        en:'Montego Bay',      pt:'Montego Bay',        fr:'Montego Bay' },
  PUJ:{ es:'Punta Cana',         en:'Punta Cana',       pt:'Punta Cana',         fr:'Punta Cana' },
  SDQ:{ es:'Santo Domingo',      en:'Santo Domingo',    pt:'Santo Domingo',      fr:'Santo Domingo' },
  HAV:{ es:'La Habana',          en:'Havana',           pt:'Havana',             fr:'La Havane' },
  ASU:{ es:'Asunci&oacute;n',    en:'Asuncion',         pt:'Assun&ccedil;&atilde;o', fr:'Asuncion' },
  MVD:{ es:'Montevideo',         en:'Montevideo',       pt:'Montevideo',         fr:'Montevideo' },
  LIM:{ es:'Lima',               en:'Lima',             pt:'Lima',               fr:'Lima' },
  GUA:{ es:'Guatemala',          en:'Guatemala',        pt:'Guatemala',          fr:'Guatemala' },
  SAL:{ es:'San Salvador',       en:'San Salvador',     pt:'San Salvador',       fr:'San Salvador' },
  SAP:{ es:'San Pedro Sula',     en:'San Pedro Sula',   pt:'San Pedro Sula',     fr:'San Pedro Sula' },
  XPL:{ es:'Comayagua, Tegucigalpa', en:'Comayagua, Tegucigalpa', pt:'Comayagua, Tegucigalpa', fr:'Comayagua, Tegucigalpa' },
  GEO:{ es:'Georgetown',         en:'Georgetown',       pt:'Georgetown',         fr:'Georgetown' },
  POS:{ es:'Puerto Espa&ntilde;a', en:'Port of Spain',  pt:'Port of Spain',      fr:'Port of Spain' },
  LPB:{ es:'La Paz',             en:'La Paz',           pt:'La Paz',             fr:'La Paz' },
  VVI:{ es:'Santa Cruz de la Sierra', en:'Santa Cruz de la Sierra', pt:'Santa Cruz de la Sierra', fr:'Santa Cruz de la Sierra' },
};

// Known destination image UUIDs from Directus
const DEST_IMG_CACHE = {
  BOG: '1b589009-eb2d-466d-adb4-df5c872e76fa',
  CUN: '5766915a-4092-4508-bf2a-7f82497d9a40',
};

let fareRows = [];

// ================================================================
// FARES — FILE HANDLER
// ================================================================
const fuz = document.getElementById('fuz');
fuz.addEventListener('dragover', e => { e.preventDefault(); fuz.classList.add('drag'); });
fuz.addEventListener('dragleave', () => fuz.classList.remove('drag'));
fuz.addEventListener('drop', e => {
  e.preventDefault(); fuz.classList.remove('drag');
  handleFaresFile({ target: { files: e.dataTransfer.files } });
});

function handleFaresFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb = XLSX.read(e.target.result, { type: 'binary', cellDates: true });
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
      processFaresExcel(rows);
      // Try to load exchange rates from Sheet 2 if not already loaded
      if (!Object.keys(ratesData).length && wb.SheetNames.length > 1) {
        processRates(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], { defval: '' }));
      }
      document.getElementById('ffname').textContent = '✓ ' + file.name;
      document.getElementById('ffname').style.display = 'block';
      fuz.classList.add('ok');
    } catch (err) {
      setFaresStatus('✗ Error: ' + err.message, 'e');
    }
  };
  reader.readAsBinaryString(file);
}

function processFaresExcel(rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const fc = name => keys.find(k => k.toLowerCase().replace(/[\s_]/g, '').includes(name.toLowerCase().replace(/[\s_]/g, ''))) || null;

  const cStatus   = fc('status');
  const cCampaign = fc('campaign');
  const cOri      = fc('origin');
  const cDes      = fc('destination');
  const cPriceBef = fc('pricebefore') || fc('price_before') || fc('price before');
  const cPrice    = keys.find(k => k.toLowerCase().trim() === 'price') || fc('price');
  const cDep      = fc('departure');
  const cRet      = fc('return');
  const cTax      = fc('tax');

  fareRows = rows
    .map(r => ({
      status:      String(r[cStatus]   || '').toLowerCase().trim(),
      campaign:    String(r[cCampaign] || '').toLowerCase().trim(),
      origin:      String(r[cOri]      || '').toUpperCase().trim(),
      destination: String(r[cDes]      || '').toUpperCase().trim(),
      price_before: parseFloat(r[cPriceBef]) || 0,
      price:        parseFloat(r[cPrice])    || 0,
      departure:    pDate(r[cDep]),
      return:       pDate(r[cRet]),
      taxes:        parseFloat(r[cTax])      || 0,
    }))
    .filter(r => r.origin && r.destination && r.price);

  const campaigns = [...new Set(fareRows.map(r => r.campaign))].filter(Boolean);
  if (campaigns.length === 1) document.getElementById('faresCampaign').value = campaigns[0];

  // Show campaign summary
  const preview = document.getElementById('faresPreview');
  preview.style.display = 'block';
  preview.innerHTML = campaigns.map(c => {
    const n = fareRows.filter(r => r.campaign === c).length;
    return `<span class="rt">${c} <span class="rb">${n}</span></span>`;
  }).join('');

  document.getElementById('faresGenBtn').disabled = false;
  setFaresStatus(`✓ ${fareRows.length} tarifas cargadas`, 's');

  // Async: try to fetch missing destination images from Directus
  fetchDestImages();
}

async function fetchDestImages() {
  try {
    const res = await fetch('https://cm-marketing.directus.app/items/destination?fields=iata_code,main_image&limit=-1');
    if (!res.ok) return;
    const { data } = await res.json();
    data.forEach(d => {
      if (d.iata_code && d.main_image) DEST_IMG_CACHE[d.iata_code] = d.main_image;
    });
  } catch (_) { /* public endpoint might require auth – silently fail */ }
}

// ================================================================
// FARES — GENERATE
// ================================================================
function generateFares() {
  const campaign = document.getElementById('faresCampaign').value.trim().toLowerCase();

  const filtered = fareRows.filter(r => {
    const activeOk = !r.status || r.status === 'active';
    const campOk   = !campaign || r.campaign === campaign;
    return activeOk && campOk;
  });
  if (!filtered.length) { alert('No hay tarifas activas para esa campaña.'); return; }

  document.getElementById('faresPh').style.display = 'none';

  ['es', 'en', 'pt'].forEach(lang => {
    const html = buildFaresForLang(filtered, lang, campaign);
    document.getElementById(`outFares-${lang}`).value = html;
    document.getElementById(`faresMeta-${lang}`).textContent =
      `${(html.length / 1024).toFixed(1)} KB · ${filtered.length} tarifas`;
    document.getElementById(`faresCard-${lang}`).style.display = 'block';
  });
}

function buildFaresForLang(fares, lang, campaign) {
  const blocks = [];

  Object.entries(STOREFRONTS).forEach(([country, langs]) => {
    if (!langs.includes(lang)) return;

    const sfFares = fares.filter(f => {
      const sf = AIRPORT_SF[f.origin] || 'gs';
      return country === 'gs' ? sf === 'gs' : sf === country;
    });

    const innerHTML = sfFares.length
      ? `<div class="container mx-auto">\n<ol class="grid justify-center gap-3 pb-8" style="grid-template-columns: repeat(auto-fit, minmax(376px, 1fr));">\n${sfFares.map(f => buildFareCard(f, lang, country)).join('\n')}\n</ol>\n</div>`
      : `<div class="container mx-auto">\n<p></p>\n</div>`;

    blocks.push(`<div class="hidden" data-country="${country}" data-lang="${lang}">\n${innerHTML}\n</div>`);
  });

  const disclaimer = buildTcDisclaimerParagraph(campaign || 'terminos-y-condiciones', lang);

  const scriptDeleteAll = `<script type="text/javascript">
(function deleteAll() {
  const x = document.querySelectorAll(".__pfs, .__bss, .__psc");
  for (i = 0; i < x.length; i++) { x[i].classList.remove('__pfs', '__bss', '__psc'); }
})();
<\/script>`;

  const scriptDataLayer = `<script>
setTimeout(() => {
  const country = EM?.dataLayer?.[0]?.page?.countryIsoCode?.toLowerCase() || "gs";
  const lang    = EM?.dataLayer?.[0]?.page?.languageIsoCode?.toLowerCase() || "${lang}";
  const allDivs = document.querySelectorAll('div[data-country][data-lang]');
  allDivs.forEach((div) => {
    const match =
      div.getAttribute('data-country')?.toLowerCase() === country &&
      div.getAttribute('data-lang')?.toLowerCase()    === lang;
    div.classList.toggle('hidden', !match);
  });
}, 3000);
<\/script>`;

  return `<div id="app">\n${blocks.join('\n')}\n</div>\n${disclaimer}\n${scriptDeleteAll}\n${scriptDataLayer}`;
}

function buildFareCard(fare, lang, country) {
  const connWord  = lang === 'es' ? ' a'           : lang === 'en' ? ' to'       : ' para';
  const tripType  = lang === 'es' ? 'Ida y Vuelta' : lang === 'en' ? 'Roundtrip' : 'Ida e volta';
  const fromWord  = lang === 'es' ? 'desde'        : lang === 'en' ? 'from'      : 'de';
  const taxLabel  = lang === 'en' ? 'Taxes included' : lang === 'es' ? 'Impuestos incluidos de' : 'Impostos inclu&iacute;dos em';

  const currency = SF_CURRENCY[country] || 'USD';
  const price     = fareConvertFmt(fare.price, currency);
  const pbefore   = fare.price_before ? fareConvertFmt(fare.price_before, currency) : null;
  const taxes     = fare.taxes        ? fareConvertFmt(fare.taxes, currency)        : null;

  const oriName = fareCityName(fare.origin, lang);
  const desName = fareCityName(fare.destination, lang);
  const imgUUID = DEST_IMG_CACHE[fare.destination] || '1b589009-eb2d-466d-adb4-df5c872e76fa';
  const imgSrc  = `https://cm-marketing.directus.app/assets/${imgUUID}`;

  const dep = fareFormatDate(fare.departure, lang);
  const ret = fareFormatDate(fare.return, lang);

  const href = `https://shopping.copaair.com/?roundtrip=true&amp;adults=1&amp;children=0&amp;infants=0&amp;sf=${country}&amp;langid=${lang}&amp;date1=${fare.departure}&amp;date2=${fare.return}&amp;promocode=&amp;area1=${fare.origin}&amp;area2=${fare.destination}&amp;advanced_air_search=false&amp;flexible_dates_v2=false&amp;origin=EM`;

  const pbSpan = pbefore
    ? `<span class="font-normal text-d1 self-end font-suisse text-grey-600 line-through ">${currency}&nbsp;${pbefore}</span>`
    : '';
  const taxSpan = taxes
    ? `<span class="font-suisse flex gap-1 justify-end font-normal text-d3 text-grey-600  s-TlaWMsF1F1vX"><strong>${taxLabel}</strong> ${currency}&nbsp;${taxes}</span>`
    : '';

  return `<li class="custom-fares h-full w-full max-w-[400px]"><a class="grid grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] overflow-hidden rounded-2xl outline outline-1 outline-grey-300 hover:outline-2 hover:outline-primary-ultralight focus:outline-2 focus:outline-primary-ultralight" role="button" href="${href}" data-oac="${fare.origin}" data-dac="${fare.destination}" data-departure-date="${fare.departure}" data-return-date="${fare.return}" data-price="USD ${fare.price}"><img class="col-start-1 col-end-3 row-span-full h-full w-full object-cover" loading="lazy" alt="${desName.replace(/&[^;]+;/g, '')}" src="${imgSrc}" /> <span class="col-start-3 col-end-3 row-start-2 row-end-2 mx-2 mb-2 flex flex-col gap-1"><span class="text-b font-bold flex h-auto flex-col font-gilroy text-primary"><span>${oriName} (${fare.origin})${connWord}</span> <span>${desName} (${fare.destination})</span></span> <span class="flex h-auto items-center gap-2"><img src="https://cm-marketing.directus.app/assets/5c8e2708-d6e2-4de0-ad47-60b94c7f512f" class="h-[10.3px] w-[11.6px]" alt="date" /> <span class="font-suisse font-normal text-d3 text-grey-600"> ${tripType}<br />${dep} - ${ret}</span></span></span> <span class="col-start-3 col-end-3 row-start-3 row-end-3 mx-2 mt-2"><span class="flex grid-rows-subgrid flex-col items-end">${pbSpan}<span class="gap-y-2"><span class="font-suisse font-normal text-d3 text-grey-600 ">${fromWord} <span class="text-u2 font-gilroy font-bold text-primary lg:text-u1 ">${currency}&nbsp;${price}<sup>*</sup></span></span></span></span>${taxSpan}</span></a></li>`;
}

// ================================================================
// FARES — UTILITIES
// ================================================================
function fareCityName(iata, lang) {
  const city = FARE_CITIES[iata];
  if (!city) return iata;
  return city[lang] || city['en'] || iata;
}

function fareFormatDate(dateStr, lang) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const locale = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-419' : 'pt-BR';
  return date.toLocaleDateString(locale, options).replace(/\./g, '');
}

function fareConvertFmt(priceUSD, currencyCode) {
  if (currencyCode === 'USD' || !ratesData[currencyCode]) {
    return fareFmtNum(Math.ceil(priceUSD), 'USD');
  }
  const localPrice = Math.ceil(priceUSD / ratesData[currencyCode]);
  return fareFmtNum(localPrice, currencyCode);
}

function fareFmtNum(n, currency) {
  const sep = ['COP', 'BRL'].includes(currency) ? '.' : ',';
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

function copyFares(lang) {
  const ta  = document.getElementById(`outFares-${lang}`);
  const btn = document.getElementById(`cpFares-${lang}`);
  navigator.clipboard.writeText(ta.value).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

function setFaresStatus(msg, type) {
  document.getElementById('flstatus').innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
}

// ================================================================
// DIRECTUS SYNC — CONFIG & STATE
// ================================================================
const DX_BASE = 'https://cm-marketing.directus.app';

const DX_COUNTRY_TO_SF = {
  PA:'pa', US:'us', BR:'br', AR:'ar', MX:'mx',
  CA:'ca', CO:'co', CL:'cl', CR:'cr', EC:'ec',
};

let dxFareRows = [];
let dxRatesRows = [];

// ================================================================
// SHARED — T&C DISCLAIMER PARAGRAPH (auto-built from campaign name)
// ================================================================
function buildTcDisclaimerParagraph(campaign, lang) {
  const hash = `#${campaign}`;
  const urls = {
    es: `https://www.copaair.com/es/vuelos-terminos-y-condiciones${hash}`,
    en: `https://www.copaair.com/en/flights-terms-and-conditions${hash}`,
    pt: `https://www.copaair.com/pt/voos-termos-e-condicoes${hash}`,
  };
  const inner = {
    es: `*Aplican restricciones, consulte nuestros <a href="${urls.es}" target="_blank" rel="noopener"><span class="font-suisse font-normal text-d1 text-primary hover:!underline">T&eacute;rminos y condiciones</span></a>.`,
    en: `*Restrictions apply, please consult our <a href="${urls.en}" target="_blank" rel="noopener"><span class="font-suisse font-normal text-d1 text-primary hover:!underline">Terms and conditions</span></a>.`,
    pt: `*Aplicam-se restri&ccedil;&otilde;es, consulte nossos <a href="${urls.pt}" target="_blank" rel="noopener"><span class="font-suisse font-normal text-d1 text-primary hover:!underline">Termos e condi&ccedil;&otilde;es</span></a>.`,
  };
  return `<p class="font-suisse font-normal text-d1 text-grey-600 text-center pb-12 container mx-auto">${inner[lang]}</p>`;
}

// ================================================================
// DIRECTUS SYNC — DRAG & DROP
// ================================================================
const dxuz = document.getElementById('dxuz');
dxuz.addEventListener('dragover', e => { e.preventDefault(); dxuz.classList.add('drag'); });
dxuz.addEventListener('dragleave', () => dxuz.classList.remove('drag'));
dxuz.addEventListener('drop', e => {
  e.preventDefault();
  dxuz.classList.remove('drag');
  handleDirectusFile({ target: { files: e.dataTransfer.files } });
});

// ================================================================
// DIRECTUS SYNC — FILE HANDLER
// ================================================================
function handleDirectusFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb = XLSX.read(e.target.result, { type: 'binary', cellDates: true });
      const fareSheet = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
      const rateSheet = wb.SheetNames.length > 1
        ? XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]], { defval: '' })
        : [];

      processDxFares(fareSheet);
      processDxRates(rateSheet);

      document.getElementById('dxfname').textContent = '✓ ' + file.name;
      document.getElementById('dxfname').style.display = 'block';
      dxuz.classList.add('ok');

      const campaigns = [...new Set(dxFareRows.map(r => r.campaign).filter(Boolean))];
      if (campaigns.length === 1) document.getElementById('dxCampaign').value = campaigns[0];

      document.getElementById('dxSyncBtn').disabled = false;
      // Status detail is set inside processDxFares after column detection
    } catch (err) {
      document.getElementById('dxFileStatus').innerHTML =
        `<div class="alert alert-e">✗ Error: ${err.message}</div>`;
    }
  };
  reader.readAsBinaryString(file);
}

// ================================================================
// DIRECTUS SYNC — PARSE FARES FROM EXCEL
// ================================================================
function processDxFares(rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);

  // fc(...names): finds the FIRST column whose name CONTAINS any of the given terms (normalized)
  const fc = (...names) => {
    for (const name of names) {
      const norm = name.toLowerCase().replace(/[\s_]/g, '');
      const hit = keys.find(k => k.toLowerCase().replace(/[\s_]/g, '').includes(norm));
      if (hit) return hit;
    }
    return null;
  };

  // fcStart(...names): finds first column whose name STARTS WITH the term (word-boundary safe)
  // Handles headers like "ORI (ATD)" or "DES IATA" without colliding with ORIGIN / DESCRIPTION
  const fcStart = (...names) => {
    for (const name of names) {
      const re = new RegExp(`^${name}\\b`, 'i');
      const hit = keys.find(k => re.test(k.trim()));
      if (hit) return hit;
    }
    return null;
  };

  const uiCampaign = document.getElementById('dxCampaign').value.trim().toLowerCase();

  const cStatus   = fc('status');
  const cCampaign = fc('campaign');
  // Origin: try exact name first, then abbreviated header "ORI..." (e.g. "ORI (ATD)")
  const cOri      = fc('origin', 'origen') || fcStart('ori') || keys[2];
  // Destination: same pattern for "DES..." headers
  const cDes      = fc('destination', 'destino') || fcStart('des') || keys[3];
  // Price before (original/full price, shown as strikethrough — the HIGHER value):
  // "MONTO TOTAL DESPUES (BASE RT+FUEL+TAX)" holds the full original amount
  const cPriceBef = fc('despues', 'después', 'price_before', 'price before', 'pricebefore', 'original');
  // Sale/promotional price (the LOWER value, after discount):
  // "MONTO TOTAL ANTES (BASE RT+FUEL+TAX)" holds the promotional/discounted amount
  // Also try exact "price" match (Tarifas-style Excel)
  const cPrice    = keys.find(k => k.toLowerCase().trim() === 'price')
                 || fc('antes', 'price', 'sale price', 'monto facturado', 'monto base', 'base fare', 'bare fare');
  // Departure: "departure" (Tarifas format) or "inicio" from "PRIMERA FECHA INICIO" (T&C format)
  const cDep      = fc('departure', 'travel start') || fc('inicio') || fc('firstflight', 'primera fecha inicio');
  // Return: "return" (Tarifas format) or "vuelo" from "ULTIMA FECHA DE VUELO" (T&C format)
  const cRet      = fc('return', 'travel end') || fc('vuelo') || fc('lastflight', 'ultima fecha vuelo');
  // TAX: use fcStart so "TAX" column wins over "MONTO TOTAL ANTES (... +TAX)" which also contains "tax"
  const cTax      = fcStart('tax') || fc('taxes', 'impuesto', 'cargo');

  // Log detected mapping so issues are easy to debug
  console.table({ cOri, cDes, cPrice, cPriceBef, cDep, cRet, cTax, cStatus, cCampaign });

  dxFareRows = rows
    .map(r => ({
      // UI campaign always wins; fall back to Excel column only if UI field is empty
      campaign:     uiCampaign || (cCampaign ? String(r[cCampaign] || '').toLowerCase().trim() : ''),
      status:       cStatus ? String(r[cStatus] || 'active').toLowerCase().trim() : 'active',
      origin:       String(r[cOri]      || '').toUpperCase().trim(),
      destination:  String(r[cDes]      || '').toUpperCase().trim(),
      price_before: cPriceBef ? (parseFloat(r[cPriceBef]) || null) : null,
      price:        cPrice    ? (parseFloat(r[cPrice])    || 0)    : 0,
      departure:    cDep      ? pDate(r[cDep])  : null,
      return:       cRet      ? pDate(r[cRet])  : null,
      taxes:        cTax      ? (parseFloat(r[cTax]) || null) : null,
    }))
    // Only require origin + destination — price/dates can be edited in the table before sync
    .filter(r => r.origin && r.destination);

  // Show column mapping summary in the status bar
  const mappingNote = [
    `ORI→${cOri || '⚠ no encontrado'}`,
    `DES→${cDes || '⚠ no encontrado'}`,
    `Price→${cPrice || '⚠ no encontrado'}`,
    `Tax→${cTax || '—'}`,
    `Dep→${cDep || '—'}`,
    `Ret→${cRet || '—'}`,
  ].join(' · ');
  document.getElementById('dxFileStatus').innerHTML =
    `<div class="alert alert-s">✓ ${dxFareRows.length} tarifa${dxFareRows.length !== 1 ? 's' : ''} · ${dxRatesRows.length} tasas<br><span style="font-size:10px;color:#166534;opacity:.75">${mappingNote}</span></div>`;

  renderFaresTable(dxFareRows);
}

// ================================================================
// DIRECTUS SYNC — PARSE RATES FROM EXCEL SHEET 2
// ================================================================
function processDxRates(rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const fc = (...ns) => {
    for (const n of ns) {
      const f = keys.find(k => k.toLowerCase().includes(n.toLowerCase()));
      if (f) return f;
    }
    return null;
  };
  const cC = fc('Currency', 'currency');
  const cV = fc('Value in USD', 'Value', 'rate', 'Rate');

  dxRatesRows = [];
  rows.forEach(r => {
    const currency = String(r[cC] || '').trim();
    const rate = parseFloat(r[cV]) || 0;
    if (currency && rate) dxRatesRows.push({ currency, rate });
  });

  if (dxRatesRows.length) {
    document.getElementById('dxRatesList').innerHTML = dxRatesRows
      .map(r => `<div class="rc"><div class="cur">${r.currency}</div><div class="val">${r.rate.toFixed(5)}</div></div>`)
      .join('');
    document.getElementById('dxRatesNote').textContent = `(${dxRatesRows.length} monedas)`;
    document.getElementById('dxRatesSec').style.display = 'block';
  }
}

// ================================================================
// DIRECTUS SYNC — EDITABLE TABLE
// ================================================================
function renderFaresTable(rows) {
  document.getElementById('dxTableBody').innerHTML = rows.map(renderTableRow).join('');
  updateTableMeta();
  document.getElementById('dxPh').style.display = 'none';
  document.getElementById('dxTableCard').style.display = 'block';
}

function renderTableRow(r) {
  const v = val => (val == null ? '' : val);
  return `<tr>
    <td><button class="btn-del-row" onclick="this.closest('tr').remove();updateTableMeta()">×</button></td>
    <td><input class="dxinp" data-field="status"       value="${v(r.status)}" /></td>
    <td><input class="dxinp" data-field="campaign"     value="${v(r.campaign)}" /></td>
    <td><input class="dxinp dxinp-code" data-field="origin"      value="${v(r.origin)}" /></td>
    <td><input class="dxinp dxinp-code" data-field="destination" value="${v(r.destination)}" /></td>
    <td><input class="dxinp dxinp-num" type="number" step="0.01" data-field="price_before" value="${v(r.price_before)}" /></td>
    <td><input class="dxinp dxinp-num" type="number" step="0.01" data-field="price"        value="${v(r.price)}" /></td>
    <td><input class="dxinp" type="date" data-field="departure" value="${v(r.departure)}" /></td>
    <td><input class="dxinp" type="date" data-field="return"    value="${v(r.return)}" /></td>
    <td><input class="dxinp dxinp-num" type="number" step="0.01" data-field="taxes" value="${v(r.taxes)}" /></td>
  </tr>`;
}

function addFareRow() {
  const campaign = document.getElementById('dxCampaign').value.trim();
  const tmp = document.createElement('tbody');
  tmp.innerHTML = renderTableRow({
    status: 'active', campaign, origin: '', destination: '',
    price_before: '', price: '', departure: '', return: '', taxes: '',
  });
  document.getElementById('dxTableBody').appendChild(tmp.firstChild);
  updateTableMeta();
}

function updateTableMeta() {
  const n = document.querySelectorAll('#dxTableBody tr').length;
  document.getElementById('dxTableMeta').textContent = `${n} tarifa${n !== 1 ? 's' : ''}`;
}

function readTableRows() {
  const rows = [];
  document.querySelectorAll('#dxTableBody tr').forEach(tr => {
    const inp = f => tr.querySelector(`[data-field="${f}"]`)?.value?.trim() || '';
    // Only skip rows that have no origin or destination — price can legitimately be 0
    if (!inp('origin') || !inp('destination')) return;
    rows.push({
      status:       inp('status') || 'active',
      campaign:     inp('campaign'),
      origin:       inp('origin').toUpperCase(),
      destination:  inp('destination').toUpperCase(),
      price_before: parseFloat(inp('price_before')) || null,
      price:        parseFloat(inp('price')) || 0,
      departure:    inp('departure') || null,
      return:       inp('return')    || null,
      taxes:        parseFloat(inp('taxes')) || null,
    });
  });
  return rows;
}

// ================================================================
// DIRECTUS SYNC — MAIN FLOW
// ================================================================
async function syncToDirectus() {
  const token = window.APP_CONFIG?.DX_TOKEN;
  if (!token) {
    alert('Token no encontrado.\nCrea config.js basándote en config.example.js y recarga la página.');
    return;
  }

  const campaign = document.getElementById('dxCampaign').value.trim();
  if (!campaign) { alert('Ingresa el nombre de la campaña (Paso 2)'); return; }

  const rows = readTableRows();
  if (!rows.length) { alert('La tabla no tiene filas con Origen y Destino. Verifica que el Excel cargó correctamente.'); return; }

  const btn = document.getElementById('dxSyncBtn');
  btn.disabled = true;
  document.getElementById('dxProgress').style.display = 'block';
  [1,2,3,4].forEach(n => dxStepSet(n, 'pending'));

  try {
    // Step 1 — Upload new fares
    dxStepSet(1, 'running', `Subiendo ${rows.length} tarifas...`);
    await dxPostFares(rows, token);
    dxStepSet(1, 'done', `✓ ${rows.length} tarifas subidas`);

    // Step 2 — Upload rates
    dxStepSet(2, 'running', 'Subiendo tasas de cambio...');
    if (dxRatesRows.length) {
      await dxUpsertRates(dxRatesRows, token);
      dxStepSet(2, 'done', `✓ ${dxRatesRows.length} tasas actualizadas`);
    } else {
      dxStepSet(2, 'done', '— Sheet 2 vacío, tasas sin cambios');
    }

    // Step 3 — Fetch from Directus with relations
    dxStepSet(3, 'running', 'Consultando Directus con relaciones...');
    const [fares, rates] = await Promise.all([
      dxFetchFares(campaign, token),
      dxFetchRates(token),
    ]);
    dxStepSet(3, 'done', `✓ ${fares.length} fares obtenidos con destinos e imágenes`);

    // Step 4 — Build HTML
    dxStepSet(4, 'running', 'Generando HTML...');
    document.getElementById('dxTableCard').style.display = 'none';
    document.getElementById('dxHtmlCards').style.display = 'block';
    ['es', 'en', 'pt'].forEach(lang => {
      const html = buildDirectusFaresForLang(fares, rates, lang, campaign);
      document.getElementById(`dxOut-${lang}`).value = html;
      document.getElementById(`dxMeta-${lang}`).textContent =
        `${(html.length / 1024).toFixed(1)} KB · ${fares.length} fares`;
      document.getElementById(`dxCard-${lang}`).style.display = 'block';
    });
    dxStepSet(4, 'done', '✓ HTML generado en ES · EN · PT');

  } catch (err) {
    const running = document.querySelector('.dx-step.running');
    if (running) { running.className = 'dx-step error'; running.textContent = `✗ Error: ${err.message}`; }
    console.error('[DX Sync]', err);
  } finally {
    btn.disabled = false;
  }
}

function dxStepSet(n, state, text) {
  const el = document.getElementById(`dxStep${n}`);
  el.className = `dx-step ${state}`;
  if (text) el.textContent = text;
}

// ================================================================
// DIRECTUS SYNC — API CALLS
// ================================================================


async function dxPostFares(rows, token) {
  const items = rows.map(r => ({
    origin:       r.origin,
    destination:  r.destination,
    departure:    r.departure,
    return:       r.return,
    price:        r.price,
    price_before: r.price_before,
    taxes:        r.taxes,
    campaign:     r.campaign,
    status:       r.status || 'active',
  }));

  const res = await fetch(`${DX_BASE}/items/custom_fare`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body.errors?.[0]?.message || res.status;
    throw new Error(`POST fares: ${msg}`);
  }
}

async function dxUpsertRates(rates, token) {
  // Fetch existing rates to get their IDs
  const r = await fetch(`${DX_BASE}/items/currency_conversion_rate?fields[]=id&fields[]=currency&limit=-1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) {
    const body = await r.json().catch(() => ({}));
    const msg = body.errors?.[0]?.message || 'Sin detalles';
    throw new Error(`GET rates: ${r.status} — ${msg}`);
  }
  const { data: existing } = await r.json();
  const existMap = {};
  existing.forEach(item => { existMap[item.currency] = item.id; });

  const toUpdate = rates.filter(r => existMap[r.currency]);
  const toInsert = rates.filter(r => !existMap[r.currency]);

  // PATCH existing
  for (const rate of toUpdate) {
    await fetch(`${DX_BASE}/items/currency_conversion_rate/${existMap[rate.currency]}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ rate: rate.rate }),
    });
  }

  // POST new
  if (toInsert.length) {
    await fetch(`${DX_BASE}/items/currency_conversion_rate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(toInsert.map(r => ({ currency: r.currency, rate: r.rate }))),
    });
  }
}

async function dxFetchFares(campaign, token) {
  const fields = [
    'origin.iata_code', 'origin.main_image',
    'origin.translations.name', 'origin.translations.languages_code',
    'origin.country.code', 'origin.country.currency_code',
    'destination.iata_code', 'destination.main_image',
    'destination.translations.name', 'destination.translations.languages_code',
    'destination.country.code', 'destination.country.currency_code',
    'departure', 'return', 'price', 'price_before', 'taxes',
  ];
  const params = new URLSearchParams([
    ...fields.map(f => ['fields[]', f]),
    ['filter[campaign][_eq]', campaign],
    ['limit', '-1'],
  ]);
  const res = await fetch(`${DX_BASE}/items/custom_fare?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body.errors?.[0]?.message || 'Sin detalles';
    throw new Error(`GET fares: ${res.status} — ${msg}`);
  }
  const { data } = await res.json();
  return data;
}

async function dxFetchRates(token) {
  const res = await fetch(`${DX_BASE}/items/currency_conversion_rate?fields[]=currency&fields[]=rate&limit=-1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body.errors?.[0]?.message || 'Sin detalles';
    throw new Error(`GET rates: ${res.status} — ${msg}`);
  }
  const { data } = await res.json();
  const conv = {};
  data.forEach(r => { conv[r.currency] = r.rate; });
  return conv;
}

// ================================================================
// DIRECTUS SYNC — HTML GENERATION
// ================================================================

function dxGetStorefront(countryCode) {
  return DX_COUNTRY_TO_SF[(countryCode || '').toUpperCase()] || 'gs';
}

function dxGetName(dest, lang) {
  if (!dest?.translations?.length) return dest?.iata_code || '';
  const t = dest.translations.find(t =>
    t.languages_code && t.languages_code.toLowerCase().startsWith(lang.toLowerCase())
  );
  return t?.name || dest.translations[0]?.name || dest?.iata_code || '';
}

function dxConvertFmt(priceUSD, currencyCode, rates) {
  if (currencyCode === 'USD' || !rates[currencyCode]) {
    return fareFmtNum(Math.ceil(priceUSD), 'USD');
  }
  return fareFmtNum(Math.ceil(priceUSD / rates[currencyCode]), currencyCode);
}

function buildDirectusFaresForLang(fares, rates, lang, campaign) {
  const blocks = [];

  Object.entries(STOREFRONTS).forEach(([country, langs]) => {
    if (!langs.includes(lang)) return;

    const sfFares = fares.filter(f => {
      const sf = dxGetStorefront(f.origin?.country?.code);
      return country === 'gs' ? sf === 'gs' : sf === country;
    });

    const innerHTML = sfFares.length
      ? `<div class="container mx-auto">\n<ol class="grid justify-center gap-3 pb-8" style="grid-template-columns: repeat(auto-fit, minmax(376px, 1fr));">\n${sfFares.map(f => buildDirectusFareCard(f, lang, country, rates)).join('\n')}\n</ol>\n</div>`
      : `<div class="container mx-auto">\n<p></p>\n</div>`;

    blocks.push(`<div class="hidden" data-country="${country}" data-lang="${lang}">\n${innerHTML}\n</div>`);
  });

  const disclaimer = buildTcDisclaimerParagraph(campaign, lang);

  const scriptDeleteAll = `<script type="text/javascript">
(function deleteAll() {
  const x = document.querySelectorAll(".__pfs, .__bss, .__psc");
  for (i = 0; i < x.length; i++) { x[i].classList.remove('__pfs', '__bss', '__psc'); }
})();
<\/script>`;

  const scriptDataLayer = `<script>
setTimeout(() => {
  const country = EM?.dataLayer?.[0]?.page?.countryIsoCode?.toLowerCase() || "gs";
  const lang    = EM?.dataLayer?.[0]?.page?.languageIsoCode?.toLowerCase() || "${lang}";
  const allDivs = document.querySelectorAll('div[data-country][data-lang]');
  allDivs.forEach((div) => {
    const match =
      div.getAttribute('data-country')?.toLowerCase() === country &&
      div.getAttribute('data-lang')?.toLowerCase()    === lang;
    div.classList.toggle('hidden', !match);
  });
}, 3000);
<\/script>`;

  return `<div id="app">\n${blocks.join('\n')}\n</div>\n${disclaimer}\n${scriptDeleteAll}\n${scriptDataLayer}`;
}

function buildDirectusFareCard(fare, lang, country, rates) {
  const connWord = lang === 'es' ? ' a'           : lang === 'en' ? ' to'       : ' para';
  const tripType = lang === 'es' ? 'Ida y Vuelta' : lang === 'en' ? 'Roundtrip' : 'Ida e volta';
  const fromWord = lang === 'es' ? 'desde'        : lang === 'en' ? 'from'      : 'de';
  const taxLabel = lang === 'en' ? 'Taxes included'
    : lang === 'es' ? 'Impuestos incluidos de'
    : 'Impostos inclu&iacute;dos em';

  const currency = SF_CURRENCY[country] || 'USD';
  const oriIATA  = fare.origin?.iata_code      || '';
  const desIATA  = fare.destination?.iata_code || '';
  const oriName  = dxGetName(fare.origin, lang);
  const desName  = dxGetName(fare.destination, lang);
  const imgUUID  = fare.destination?.main_image || '1b589009-eb2d-466d-adb4-df5c872e76fa';
  const imgSrc   = `https://cm-marketing.directus.app/assets/${imgUUID}`;

  const price   = dxConvertFmt(fare.price, currency, rates);
  const pbefore = fare.price_before ? dxConvertFmt(fare.price_before, currency, rates) : null;
  const taxes   = fare.taxes        ? dxConvertFmt(fare.taxes, currency, rates)        : null;

  // Directus may return full datetime — take only YYYY-MM-DD
  const depDate = (fare.departure || '').substring(0, 10);
  const retDate = (fare.return    || '').substring(0, 10);
  const dep = fareFormatDate(depDate, lang);
  const ret = fareFormatDate(retDate, lang);

  const href = `https://shopping.copaair.com/?roundtrip=true&amp;adults=1&amp;children=0&amp;infants=0&amp;sf=${country}&amp;langid=${lang}&amp;date1=${depDate}&amp;date2=${retDate}&amp;promocode=&amp;area1=${oriIATA}&amp;area2=${desIATA}&amp;advanced_air_search=false&amp;flexible_dates_v2=false&amp;origin=EM`;

  const pbSpan = pbefore
    ? `<span class="font-normal text-d1 self-end font-suisse text-grey-600 line-through ">${currency}&nbsp;${pbefore}</span>`
    : '';
  const taxSpan = taxes
    ? `<span class="font-suisse flex gap-1 justify-end font-normal text-d3 text-grey-600  s-TlaWMsF1F1vX"><strong>${taxLabel}</strong> ${currency}&nbsp;${taxes}</span>`
    : '';

  return `<li class="custom-fares h-full w-full max-w-[400px]"><a class="grid grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] overflow-hidden rounded-2xl outline outline-1 outline-grey-300 hover:outline-2 hover:outline-primary-ultralight focus:outline-2 focus:outline-primary-ultralight" role="button" href="${href}" data-oac="${oriIATA}" data-dac="${desIATA}" data-departure-date="${depDate}" data-return-date="${retDate}" data-price="USD ${fare.price}"><img class="col-start-1 col-end-3 row-span-full h-full w-full object-cover" loading="lazy" alt="${desName.replace(/&[^;]+;/g, '')}" src="${imgSrc}" /> <span class="col-start-3 col-end-3 row-start-2 row-end-2 mx-2 mb-2 flex flex-col gap-1"><span class="text-b font-bold flex h-auto flex-col font-gilroy text-primary"><span>${oriName} (${oriIATA})${connWord}</span> <span>${desName} (${desIATA})</span></span> <span class="flex h-auto items-center gap-2"><img src="https://cm-marketing.directus.app/assets/5c8e2708-d6e2-4de0-ad47-60b94c7f512f" class="h-[10.3px] w-[11.6px]" alt="date" /> <span class="font-suisse font-normal text-d3 text-grey-600"> ${tripType}<br />${dep} - ${ret}</span></span></span> <span class="col-start-3 col-end-3 row-start-3 row-end-3 mx-2 mt-2"><span class="flex grid-rows-subgrid flex-col items-end">${pbSpan}<span class="gap-y-2"><span class="font-suisse font-normal text-d3 text-grey-600 ">${fromWord} <span class="text-u2 font-gilroy font-bold text-primary lg:text-u1 ">${currency}&nbsp;${price}<sup>*</sup></span></span></span></span>${taxSpan}</span></a></li>`;
}

// ================================================================
// DIRECTUS SYNC — COPY
// ================================================================
function copyDirectusLang(lang) {
  const ta  = document.getElementById(`dxOut-${lang}`);
  const btn = document.querySelector(`#dxCard-${lang} .btn-copy`);
  navigator.clipboard.writeText(ta.value).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

// ================================================================
// TC CONVERTER — DRAG & DROP
// ================================================================
const cvuz = document.getElementById('cvuz');
cvuz.addEventListener('dragover', e => { e.preventDefault(); cvuz.classList.add('drag'); });
cvuz.addEventListener('dragleave', () => cvuz.classList.remove('drag'));
cvuz.addEventListener('drop', e => {
  e.preventDefault();
  cvuz.classList.remove('drag');
  handleConverterFile({ target: { files: e.dataTransfer.files } });
});

// ================================================================
// TC CONVERTER — FILE HANDLER
// ================================================================
async function handleConverterFile(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'docx') {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const zip = await new JSZip().loadAsync(e.target.result);
        const docEntry = zip.file('word/document.xml');
        if (!docEntry) { setConverterStatus('✗ DOCX inválido: no se encontró document.xml', 'e'); return; }
        const docXml = await docEntry.async('string');
        const text = parseDOCXToText(docXml);
        document.getElementById('cvText').value = text;
        document.getElementById('cvfname').textContent = '✓ ' + file.name;
        document.getElementById('cvfname').style.display = 'block';
        cvuz.classList.add('ok');
        setConverterStatus('✓ DOCX cargado — revisa el texto y ajusta si es necesario', 's');
      } catch (err) {
        setConverterStatus('✗ Error al leer DOCX: ' + err.message, 'e');
      }
    };
    reader.readAsArrayBuffer(file);
  } else if (ext === 'txt') {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('cvText').value = e.target.result;
      document.getElementById('cvfname').textContent = '✓ ' + file.name;
      document.getElementById('cvfname').style.display = 'block';
      cvuz.classList.add('ok');
      setConverterStatus('✓ Archivo de texto cargado', 's');
    };
    reader.readAsText(file, 'UTF-8');
  } else {
    setConverterStatus('✗ Formato no soportado. Usa DOCX o TXT', 'e');
  }
}

// ================================================================
// PARSE DOCX XML → MARKED-UP PLAIN TEXT
// Heading1/Title → "## text", Heading2/3 → "### text", List → "• text"
// ================================================================
function parseDOCXToText(docXml) {
  const unesc = s => s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#x[0-9A-Fa-f]+;/g, '');

  const pMatches = docXml.match(/<w:p[ >][\s\S]*?<\/w:p>/g) || [];
  const lines = [];

  for (const pXml of pMatches) {
    const styleM = pXml.match(/w:pStyle\s+w:val="([^"]+)"/);
    const style = styleM ? styleM[1] : '';
    const isList = /<w:numPr\b/.test(pXml) || /^ListParagraph$/i.test(style) || /^List\b/i.test(style);

    const texts = [];
    const tRe = /<w:t(?:[^>]*)>([\s\S]*?)<\/w:t>/g;
    let m;
    while ((m = tRe.exec(pXml)) !== null) texts.push(unesc(m[1]));
    const text = texts.join('').trim();

    if (!text) { lines.push(''); continue; }

    if (/^(Title|Heading\s*1)$/i.test(style)) {
      lines.push(`## ${text}`);
    } else if (/^Heading/i.test(style)) {
      lines.push(`### ${text}`);
    } else if (isList) {
      lines.push(`• ${text}`);
    } else {
      lines.push(text);
    }
  }
  return lines.join('\n');
}

// ================================================================
// PARSE TEXT → BLOCKS
// Supports explicit markers (## / ### / •) and plain-text heuristics
// ================================================================
function parseTextToBlocks(rawText) {
  const blocks = [];
  const lines = rawText.split('\n');
  let currentList = [];
  let prevEmpty = true;

  const flushList = () => {
    if (currentList.length) {
      blocks.push({ type: 'ul', items: [...currentList] });
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      prevEmpty = true;
      continue;
    }

    // Explicit markers from DOCX parser
    if (line.startsWith('## ')) {
      flushList();
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      prevEmpty = false;
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      prevEmpty = false;
      continue;
    }

    // Bullet / numbered list items
    const bulletMatch = line.match(/^[•·\-\*]\s+(.+)/);
    const numberedMatch = !bulletMatch && line.match(/^\d+[\.\)]\s+(.+)/);
    if (bulletMatch || numberedMatch) {
      currentList.push((bulletMatch || numberedMatch)[1]);
      prevEmpty = false;
      continue;
    }

    flushList();

    // Heuristic headings for plain-text input
    const isAllCaps =
      line.length >= 4 &&
      line === line.toUpperCase() &&
      /[A-ZÁÉÍÓÚÑ]/.test(line) &&
      !/\d{2}[\/\-]\d{2}/.test(line);

    const nextLine = lines[i + 1] !== undefined ? lines[i + 1].trim() : '';
    const nextEmpty = nextLine === '';
    const isIsolatedShort =
      line.length <= 90 &&
      !line.match(/[\.;,]$/) &&
      prevEmpty &&
      nextEmpty;

    if (isAllCaps || isIsolatedShort) {
      blocks.push({ type: 'h3', text: line });
    } else {
      blocks.push({ type: 'p', text: line });
    }

    prevEmpty = false;
  }

  flushList();
  return blocks;
}

// ================================================================
// BLOCKS → AIRTRFX HTML
// ================================================================
function blocksToAirTRFX(blocks, divId) {
  const CCP = '{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;335559738&quot;:240,&quot;335559739&quot;:240}';
  const e = encH;

  let html = `<div class="cm-design-system styles-override" id="${e(divId)}" style="padding-top: 80px;">\n`;

  for (const block of blocks) {
    switch (block.type) {
      case 'h2':
        html += `<h2>${e(block.text)}</h2>\n`;
        break;
      case 'h3':
        html += `<h3>${e(block.text)}</h3>\n`;
        break;
      case 'bold':
        html += `<p><strong>${e(block.text)}</strong></p>\n`;
        break;
      case 'p':
        html += `<p><span data-contrast="auto">${e(block.text)}</span><span data-ccp-props="${CCP}">&nbsp;</span></p>\n`;
        break;
      case 'ul':
        html += `<ul>\n`;
        block.items.forEach(item => { html += `<li>${e(item)}</li>\n`; });
        html += `</ul>\n`;
        break;
    }
  }

  html += `</div>`;
  return html;
}

// ================================================================
// TC CONVERTER — TRANSLATION HELPERS  (Google Translate unofficial)
// ================================================================
function cvSleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Unique separator that Google Translate preserves (looks like a placeholder)
const CV_SEP = ' \u2060[|]\u2060 ';
const CV_BATCH_MAX = 1800; // chars per request — well within Google's limit

async function cvGoogleTranslate(text, sl, tl) {
  if (!text.trim()) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
    const r = await fetch(url);
    if (!r.ok) return text;
    const data = await r.json();
    // data[0] = array of [translatedChunk, originalChunk, ...]
    return data[0].map(chunk => chunk[0]).join('');
  } catch {
    return text;
  }
}

async function cvTranslateBlocks(blocks, langpair, onProgress) {
  const [sl, tl] = langpair.split('|');

  // Flatten all translatable strings with their block/item index
  const entries = []; // { blockIdx, itemIdx (or null), str }
  blocks.forEach((block, bi) => {
    if (block.type === 'ul') {
      block.items.forEach((item, ii) => entries.push({ bi, ii, str: item }));
    } else if (block.text) {
      entries.push({ bi, ii: null, str: block.text });
    }
  });

  // Group entries into batches that fit within CV_BATCH_MAX chars
  const batches = [];
  let batch = [];
  let batchLen = 0;
  for (const entry of entries) {
    const addLen = entry.str.length + CV_SEP.length;
    if (batchLen + addLen > CV_BATCH_MAX && batch.length > 0) {
      batches.push(batch);
      batch = [entry];
      batchLen = entry.str.length;
    } else {
      batch.push(entry);
      batchLen += addLen;
    }
  }
  if (batch.length) batches.push(batch);

  // Translate batch by batch
  const translated = {}; // key: `${bi}-${ii ?? 'p'}` → translated string
  let done = 0;
  for (const b of batches) {
    const combined = b.map(e => e.str).join(CV_SEP);
    const result = await cvGoogleTranslate(combined, sl, tl);
    // Split result back — Google may slightly alter the separator spacing
    const parts = result.split(/\s*\[?\|?\]\s*|\u2060/g).map(s => s.trim()).filter(s => s.length > 0);
    b.forEach((entry, i) => {
      const key = `${entry.bi}-${entry.ii ?? 'p'}`;
      translated[key] = parts[i] || entry.str;
    });
    done += b.length;
    if (onProgress) onProgress(done, entries.length);
    await cvSleep(350);
  }

  // Reconstruct blocks with translated text
  return blocks.map((block, bi) => {
    const tb = { ...block };
    if (block.type === 'ul') {
      tb.items = block.items.map((item, ii) => translated[`${bi}-${ii}`] || item);
    } else if (block.text) {
      tb.text = translated[`${bi}-p`] || block.text;
    }
    return tb;
  });
}

// ================================================================
// TC CONVERTER — MAIN GENERATE
// ================================================================
function cvSetCard(lang, html, blocks) {
  const pCount = blocks.filter(b => b.type === 'p').length;
  const hCount = blocks.filter(b => b.type === 'h2' || b.type === 'h3').length;
  const lCount = blocks.filter(b => b.type === 'ul').reduce((a, b) => a + b.items.length, 0);
  document.getElementById(`cvOut-${lang}`).value = html;
  document.getElementById(`cvMeta-${lang}`).textContent =
    `${html.length.toLocaleString()} car · ${hCount} títulos · ${pCount} párrafos · ${lCount} ítems`;
}

async function convertTCToHTML() {
  const divId = document.getElementById('cvDivId').value.trim();
  if (!divId) {
    alert('Ingresa el ID del bloque (anchor) antes de continuar.\nEjemplo: domCUN');
    document.getElementById('cvDivId').focus();
    return;
  }

  const text = document.getElementById('cvText').value.trim();
  if (!text) {
    alert('Sube un archivo o pega el texto de los T&C antes de convertir.');
    return;
  }

  const blocks = parseTextToBlocks(text);
  if (!blocks.length) {
    alert('No se encontró contenido para convertir.');
    return;
  }

  const btn = document.getElementById('cvGenBtn');
  btn.disabled = true;

  try {
    // ES — original, no translation
    setConverterStatus('Generando ES...', 'i');
    const htmlEs = blocksToAirTRFX(blocks, divId);
    cvSetCard('es', htmlEs, blocks);

    // EN
    const totalBlocks = blocks.reduce((n, b) => n + (b.type === 'ul' ? b.items.length : 1), 0);
    setConverterStatus(`Traduciendo EN-US… 0 / ${totalBlocks}`, 'i');
    btn.textContent = '⏳ Traduciendo EN…';
    const blocksEn = await cvTranslateBlocks(blocks, 'es|en-US', (done, total) => {
      setConverterStatus(`Traduciendo EN-US… ${done} / ${total}`, 'i');
    });
    cvSetCard('en', blocksToAirTRFX(blocksEn, divId), blocksEn);

    // PT
    setConverterStatus(`Traduciendo PT-BR… 0 / ${totalBlocks}`, 'i');
    btn.textContent = '⏳ Traduciendo PT…';
    const blocksPt = await cvTranslateBlocks(blocks, 'es|pt-BR', (done, total) => {
      setConverterStatus(`Traduciendo PT-BR… ${done} / ${total}`, 'i');
    });
    cvSetCard('pt', blocksToAirTRFX(blocksPt, divId), blocksPt);

    document.getElementById('cvPh').style.display = 'none';
    const cvCardsEl = document.getElementById('cvCards');
    cvCardsEl.style.display = 'block';
    setConverterStatus('✓ HTML generado en ES · EN · PT', 's');
    setTimeout(() => cvCardsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  } catch (err) {
    setConverterStatus('✗ Error en traducción: ' + err.message, 'e');
  } finally {
    btn.disabled = false;
    btn.textContent = '✨ Convertir y Traducir';
  }
}

// ================================================================
// TC CONVERTER — COPY & STATUS
// ================================================================
function copyConverted(lang) {
  const ta = document.getElementById(`cvOut-${lang}`);
  navigator.clipboard.writeText(ta.value).then(() => {
    const btns = document.querySelectorAll(`#cvCard-${lang} .btn-copy`);
    btns.forEach(btn => {
      const orig = btn.textContent;
      btn.textContent = '✓ Copiado!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
    });
  });
}

function setConverterStatus(msg, type) {
  document.getElementById('cvStatus').innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
}
