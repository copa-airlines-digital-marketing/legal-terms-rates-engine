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
