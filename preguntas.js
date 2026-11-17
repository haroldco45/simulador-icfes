/* Banco de preguntas — Rumbo al ICFES (Vibras Positivas HM)
   Preguntas de práctica tipo Saber 11 escritas para esta app. No son preguntas oficiales del Icfes.
   Formato: { a: área, x: id de contexto (opcional), q: enunciado, o: opciones (la primera es la correcta; se barajan), e: explicación } */

const AREAS = {
  lc:  { es: 'Lectura Crítica',          en: 'Critical Reading',          peso: 3, real: 41 },
  mat: { es: 'Matemáticas',              en: 'Mathematics',               peso: 3, real: 50 },
  soc: { es: 'Sociales y Ciudadanas',    en: 'Social Studies and Civics', peso: 3, real: 50 },
  cn:  { es: 'Ciencias Naturales',       en: 'Natural Sciences',          peso: 3, real: 58 },
  ing: { es: 'Inglés',                   en: 'English',                   peso: 1, real: 55 }
};

/* ---------- CONTEXTOS (textos, tablas y situaciones compartidas) ---------- */
const CTX = {
lc1: `<b>Texto 1</b><p>Durante décadas se dijo que el río era solo una vía para sacar el oro y traer la mercancía. Hoy, en los pueblos de la orilla, una generación nueva lo mira de otra forma: como un vecino que se enferma cuando lo maltratamos. Los pescadores mayores recuerdan que antes el bocachico subía en tal cantidad que "se podía caminar sobre él". Esa frase, exagerada a propósito, no describe un hecho: describe una pérdida.</p><p>Recuperar un río no es tarea de un alcalde ni de una sola empresa. Exige que el minero, el ganadero, el comerciante y el estudiante entiendan que lo que se vierte arriba llega abajo. La pregunta ya no es si podemos vivir del río, sino si podemos vivir con él.</p>`,
lc2: `<b>Texto 2</b><p>Prohibir el celular en el aula parece una solución sencilla: menos distracciones, más atención. Sin embargo, quienes defienden la prohibición total olvidan que el mismo aparato que distrae puede ser un diccionario, una calculadora o una biblioteca. El problema no es el objeto, sino la ausencia de reglas claras sobre cuándo y para qué se usa.</p><p>Un colegio que guarda los celulares en una caja durante las clases y los entrega para actividades concretas no está siendo permisivo ni autoritario: está enseñando algo que ninguna asignatura enseña por sí sola, que es la administración del propio tiempo.</p>`,
lc3: `<b>Texto 3 (poema)</b><p>Mi abuela sembraba palabras<br>en la tierra húmeda del patio;<br>decía "paciencia" y salía el maíz,<br>decía "mañana" y llovía.<br>Yo aprendí a leer en sus manos<br>antes que en los libros,<br>y todavía, cuando dudo,<br>escarbo con los dedos el silencio.</p>`,
lc4: `<b>Texto 4 — Encuesta de lectura en un colegio (300 estudiantes)</b><table class="tb"><tr><th>Lo que leen con más frecuencia</th><th>Grado 9.º</th><th>Grado 11.º</th></tr><tr><td>Redes sociales</td><td>62 %</td><td>48 %</td></tr><tr><td>Noticias</td><td>8 %</td><td>18 %</td></tr><tr><td>Novelas o cuentos</td><td>18 %</td><td>14 %</td></tr><tr><td>Textos de estudio</td><td>12 %</td><td>20 %</td></tr></table><p class="sm">Cada grado tiene 150 estudiantes encuestados.</p>`,
lc5: `<b>Texto 5</b><p>Algunos filósofos han sostenido que somos libres solo cuando nadie nos impide actuar. Otros responden que esa idea es incompleta: una persona a la que nadie le prohíbe estudiar, pero que no tiene escuela cerca ni tiempo porque debe trabajar desde niña, no es libre de estudiar en ningún sentido importante. Para estos últimos, la libertad no consiste solo en la ausencia de obstáculos, sino en la existencia real de oportunidades.</p>`,
lc6: `<b>Texto 6 — Diálogo</b><p><b>Laura:</b> El parque nuevo quedó bonito, pero lo hicieron sin preguntarle a nadie del barrio.<br><b>Andrés:</b> Si hubieran preguntado, todavía estaríamos discutiendo el color de las bancas.<br><b>Laura:</b> No se trata de las bancas. Pusieron la cancha donde los niños no pueden llegar sin cruzar la avenida.<br><b>Andrés:</b> Bueno, en eso tienes razón. Preguntar no es perder el tiempo cuando se trata de seguridad.</p>`,
lc7: `<b>Texto 7 — Aviso de una biblioteca municipal</b><p><b>¡Lee sin pagar!</b> Préstamo de libros gratuito para todos los habitantes del municipio. Solo necesitas tu documento de identidad y un recibo de servicios públicos. Puedes llevar hasta tres libros por quince días. <i>Si te atrasas, no te cobramos: te pedimos que dones una hora de lectura en voz alta a los niños del programa "Cuentos al parque".</i></p>`,

mat1: `<b>Situación</b><p>Una tienda registró las ventas de arroz (en bultos) durante cinco días:</p><table class="tb"><tr><th>Día</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th></tr><tr><td>Bultos</td><td>12</td><td>15</td><td>9</td><td>15</td><td>19</td></tr></table>`,
mat2: `<b>Situación</b><p>Un plan de celular cobra $25.000 fijos al mes más $500 por cada minuto que pase de los primeros 100 minutos.</p>`,

soc1: `<b>Situación</b><p>En un municipio, la alcaldía anuncia que construirá un relleno sanitario cerca de una quebrada que abastece de agua a tres veredas. Los habitantes dicen que no fueron consultados y temen que el agua se contamine.</p>`,
soc2: `<b>Texto</b><p>"La paz es un derecho y un deber de obligatorio cumplimiento." — Artículo 22, Constitución Política de Colombia de 1991.</p>`,

cn1: `<b>Experimento</b><p>Un estudiante pone tres plantas iguales de fríjol en tres cajas. A la caja 1 le llega luz blanca, a la 2 luz verde y la 3 queda a oscuras. Riega todas con la misma cantidad de agua y mide su altura durante dos semanas.</p><table class="tb"><tr><th>Caja</th><th>Altura inicial</th><th>Altura final</th></tr><tr><td>1 (luz blanca)</td><td>5 cm</td><td>14 cm</td></tr><tr><td>2 (luz verde)</td><td>5 cm</td><td>7 cm</td></tr><tr><td>3 (oscuridad)</td><td>5 cm</td><td>9 cm, tallo pálido y delgado</td></tr></table>`,
cn2: `<b>Situación</b><p>En un ecosistema de ciénaga hay plantas acuáticas, peces pequeños que comen esas plantas, garzas que comen los peces pequeños y bacterias que descomponen los restos de todos.</p>`,

ing1: `<b>Read the text</b><p>My name is Valentina and I live in a small town near a big river. Every Saturday I help my grandfather at his fruit stand in the market. We sell mangoes, oranges and bananas. Last month we started selling fruit juice too, and now we have more customers than before. My grandfather says the juice was my idea, but my mother helped me with the recipes. Next year I want to study business at the university, because one day I would like to open my own juice shop.</p>`,
ing2: `<b>Read the text</b><p>Many people think that bees are only important because they make honey. In fact, bees are much more important than that. They carry pollen from one flower to another, and this helps plants to produce fruits and seeds. Scientists say that about one third of the food we eat depends on bees and other pollinators. Unfortunately, the number of bees is going down in many countries because of pesticides, loss of forests and climate change. Some farmers are now planting flowers around their fields to give bees a place to live.</p>`,
ing3: `<b>Complete the text</b><p>Last summer, my family ___(1)___ to Cartagena for the first time. We ___(2)___ there by bus because it was cheaper than flying. The trip was long, ___(3)___ we saw beautiful landscapes. When we arrived, we went directly ___(4)___ the beach.</p>`
};

/* ---------- BANCO ---------- */
const BANCO = [
/* ===== LECTURA CRÍTICA ===== */
{a:'lc',x:'lc1',q:'Según el texto, la frase "se podía caminar sobre él" se usa para',o:['expresar, con una exageración, cuánto ha disminuido la pesca.','informar con precisión cuántos peces había en el río.','demostrar que los pescadores mayores no dicen la verdad.','describir cómo se cruzaba el río en el pasado.'],e:'El texto aclara que la frase es "exagerada a propósito" y que "describe una pérdida".'},
{a:'lc',x:'lc1',q:'¿Cuál es la idea principal del texto?',o:['Cuidar el río es una responsabilidad compartida por todos los que viven de él.','Los alcaldes son los únicos culpables del daño al río.','El oro debe dejar de sacarse por el río.','La pesca del bocachico es la principal actividad del pueblo.'],e:'El segundo párrafo concluye que recuperar el río exige al minero, al ganadero, al comerciante y al estudiante.'},
{a:'lc',x:'lc1',q:'En el texto, comparar el río con "un vecino que se enferma" sirve para',o:['mostrar que el río puede ser afectado por las acciones de las personas.','explicar que el río transmite enfermedades.','señalar que los vecinos no cuidan sus casas.','afirmar que el río está muriendo sin remedio.'],e:'Es una personificación: el río "se enferma cuando lo maltratamos".'},
{a:'lc',x:'lc1',q:'La última oración ("La pregunta ya no es si podemos vivir del río, sino si podemos vivir con él") propone',o:['pasar de ver el río como recurso a verlo como parte de la vida de la comunidad.','abandonar todas las actividades económicas del río.','que la gente se vaya a vivir lejos del río.','que el río solo sirve como vía de transporte.'],e:'"Vivir del" alude al uso económico; "vivir con" alude a la convivencia y el cuidado.'},
{a:'lc',x:'lc1',q:'¿Qué tipo de texto es el anterior?',o:['Argumentativo, porque defiende una postura sobre el cuidado del río.','Narrativo, porque cuenta la historia de un pescador.','Instructivo, porque explica pasos para limpiar el río.','Científico, porque presenta datos medidos del agua.'],e:'Presenta una tesis (el río se recupera entre todos) y razones para sostenerla.'},

{a:'lc',x:'lc2',q:'La tesis del autor es que',o:['el problema no es el celular sino la falta de reglas sobre su uso.','el celular debe prohibirse totalmente en el colegio.','los estudiantes deben usar el celular cuando quieran.','las asignaturas enseñan a administrar el tiempo.'],e:'Lo dice directamente: "El problema no es el objeto, sino la ausencia de reglas claras".'},
{a:'lc',x:'lc2',q:'¿Cuál de los siguientes enunciados DEBILITARÍA el argumento del autor?',o:['Un estudio muestra que, aun con reglas claras, los estudiantes que tienen el celular cerca rinden menos.','Muchos colegios usan tabletas para estudiar.','Los celulares tienen diccionario y calculadora.','Algunos padres prefieren que sus hijos lleven el celular.'],e:'Si con reglas claras igual baja el rendimiento, falla la idea de que basta con regular el uso.'},
{a:'lc',x:'lc2',q:'Cuando el autor dice que el colegio "no está siendo permisivo ni autoritario", busca',o:['presentar su propuesta como un punto medio entre dos extremos.','criticar a los colegios que guardan los celulares.','demostrar que los profesores son autoritarios.','explicar qué significa la palabra permisivo.'],e:'Ubica su propuesta entre la libertad total y la prohibición total.'},
{a:'lc',x:'lc2',q:'En el texto, la expresión "Sin embargo" introduce',o:['una objeción a la idea de prohibir el celular por completo.','un ejemplo de por qué el celular distrae.','la conclusión final del texto.','una definición de la palabra aula.'],e:'Después de presentar la ventaja de prohibir, "sin embargo" abre la objeción del autor.'},

{a:'lc',x:'lc3',q:'En el poema, "sembraba palabras" significa que la abuela',o:['enseñaba y transmitía sabiduría a través de lo que decía y hacía.','escribía cartas y las enterraba en el patio.','no sabía leer y por eso solo hablaba.','vendía semillas con nombres extraños.'],e:'Es una metáfora: sus palabras ("paciencia", "mañana") dan fruto como las semillas.'},
{a:'lc',x:'lc3',q:'Los versos "Yo aprendí a leer en sus manos / antes que en los libros" sugieren que la voz poética',o:['aprendió de la experiencia y el ejemplo de la abuela antes que de la escuela.','aprendió a leer el abecedario en las manos de la abuela.','no le gustan los libros.','nunca fue a la escuela.'],e:'"Leer en sus manos" alude a comprender el mundo a través del trabajo de la abuela.'},
{a:'lc',x:'lc3',q:'El último verso, "escarbo con los dedos el silencio", expresa que la voz poética',o:['busca en el recuerdo de la abuela respuestas a sus dudas.','prefiere estar callada cuando tiene dudas.','trabaja la tierra cuando no hay ruido.','perdió la capacidad de hablar.'],e:'Escarbar (como en la tierra del patio) en el silencio es buscar en la memoria de la abuela, ya ausente.'},
{a:'lc',x:'lc3',q:'El tono predominante del poema es',o:['nostálgico y afectuoso.','irónico y burlón.','furioso y de denuncia.','indiferente y descriptivo.'],e:'Recuerda con cariño a la abuela y lo aprendido con ella.'},

{a:'lc',x:'lc4',q:'Según la tabla, ¿cuántos estudiantes de grado 11.º leen principalmente noticias?',o:['27','18','12','54'],e:'18 % de 150 = 27 estudiantes.'},
{a:'lc',x:'lc4',q:'¿Qué conclusión se apoya en los datos de la encuesta?',o:['En grado 11.º se lee más noticias y textos de estudio que en 9.º.','Los estudiantes de 11.º ya no usan redes sociales.','Los estudiantes de 9.º leen más textos de estudio.','Las novelas son lo más leído en los dos grados.'],e:'Noticias pasan de 8 % a 18 % y textos de estudio de 12 % a 20 %.'},
{a:'lc',x:'lc4',q:'Un periódico tituló: "La mayoría de los estudiantes del colegio solo lee redes sociales". Este titular es',o:['impreciso, porque la encuesta mide lo que leen con más frecuencia, no lo único que leen.','correcto, porque más del 50 % de cada grado lee redes sociales.','correcto, porque las redes sociales superan a las novelas.','impreciso, porque en 9.º nadie lee redes sociales.'],e:'Además, en 11.º el 48 % no es mayoría; y "con más frecuencia" no significa "solo".'},

{a:'lc',x:'lc5',q:'El texto presenta principalmente',o:['dos concepciones distintas de la libertad.','una definición única de libertad.','la historia de una niña trabajadora.','una crítica a la educación pública.'],e:'Contrapone la libertad como ausencia de obstáculos y la libertad como oportunidades reales.'},
{a:'lc',x:'lc5',q:'El ejemplo de la niña que debe trabajar se usa para',o:['mostrar que la ausencia de prohibiciones no basta para ser libre.','demostrar que el trabajo infantil está permitido.','explicar que las escuelas deben estar cerca.','afirmar que nadie es realmente libre.'],e:'Nadie le prohíbe estudiar, pero no tiene oportunidad real de hacerlo.'},
{a:'lc',x:'lc5',q:'¿Con cuál de estas afirmaciones estaría de acuerdo el segundo grupo de filósofos?',o:['El Estado debe crear condiciones para que las personas puedan aprovechar sus derechos.','Basta con que la ley no prohíba algo para que todos puedan hacerlo.','La libertad depende solo de la voluntad de cada persona.','Las oportunidades no tienen relación con la libertad.'],e:'Para ellos la libertad exige "la existencia real de oportunidades".'},

{a:'lc',x:'lc6',q:'Al final del diálogo, Andrés',o:['acepta parcialmente el argumento de Laura.','cambia de tema para no seguir discutiendo.','insiste en que preguntar es perder el tiempo.','reconoce que el parque quedó feo.'],e:'Dice "en eso tienes razón" sobre la seguridad, pero no retira su idea inicial por completo.'},
{a:'lc',x:'lc6',q:'Laura dice "No se trata de las bancas" para',o:['aclarar que su preocupación es más importante que un detalle estético.','admitir que las bancas quedaron mal.','pedir que cambien el color de las bancas.','burlarse de Andrés.'],e:'Desplaza la discusión de un detalle menor a la seguridad de los niños.'},
{a:'lc',x:'lc6',q:'La primera respuesta de Andrés supone que',o:['consultar a la comunidad hace que las decisiones se demoren.','la comunidad no sabe nada de parques.','el parque debió hacerse en otro barrio.','Laura no vive en el barrio.'],e:'"Todavía estaríamos discutiendo" implica que consultar retrasa las obras.'},

{a:'lc',x:'lc7',q:'La intención principal del aviso es',o:['invitar a usar el servicio de préstamo de la biblioteca.','informar sobre multas por atraso.','vender libros a bajo precio.','buscar voluntarios para limpiar el parque.'],e:'"¡Lee sin pagar!" y las condiciones del préstamo muestran que invita a usar el servicio.'},
{a:'lc',x:'lc7',q:'Lo que la biblioteca pide a quien se atrasa muestra que',o:['busca convertir una falta en una acción a favor de la comunidad.','castiga con dureza a los lectores.','no le importa que devuelvan los libros.','solo presta libros a los niños.'],e:'En lugar de cobrar, pide leer a los niños del programa.'},
{a:'lc',q:'"Aunque llovió toda la tarde, el partido se jugó." La palabra "aunque" expresa una relación de',o:['concesión u oposición.','causa.','consecuencia.','tiempo.'],e:'Presenta un obstáculo (la lluvia) que no impide lo dicho (el partido).'},
{a:'lc',q:'En la oración "Los estudiantes, cansados después del examen, salieron en silencio", el fragmento entre comas',o:['describe el estado en que estaban los estudiantes.','indica la causa del examen.','señala el lugar donde salieron.','introduce una opinión del narrador sobre el examen.'],e:'Es una aposición explicativa que caracteriza a los estudiantes.'},
{a:'lc',q:'¿Cuál de los siguientes enunciados es una OPINIÓN y no un hecho?',o:['El reggaetón es la música más aburrida que existe.','Colombia tiene 32 departamentos.','El río Magdalena desemboca en el mar Caribe.','La Constitución vigente es de 1991.'],e:'Es un juicio de valor que no se puede comprobar; los demás se pueden verificar.'},
{a:'lc',q:'Un estudiante escribe: "Todos los jóvenes son irresponsables; mi primo perdió el año". ¿Qué falla tiene este razonamiento?',o:['Generaliza a partir de un solo caso.','Usa datos estadísticos falsos.','Ataca a la persona en vez de al argumento.','No tiene ninguna falla.'],e:'Es una generalización apresurada: un caso no permite concluir sobre "todos".'},
{a:'lc',q:'"Si no apoyas la nueva norma, entonces estás a favor del desorden." Este argumento',o:['presenta solo dos opciones cuando puede haber más.','se apoya en la opinión de un experto.','usa una comparación adecuada.','demuestra la conclusión con datos.'],e:'Es un falso dilema: se puede no apoyar la norma y tampoco querer el desorden.'},

/* ===== MATEMÁTICAS ===== */
{a:'mat',x:'mat1',q:'¿Cuál fue el promedio de bultos vendidos por día?',o:['14','15','12','70'],e:'(12+15+9+15+19)/5 = 70/5 = 14.'},
{a:'mat',x:'mat1',q:'¿Cuál es la moda de los datos?',o:['15','14','19','9'],e:'15 aparece dos veces; los demás una vez.'},
{a:'mat',x:'mat1',q:'¿Cuál es la mediana de los datos?',o:['15','14','12','9'],e:'Ordenados: 9, 12, 15, 15, 19. El dato del medio es 15.'},
{a:'mat',x:'mat1',q:'¿En qué porcentaje aumentaron las ventas del miércoles al viernes?',o:['Aproximadamente 111 %','10 %','52 %','90 %'],e:'Pasó de 9 a 19: aumento de 10; 10/9 ≈ 1,11 → 111 %.'},
{a:'mat',x:'mat2',q:'Si una persona habló 130 minutos en el mes, ¿cuánto paga?',o:['$40.000','$65.000','$25.500','$15.000'],e:'Excedente: 30 minutos × $500 = $15.000; más $25.000 = $40.000.'},
{a:'mat',x:'mat2',q:'Si m es el número de minutos (m > 100), ¿qué expresión da el valor a pagar?',o:['25.000 + 500(m − 100)','25.000 + 500m','25.000(m − 100)','500 + 25.000(m − 100)'],e:'Se cobra el fijo más $500 solo por los minutos que pasan de 100.'},
{a:'mat',x:'mat2',q:'Una persona pagó $32.500. ¿Cuántos minutos habló?',o:['115','65','150','100'],e:'32.500 − 25.000 = 7.500; 7.500/500 = 15 minutos extra → 115.'},
{a:'mat',q:'Una caja tiene 3 bolas rojas, 6 azules y 3 verdes. Si se saca una al azar, ¿cuál es la probabilidad de que sea roja o verde?',o:['1/2','1/4','1/3','3/4'],e:'Rojas o verdes: 6 de 12 → 1/2.'},
{a:'mat',q:'Si se lanzan dos monedas, ¿cuál es la probabilidad de obtener al menos una cara?',o:['3/4','1/2','1/4','2/3'],e:'Casos: CC, CS, SC, SS. Tres de cuatro tienen al menos una cara.'},
{a:'mat',q:'Un rectángulo tiene perímetro de 30 cm y su largo es el doble del ancho. ¿Cuál es su área?',o:['50 cm²','45 cm²','100 cm²','30 cm²'],e:'2(2a + a) = 30 → a = 5, largo 10. Área = 50 cm².'},
{a:'mat',q:'La función f(x) = 2x − 3. ¿Cuál es el valor de f(4)?',o:['5','11','8','−5'],e:'2·4 − 3 = 5.'},
{a:'mat',q:'¿Cuál de las siguientes rectas es paralela a y = 3x + 1?',o:['y = 3x − 7','y = −3x + 1','y = x/3 + 1','y = −x/3'],e:'Las rectas paralelas tienen la misma pendiente (3).'},
{a:'mat',q:'Un tanque se llena con 3 llaves iguales en 8 horas. ¿En cuánto tiempo lo llenan 4 llaves iguales?',o:['6 horas','10 horas y 40 minutos','5 horas','7 horas'],e:'Proporción inversa: 3 × 8 = 24; 24/4 = 6 horas.'},
{a:'mat',q:'El precio de un artículo sube 10 % y luego baja 10 %. Respecto al precio inicial, el precio final es',o:['1 % menor.','igual.','1 % mayor.','10 % menor.'],e:'P × 1,1 × 0,9 = 0,99P: queda 1 % por debajo.'},
{a:'mat',q:'¿Cuál es el valor de x en 3(x − 2) = 2x + 5?',o:['11','3','7','−1'],e:'3x − 6 = 2x + 5 → x = 11.'},
{a:'mat',q:'Una escalera de 5 m se apoya en una pared y su base queda a 3 m de la pared. ¿A qué altura toca la pared?',o:['4 m','2 m','√34 m','8 m'],e:'Pitágoras: √(25 − 9) = √16 = 4 m.'},
{a:'mat',q:'En un mapa, 1 cm representa 5 km. Dos pueblos están a 7,4 cm en el mapa. ¿Cuál es la distancia real?',o:['37 km','12,4 km','3,7 km','74 km'],e:'7,4 × 5 = 37 km.'},
{a:'mat',q:'¿Cuántos números de dos cifras distintas se pueden formar con los dígitos 1, 2, 3 y 4?',o:['12','16','8','24'],e:'4 opciones para la primera cifra y 3 para la segunda: 4 × 3 = 12.'},
{a:'mat',q:'Una gráfica muestra que la temperatura de un horno sube 15 °C cada minuto desde 20 °C. ¿Qué temperatura tendrá a los 8 minutos?',o:['140 °C','120 °C','135 °C','160 °C'],e:'20 + 15 × 8 = 140 °C.'},
{a:'mat',q:'¿Cuál de estas expresiones es equivalente a (x + 3)²?',o:['x² + 6x + 9','x² + 9','x² + 3x + 9','2x + 6'],e:'(a + b)² = a² + 2ab + b² → x² + 6x + 9.'},
{a:'mat',q:'Un estudiante dice: "Si el promedio de un grupo es 3,5, entonces la mitad sacó más de 3,5". Esta afirmación es',o:['falsa, porque eso lo indica la mediana, no el promedio.','verdadera siempre.','verdadera solo si hay más de 10 estudiantes.','falsa, porque el promedio siempre es menor que la mediana.'],e:'El promedio puede estar afectado por valores extremos; la mitad por encima la indica la mediana.'},
{a:'mat',q:'Un cubo tiene arista de 3 cm. Si la arista se duplica, su volumen',o:['se multiplica por 8.','se duplica.','se multiplica por 4.','se multiplica por 6.'],e:'Volumen = a³; (2a)³ = 8a³.'},
{a:'mat',q:'¿Qué número sigue en la sucesión 2, 6, 18, 54, …?',o:['162','108','72','216'],e:'Cada término se multiplica por 3: 54 × 3 = 162.'},
{a:'mat',q:'En una encuesta a 200 personas, 30 % prefiere fútbol, 25 % baloncesto y el resto otros deportes. ¿Cuántas personas prefieren otros deportes?',o:['90','45','110','55'],e:'100 % − 55 % = 45 %; 45 % de 200 = 90.'},
{a:'mat',q:'La razón entre hombres y mujeres en un curso es 2 : 3. Si hay 35 estudiantes, ¿cuántas mujeres hay?',o:['21','14','15','20'],e:'Partes: 5; 35/5 = 7; mujeres = 3 × 7 = 21.'},

/* ===== SOCIALES Y CIUDADANAS ===== */
{a:'soc',x:'soc1',q:'¿Qué mecanismo deberían usar los habitantes para proteger el derecho colectivo a un ambiente sano?',o:['La acción popular.','La acción de tutela por un derecho fundamental individual.','El referendo.','La revocatoria del mandato.'],e:'La acción popular protege derechos e intereses colectivos como el ambiente sano.'},
{a:'soc',x:'soc1',q:'¿Qué derecho de las comunidades se pudo haber afectado al no consultarlas?',o:['La participación en las decisiones que las afectan.','El derecho al voto.','La libertad de culto.','El derecho a la nacionalidad.'],e:'La Constitución garantiza la participación ciudadana en decisiones que afectan a la comunidad.'},
{a:'soc',x:'soc1',q:'¿Cuál de estas soluciones tiene en cuenta los intereses de las dos partes?',o:['Hacer estudios técnicos con participación de las veredas y buscar otra ubicación si hay riesgo para el agua.','Construir el relleno de inmediato porque la alcaldía tiene la autoridad.','Suspender para siempre la recolección de basuras.','Trasladar a las tres veredas a otro lugar.'],e:'Atiende la necesidad del relleno y la protección del agua de las veredas.'},
{a:'soc',x:'soc2',q:'Que la paz sea "un deber" significa que',o:['todos los ciudadanos deben contribuir a la convivencia pacífica.','solo el Ejército debe buscar la paz.','la paz es un asunto opcional.','la paz solo se logra con acuerdos firmados.'],e:'Al ser deber, obliga también a las personas, no solo al Estado.'},
{a:'soc',q:'¿Qué mecanismo protege de manera inmediata los derechos fundamentales cuando son vulnerados o amenazados?',o:['La acción de tutela.','La acción de cumplimiento.','El cabildo abierto.','La consulta popular.'],e:'Artículo 86: la tutela protege derechos fundamentales y el juez decide en máximo 10 días.'},
{a:'soc',q:'Un ciudadano quiere que una entidad pública le entregue información sobre un contrato. ¿Qué debe presentar?',o:['Un derecho de petición.','Una acción popular.','Una revocatoria del mandato.','Un plebiscito.'],e:'El derecho de petición (art. 23) permite pedir información a las autoridades.'},
{a:'soc',q:'¿Qué mecanismo se usa para exigir que una autoridad cumpla una ley o un acto administrativo?',o:['La acción de cumplimiento.','La acción de tutela.','El derecho de petición.','La iniciativa legislativa.'],e:'La acción de cumplimiento (art. 87) busca que se cumplan normas con fuerza de ley.'},
{a:'soc',q:'¿Cuál de estos organismos ejerce el control fiscal, es decir, vigila el uso de los recursos públicos?',o:['La Contraloría General de la República.','La Procuraduría General de la Nación.','La Fiscalía General de la Nación.','La Registraduría Nacional.'],e:'La Contraloría vigila la gestión fiscal; la Procuraduría vigila la conducta de los funcionarios.'},
{a:'soc',q:'¿Qué entidad investiga y puede sancionar disciplinariamente a un servidor público?',o:['La Procuraduría General de la Nación.','La Contraloría General de la República.','El Congreso de la República.','El Banco de la República.'],e:'La Procuraduría ejerce el control disciplinario.'},
{a:'soc',q:'En Colombia, ¿qué rama del poder público se encarga de hacer las leyes?',o:['La rama legislativa (Congreso).','La rama ejecutiva (Presidencia).','La rama judicial (Cortes).','Los organismos de control.'],e:'El Congreso, compuesto por Senado y Cámara, hace las leyes.'},
{a:'soc',q:'La separación de poderes busca principalmente',o:['evitar que una sola persona o institución concentre todo el poder.','que el presidente pueda hacer leyes sin el Congreso.','que los jueces sean elegidos por el presidente.','eliminar los partidos políticos.'],e:'Cada rama controla a las otras (pesos y contrapesos).'},
{a:'soc',q:'La Constitución de 1991 define a Colombia como un Estado social de derecho. Esto implica que el Estado',o:['debe garantizar condiciones de vida digna, además de respetar la ley.','solo debe castigar a quienes violan la ley.','no interviene en la economía.','depende de la religión católica.'],e:'"Social" añade el deber de garantizar derechos y condiciones materiales.'},
{a:'soc',q:'¿Qué carácter tiene Colombia en cuanto a su diversidad según la Constitución de 1991?',o:['Pluriétnico y multicultural.','Monocultural y unitario en lo étnico.','Confesional católico.','Federal.'],e:'El artículo 7 reconoce y protege la diversidad étnica y cultural.'},
{a:'soc',q:'El Frente Nacional (1958-1974) consistió en',o:['un acuerdo para que liberales y conservadores se alternaran el poder.','una guerra entre liberales y conservadores.','la creación de la Constitución de 1991.','un tratado de paz con las FARC.'],e:'Alternancia presidencial y reparto paritario de cargos entre los dos partidos.'},
{a:'soc',q:'Una de las críticas al Frente Nacional es que',o:['excluyó a otras fuerzas políticas de la participación.','permitió demasiados partidos políticos.','eliminó las elecciones presidenciales.','convirtió a Colombia en un país federal.'],e:'Al repartirse el poder solo entre dos partidos, cerró el espacio a otras corrientes.'},
{a:'soc',q:'La Revolución Industrial generó en las ciudades europeas del siglo XIX',o:['migración del campo a la ciudad y condiciones duras de trabajo en las fábricas.','el regreso de la población al campo.','el fin del comercio internacional.','la desaparición de la clase obrera.'],e:'Las fábricas atrajeron campesinos y surgió la clase obrera con jornadas extensas.'},
{a:'soc',q:'Si el precio de un producto sube mucho y los demás factores se mantienen iguales, normalmente',o:['la cantidad demandada disminuye.','la cantidad demandada aumenta.','la oferta desaparece.','el producto deja de existir.'],e:'Ley de la demanda: a mayor precio, menor cantidad demandada.'},
{a:'soc',q:'La inflación es',o:['el aumento generalizado y sostenido de los precios.','la disminución del desempleo.','el aumento de las exportaciones.','la caída de los precios de un solo producto.'],e:'Si los precios suben en general, el dinero compra menos.'},
{a:'soc',q:'¿Qué entidad tiene como función principal controlar la inflación en Colombia?',o:['El Banco de la República.','La DIAN.','El Ministerio de Educación.','La Contraloría.'],e:'El Banco de la República maneja la política monetaria.'},
{a:'soc',q:'En una asamblea del colegio, un grupo de estudiantes no deja hablar a quienes piensan distinto. Esta actitud va en contra de',o:['el pluralismo y la deliberación democrática.','el derecho a la educación.','la libertad de culto.','el derecho a la propiedad.'],e:'La democracia exige escuchar y debatir distintas posiciones.'},
{a:'soc',q:'Un campesino dice que la nueva carretera traerá progreso; un ambientalista dice que destruirá un bosque. Analizar el caso desde ambas posiciones permite',o:['comprender que una misma situación tiene distintos efectos según los intereses de cada actor.','concluir que el campesino tiene la razón.','concluir que el ambientalista tiene la razón.','evitar que se construya cualquier carretera.'],e:'Es el multiperspectivismo: reconocer intereses y efectos diferentes.'},
{a:'soc',q:'¿Cuál de los siguientes NO es un mecanismo de participación ciudadana establecido en la Constitución?',o:['La huelga de hambre.','El voto.','El plebiscito.','La revocatoria del mandato.'],e:'El artículo 103 enumera voto, plebiscito, referendo, consulta popular, cabildo abierto, iniciativa legislativa y revocatoria.'},
{a:'soc',q:'La revocatoria del mandato permite a los ciudadanos',o:['retirar del cargo a un alcalde o gobernador que no cumplió su programa.','cambiar la Constitución.','elegir a los jueces.','destituir al presidente de la República.'],e:'Aplica a alcaldes y gobernadores por incumplir el programa de gobierno.'},
{a:'soc',q:'La cordillera de los Andes en Colombia se divide en',o:['tres ramales: Occidental, Central y Oriental.','dos ramales: Norte y Sur.','cuatro ramales iguales.','un solo ramal continuo.'],e:'Al sur, en el Macizo Colombiano, se divide en tres cordilleras.'},
{a:'soc',q:'La región Caribe de Colombia se caracteriza principalmente por',o:['clima cálido, llanuras y costas sobre el mar Caribe.','páramos y nevados.','selva amazónica densa.','ser la región menos poblada del país.'],e:'Es una región de tierras bajas y cálidas con costa.'},
{a:'soc',q:'La independencia de Colombia se suele relacionar con el grito del 20 de julio de 1810 y se consolidó con',o:['la Batalla de Boyacá en 1819.','la Constitución de 1991.','la Guerra de los Mil Días.','el Bogotazo de 1948.'],e:'La Batalla de Boyacá (7 de agosto de 1819) selló la independencia de la Nueva Granada.'},
{a:'soc',q:'Un adolescente es acosado por sus compañeros en redes sociales. ¿Qué es lo más adecuado desde la convivencia escolar?',o:['Informar al colegio para activar la ruta de atención y proteger al estudiante.','Responder con insultos para defenderse.','Cerrar las redes y no contarle a nadie.','Publicar datos personales de los acosadores.'],e:'La Ley 1620 de 2013 crea rutas de atención para la convivencia escolar.'},
{a:'soc',q:'La globalización se refiere a',o:['la creciente interconexión económica, cultural y tecnológica entre países.','el aislamiento económico de los países.','la desaparición de las fronteras físicas.','el regreso al trueque.'],e:'Los países se vuelven más interdependientes en comercio, información y cultura.'},
{a:'soc',q:'Un alcalde decide destinar recursos a pavimentar calles en lugar de mejorar el acueducto. Una pregunta que ayuda a evaluar críticamente esta decisión es',o:['¿Cuántas personas se benefician con cada opción y qué necesidades son más urgentes?','¿De qué partido es el alcalde?','¿Cuánto mide cada calle?','¿El alcalde nació en el municipio?'],e:'Evaluar una decisión pública implica comparar beneficiados, necesidades y efectos.'},

/* ===== CIENCIAS NATURALES ===== */
{a:'cn',x:'cn1',q:'¿Cuál es la variable independiente del experimento?',o:['El tipo de luz que recibe cada planta.','La altura de la planta.','La cantidad de agua.','El tipo de planta.'],e:'Es lo que el estudiante cambia a propósito: el tipo de luz.'},
{a:'cn',x:'cn1',q:'¿Por qué la planta con luz verde creció menos que la de luz blanca?',o:['Porque la clorofila absorbe poco la luz verde y la refleja.','Porque la luz verde es más caliente.','Porque la luz verde no tiene energía.','Porque recibió menos agua.'],e:'La clorofila absorbe sobre todo luz roja y azul; la verde la refleja (por eso vemos las hojas verdes).'},
{a:'cn',x:'cn1',q:'La planta en oscuridad creció 4 cm pero quedó pálida y delgada. La explicación más adecuada es que',o:['creció usando las reservas de la semilla y se estiró buscando luz, sin poder fabricar clorofila suficiente.','la oscuridad es mejor para las plantas.','hizo más fotosíntesis que las otras.','recibió más agua que las demás.'],e:'Es la etiolación: la planta usa reservas y alarga el tallo buscando luz.'},
{a:'cn',x:'cn1',q:'¿Qué cambio haría MÁS confiables las conclusiones del experimento?',o:['Usar varias plantas en cada caja.','Regar solo la planta de la caja 1.','Medir las plantas una sola vez.','Usar plantas de distintas especies en cada caja.'],e:'Repetir con más individuos reduce el efecto del azar.'},
{a:'cn',x:'cn2',q:'En esta cadena, las garzas son',o:['consumidores secundarios.','productores.','consumidores primarios.','descomponedores.'],e:'Comen peces que a su vez comen plantas.'},
{a:'cn',x:'cn2',q:'Si una enfermedad acaba con la mayoría de las garzas, lo más probable a corto plazo es que',o:['aumenten los peces pequeños y disminuyan las plantas acuáticas.','disminuyan los peces pequeños.','aumenten las garzas de otra especie inmediatamente.','desaparezcan las bacterias.'],e:'Sin depredador aumentan los peces, que comen más plantas.'},
{a:'cn',x:'cn2',q:'La función de las bacterias en este ecosistema es',o:['devolver los nutrientes al suelo y al agua.','producir oxígeno por fotosíntesis.','alimentar directamente a las garzas.','controlar la población de garzas.'],e:'Los descomponedores reciclan la materia orgánica.'},
{a:'cn',q:'En la fotosíntesis, las plantas toman ___ y liberan ___.',o:['dióxido de carbono; oxígeno','oxígeno; dióxido de carbono','nitrógeno; oxígeno','oxígeno; agua'],e:'6CO₂ + 6H₂O + luz → glucosa + 6O₂.'},
{a:'cn',q:'¿Qué organelo celular es el principal responsable de producir energía (ATP) a partir de la glucosa?',o:['La mitocondria.','El cloroplasto.','El ribosoma.','La pared celular.'],e:'La respiración celular ocurre principalmente en la mitocondria.'},
{a:'cn',q:'Al cruzar dos plantas heterocigotas Aa (A = flor roja dominante, a = flor blanca), ¿qué proporción de la descendencia se espera con flor blanca?',o:['25 %','50 %','75 %','0 %'],e:'Cuadro de Punnett: AA, Aa, Aa, aa. Solo aa (1 de 4) es blanca.'},
{a:'cn',q:'¿Qué diferencia principal hay entre una célula procariota y una eucariota?',o:['La eucariota tiene núcleo definido; la procariota no.','La procariota tiene núcleo; la eucariota no.','Solo las procariotas tienen ADN.','Solo las eucariotas tienen membrana celular.'],e:'En procariotas (bacterias) el ADN está libre en el citoplasma.'},
{a:'cn',q:'Las vacunas protegen al organismo porque',o:['estimulan al sistema inmune a producir defensas y memoria contra un patógeno.','matan directamente todas las bacterias del cuerpo.','reemplazan los glóbulos rojos.','son antibióticos de larga duración.'],e:'Presentan un antígeno inofensivo y el cuerpo crea anticuerpos y células de memoria.'},
{a:'cn',q:'¿Por qué no se deben usar antibióticos contra una gripa causada por virus?',o:['Porque los antibióticos actúan contra bacterias, no contra virus.','Porque los virus son más grandes que las bacterias.','Porque la gripa no es una enfermedad.','Porque los antibióticos fortalecen a los virus.'],e:'Usarlos mal además favorece la resistencia bacteriana.'},
{a:'cn',q:'Un estudiante mezcla agua y aceite y observa dos capas. Esta mezcla es',o:['heterogénea.','homogénea.','un compuesto.','un elemento.'],e:'Se distinguen sus componentes a simple vista.'},
{a:'cn',q:'¿Qué método es el más adecuado para separar arena del agua?',o:['Filtración.','Destilación.','Evaporación del agua y la arena.','Imantación.'],e:'El filtro retiene el sólido insoluble y deja pasar el líquido.'},
{a:'cn',q:'Una solución tiene pH 3. Se puede afirmar que es',o:['ácida.','básica.','neutra.','salina siempre.'],e:'pH menor que 7 es ácido; 7 neutro; mayor que 7 básico.'},
{a:'cn',q:'¿Cuántos átomos de oxígeno hay en 2H₂SO₄?',o:['8','4','6','2'],e:'Cada molécula tiene 4 O; 2 × 4 = 8.'},
{a:'cn',q:'En la reacción 2H₂ + O₂ → 2H₂O, se cumple la ley de conservación de la masa porque',o:['hay el mismo número de átomos de cada elemento antes y después.','se forma más agua que hidrógeno.','el oxígeno desaparece.','el número de moléculas es igual a cada lado.'],e:'4 H y 2 O en reactivos; 4 H y 2 O en productos.'},
{a:'cn',q:'Los elementos de un mismo grupo (columna) de la tabla periódica tienen',o:['propiedades químicas parecidas porque tienen igual número de electrones de valencia.','la misma masa atómica.','el mismo número de protones.','el mismo estado físico siempre.'],e:'Los electrones de valencia determinan cómo reacciona un elemento.'},
{a:'cn',q:'Al calentar un globo, su volumen aumenta porque',o:['las partículas del gas se mueven más rápido y se separan más.','el gas se convierte en líquido.','las partículas aumentan de tamaño.','entra más aire desde afuera.'],e:'A mayor temperatura, mayor energía cinética de las partículas.'},
{a:'cn',q:'Un carro se mueve con velocidad constante en línea recta. La fuerza neta sobre él es',o:['cero.','igual a su peso.','mayor que cero en la dirección del movimiento.','igual a su velocidad.'],e:'Primera ley de Newton: sin aceleración, la fuerza neta es cero.'},
{a:'cn',q:'Se empuja con la misma fuerza una caja de 10 kg y otra de 20 kg sobre una superficie sin fricción. La caja de 20 kg tendrá',o:['la mitad de la aceleración de la de 10 kg.','el doble de la aceleración.','la misma aceleración.','aceleración cero.'],e:'a = F/m: al duplicar la masa, la aceleración se reduce a la mitad.'},
{a:'cn',q:'Una pelota se lanza hacia arriba. En el punto más alto de su trayectoria',o:['su velocidad es cero pero sigue actuando la gravedad.','su aceleración es cero.','su energía potencial es mínima.','no actúa ninguna fuerza sobre ella.'],e:'Se detiene un instante; la gravedad sigue actuando hacia abajo.'},
{a:'cn',q:'Cuando una pelota cae libremente (sin fricción), la energía potencial',o:['se transforma en energía cinética.','se destruye.','aumenta.','se convierte en masa.'],e:'Al bajar pierde altura y gana velocidad; la energía mecánica se conserva.'},
{a:'cn',q:'En un circuito, dos bombillos están conectados en serie. Si uno se funde,',o:['el otro también se apaga.','el otro brilla más.','el otro sigue igual.','la pila se descarga de inmediato.'],e:'En serie hay un solo camino para la corriente; si se abre, se interrumpe.'},
{a:'cn',q:'El sonido no se propaga en el vacío porque',o:['necesita un medio material para propagarse.','viaja más rápido que la luz.','es una onda electromagnética.','el vacío lo absorbe.'],e:'El sonido es una onda mecánica que necesita partículas que vibren.'},
{a:'cn',q:'Vemos el relámpago antes de oír el trueno porque',o:['la luz viaja mucho más rápido que el sonido.','el trueno ocurre después del relámpago.','el sonido viaja más rápido que la luz.','los ojos funcionan más rápido que los oídos.'],e:'Luz ≈ 300.000 km/s; sonido ≈ 340 m/s en el aire.'},
{a:'cn',q:'La deforestación de la Amazonía contribuye al cambio climático principalmente porque',o:['se pierde la capacidad de los árboles de absorber CO₂ y se libera el carbono almacenado.','los árboles producen gases de efecto invernadero.','aumenta la lluvia en todo el planeta.','disminuye la temperatura del suelo.'],e:'Los bosques son sumideros de carbono; al talarlos o quemarlos se libera CO₂.'},
{a:'cn',q:'El mercurio usado en la minería de oro es peligroso para la salud porque',o:['se acumula en los peces y pasa a las personas a través de la cadena alimentaria.','se evapora sin dejar rastro.','solo afecta a las plantas.','se transforma en oro.'],e:'Es bioacumulable: su concentración aumenta en cada nivel de la cadena.'},
{a:'cn',q:'Un científico dice que una hipótesis es válida solo si se puede poner a prueba. ¿Cuál de estas es una hipótesis comprobable?',o:['Las semillas germinan más rápido a 25 °C que a 10 °C.','Las plantas sienten tristeza.','El universo fue creado con un propósito.','Los colores bonitos atraen la buena suerte.'],e:'Se puede diseñar un experimento midiendo el tiempo de germinación.'},
{a:'cn',q:'Un enlace entre sodio (metal) y cloro (no metal) en la sal de cocina es',o:['iónico, porque el sodio cede un electrón al cloro.','covalente, porque comparten electrones por igual.','metálico.','de hidrógeno.'],e:'Metal + no metal con gran diferencia de electronegatividad forma enlace iónico.'},
{a:'cn',q:'En la meiosis se forman',o:['células con la mitad de los cromosomas, como los gametos.','células idénticas a la célula madre.','células con el doble de cromosomas.','solo células de la piel.'],e:'La meiosis produce gametos haploides (n).'},

/* ===== INGLÉS ===== */
{a:'ing',q:'PART 1 — Where can you see this notice? "Please keep your seatbelt fastened while the sign is on."',o:['On a plane','In a library','In a supermarket','At a swimming pool'],e:'El cinturón y la señal encendida son típicos de un avión.'},
{a:'ing',q:'PART 1 — Where can you see this notice? "No running. No diving in the shallow end."',o:['At a swimming pool','In a hospital','In a bank','On a bus'],e:'"Shallow end" es la parte poco profunda de una piscina.'},
{a:'ing',q:'PART 1 — What does this notice mean? "Visitors must sign in at reception."',o:['Visitors have to write their names at the front desk.','Visitors can enter without permission.','Visitors must buy a ticket at reception.','Visitors cannot go to reception.'],e:'"Sign in" = registrarse escribiendo el nombre.'},
{a:'ing',q:'PART 1 — Where can you see this notice? "Please return books by the date stamped below."',o:['In a library book','In a restaurant menu','At a train station','On a medicine box'],e:'Devolver libros en la fecha sellada: biblioteca.'},
{a:'ing',q:'PART 2 — Which word matches the description? "You use this to open a door."',o:['a key','a wallet','a towel','a ladder'],e:'Key = llave.'},
{a:'ing',q:'PART 2 — Which word matches the description? "A person who works in a hospital and helps doctors."',o:['a nurse','a lawyer','a pilot','a farmer'],e:'Nurse = enfermero(a).'},
{a:'ing',q:'PART 2 — Which word matches the description? "You can see this in the sky at night."',o:['the moon','the sun','a rainbow','a cloud of smoke'],e:'La luna se ve de noche.'},
{a:'ing',q:'PART 2 — Which word matches the description? "This meal is eaten in the middle of the day."',o:['lunch','breakfast','dinner','dessert'],e:'Lunch = almuerzo.'},
{a:'ing',q:'PART 3 — Complete the conversation. "Would you like some coffee?" — "______"',o:['Yes, please. With a little sugar.','Yes, I would like to.','No, I don\'t.','I like coffee every day.'],e:'Respuesta cortés a un ofrecimiento: "Yes, please".'},
{a:'ing',q:'PART 3 — Complete the conversation. "I failed my math test." — "______"',o:['Oh, I\'m sorry to hear that.','Congratulations!','You\'re welcome.','That\'s a good idea.'],e:'Ante una mala noticia se expresa empatía.'},
{a:'ing',q:'PART 3 — Complete the conversation. "How long have you lived here?" — "______"',o:['For about five years.','In a small house.','Next to the school.','Very well, thanks.'],e:'"How long" pregunta por duración.'},
{a:'ing',q:'PART 3 — Complete the conversation. "Do you mind if I open the window?" — "______"',o:['Not at all. Go ahead.','Yes, please open it.','No, I don\'t like windows.','I\'m fine, thank you.'],e:'"Do you mind…?" se responde "Not at all" para dar permiso.'},
{a:'ing',x:'ing3',q:'PART 4 — Choose the word for gap (1).',o:['travelled','travels','travel','is travelling'],e:'"Last summer" exige pasado simple.'},
{a:'ing',x:'ing3',q:'PART 4 — Choose the word for gap (2).',o:['went','go','goes','going'],e:'Pasado simple de "go".'},
{a:'ing',x:'ing3',q:'PART 4 — Choose the word for gap (3).',o:['but','because','so','or'],e:'Contraste: largo, pero con paisajes hermosos.'},
{a:'ing',x:'ing3',q:'PART 4 — Choose the word for gap (4).',o:['to','at','on','in'],e:'"Went to the beach".'},
{a:'ing',x:'ing1',q:'PART 5 — What does Valentina do every Saturday?',o:['She helps her grandfather sell fruit.','She studies business at the university.','She has her own juice shop.','She fishes in the river.'],e:'"Every Saturday I help my grandfather at his fruit stand".'},
{a:'ing',x:'ing1',q:'PART 5 — Why do they have more customers now?',o:['Because they started selling fruit juice.','Because they sell cheaper mangoes.','Because the market is bigger.','Because her mother works there.'],e:'"We started selling fruit juice too, and now we have more customers".'},
{a:'ing',x:'ing1',q:'PART 5 — Who helped Valentina with the recipes?',o:['Her mother.','Her grandfather.','Her teacher.','A customer.'],e:'"My mother helped me with the recipes".'},
{a:'ing',x:'ing1',q:'PART 5 — What is Valentina\'s plan for the future?',o:['To study business and open a juice shop.','To work at the fruit stand forever.','To become a farmer.','To move to a big city to sell mangoes.'],e:'Quiere estudiar negocios y abrir su propia tienda de jugos.'},
{a:'ing',x:'ing2',q:'PART 6 — What is the main idea of the text?',o:['Bees are very important for food production and they are in danger.','Bees are only useful because they produce honey.','Farmers do not like bees.','Climate change is good for bees.'],e:'Explica su papel en la polinización y su disminución.'},
{a:'ing',x:'ing2',q:'PART 6 — According to the text, how much of our food depends on pollinators?',o:['About one third.','Almost all of it.','About half.','Very little.'],e:'"About one third of the food we eat depends on bees".'},
{a:'ing',x:'ing2',q:'PART 6 — Which is NOT mentioned as a reason why bees are disappearing?',o:['Too much honey production.','Pesticides.','Loss of forests.','Climate change.'],e:'El texto no menciona la producción de miel como causa.'},
{a:'ing',x:'ing2',q:'PART 6 — Why are some farmers planting flowers around their fields?',o:['To give bees a place to live.','To sell the flowers.','To stop climate change.','To keep bees away from their crops.'],e:'"To give bees a place to live".'},
{a:'ing',q:'PART 7 — Choose the correct option: "She ___ in Medellín since 2020."',o:['has lived','lives','is living','lived'],e:'"Since" + acción que continúa: presente perfecto.'},
{a:'ing',q:'PART 7 — Choose the correct option: "If it rains tomorrow, we ___ at home."',o:['will stay','stayed','would stayed','stay will'],e:'Primer condicional: if + presente, will + verbo.'},
{a:'ing',q:'PART 7 — Choose the correct option: "This is the ___ book I have ever read."',o:['most interesting','more interesting','interestingest','much interesting'],e:'Superlativo de adjetivo largo: the most + adjetivo.'},
{a:'ing',q:'PART 7 — Choose the correct option: "There isn\'t ___ milk in the fridge."',o:['any','some','many','a'],e:'En negativas con incontables se usa "any".'},
{a:'ing',q:'PART 7 — Choose the correct option: "I was watching TV when the phone ___."',o:['rang','was ringing','rings','ring'],e:'Acción larga (pasado continuo) interrumpida por acción corta (pasado simple).'},
{a:'ing',q:'PART 7 — Choose the correct option: "You ___ wear a helmet when you ride a motorcycle. It\'s the law."',o:['must','might','could','would'],e:'Obligación: must.'},
{a:'ing',q:'PART 7 — Choose the correct option: "My brother is good ___ playing football."',o:['at','in','on','for'],e:'Expresión fija: good at.'},
{a:'ing',q:'PART 7 — Choose the correct option: "The new bridge ___ by the city last year."',o:['was built','built','is build','has building'],e:'Voz pasiva en pasado: was + participio.'}
];

/* ---------- GENERADORES: preguntas nuevas en cada intento ---------- */
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const fmt = n => Number(n).toLocaleString('es-CO', { maximumFractionDigits: 2 });
const peso = n => '$' + Math.round(n).toLocaleString('es-CO');
function opciones(correcta, distractores, f = x => x) {
  const out = [f(correcta)];
  for (const d of distractores) { const v = f(d); if (!out.includes(v) && out.length < 4) out.push(v); }
  let k = 1; while (out.length < 4) { const v = f(typeof correcta === 'number' ? correcta + k * 3 : correcta + k); if (!out.includes(v)) out.push(v); k++; }
  return out;
}

const GENERADORES = {
  mat: [
    () => { const p = rnd(4, 18) * 5000, d = pick([10, 15, 20, 25, 30, 40]); const r = p * (1 - d / 100);
      return { q: `Un par de tenis cuesta ${peso(p)} y tiene ${d} % de descuento. ¿Cuánto se paga?`, o: opciones(r, [p * d / 100, p - d * 100, p * (1 - d / 1000)], peso), e: `Descuento: ${peso(p)} × ${d}/100 = ${peso(p * d / 100)}. Se paga ${peso(r)}.` }; },
    () => { const x = rnd(2, 15), a = rnd(2, 7), b = rnd(1, 20), c = a * x + b;
      return { q: `Si ${a}x + ${b} = ${c}, ¿cuál es el valor de x?`, o: opciones(x, [x + 1, (c + b) / a, c - b], fmt), e: `${a}x = ${c} − ${b} = ${c - b}; x = ${c - b}/${a} = ${x}.` }; },
    () => { const r = rnd(2, 8), az = rnd(2, 8), v = rnd(1, 6), t = r + az + v; const g = (m, n) => n ? g(n, m % n) : m; const s = (a, b) => `${a / g(a, b)}/${b / g(a, b)}`;
      return { q: `En una bolsa hay ${r} fichas rojas, ${az} azules y ${v} verdes. Si se saca una al azar, ¿cuál es la probabilidad de que sea azul?`, o: opciones(s(az, t), [s(az, r + v), s(r, t), s(v, t), `${az}/${t + 1}`]), e: `Casos favorables ${az} de ${t} en total: ${s(az, t)}.` }; },
    () => { const n = rnd(3, 6), h = rnd(4, 12), m = rnd(2, 5) * n, r = n * h / m;
      if (!Number.isInteger(r)) return GENERADORES.mat[1]();
      return { q: `${n} trabajadores terminan una obra en ${h} días. Trabajando al mismo ritmo, ¿en cuántos días la terminan ${m} trabajadores?`, o: opciones(r, [h * m / n, h + m - n, h - (m - n)], x => fmt(x) + ' días'), e: `Proporción inversa: ${n} × ${h} = ${n * h}; ${n * h} ÷ ${m} = ${r} días.` }; },
    () => { const x1 = rnd(-4, 3), y1 = rnd(-4, 4), m = pick([-3, -2, -1, 1, 2, 3]), dx = rnd(1, 4), x2 = x1 + dx, y2 = y1 + m * dx;
      return { q: `¿Cuál es la pendiente de la recta que pasa por los puntos (${x1}, ${y1}) y (${x2}, ${y2})?`, o: opciones(m, [-m, 1 / m, m * 2, dx]), e: `m = (${y2} − ${y1}) / (${x2} − ${x1}) = ${m * dx}/${dx} = ${m}.` }; },
    () => { const c = rnd(2, 20) * 100000, i = pick([1, 1.5, 2, 2.5, 3]), t = rnd(2, 12), r = c * i / 100 * t;
      return { q: `Se prestan ${peso(c)} con un interés simple del ${fmt(i)} % mensual durante ${t} meses. ¿Cuánto se paga solo de intereses?`, o: opciones(r, [c * i / 100, r + c, c * i * t / 10], peso), e: `I = C × i × t = ${peso(c)} × ${fmt(i / 100)} × ${t} = ${peso(r)}.` }; },
    () => { const k = rnd(1, 4), tri = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); const [a, b, h] = tri.map(v => v * k);
      return { q: `Un terreno triangular rectángulo tiene catetos de ${a} m y ${b} m. ¿Cuánto mide la cerca del lado más largo (hipotenusa)?`, o: opciones(h, [a + b, h + k, Math.abs(b - a) + h / 2], x => fmt(x) + ' m'), e: `h = √(${a}² + ${b}²) = √${a * a + b * b} = ${h} m.` }; },
    () => { const v = Array.from({ length: 5 }, () => rnd(4, 20)), s = v.reduce((a, b) => a + b, 0); const p = s / 5;
      if (!Number.isInteger(p * 10)) return GENERADORES.mat[0]();
      return { q: `Las notas de un estudiante en cinco quices fueron ${v.map(x => fmt(x / 4)).join('; ')} (sobre 5). ¿Cuál es su promedio?`, o: opciones(p / 4, [p / 4 + 0.25, s / 4, Math.max(...v) / 4], x => fmt(x)), e: `Suma = ${fmt(s / 4)}; ÷ 5 = ${fmt(p / 4)}.` }; },
    () => { const l = rnd(3, 12), a = rnd(2, 9);
      return { q: `Un salón rectangular mide ${l} m de largo y ${a} m de ancho. Si cada baldosa cuadrada mide 50 cm de lado, ¿cuántas baldosas se necesitan?`, o: opciones(l * a * 4, [l * a * 2, l * a, (l + a) * 4]), e: `Área ${l * a} m²; cada baldosa 0,25 m²; ${l * a} ÷ 0,25 = ${l * a * 4}.` }; },
    () => { const t = rnd(5, 40) * 10, p = pick([20, 25, 30, 35, 40, 45, 60]), r = t * p / 100;
      return { q: `En un colegio de ${t} estudiantes, el ${p} % usa bicicleta para llegar. ¿Cuántos estudiantes usan bicicleta?`, o: opciones(r, [t - r, r + 10, t / p * 10]), e: `${p} % de ${t} = ${t} × ${p}/100 = ${r}.` }; }
  ],
  cn: [
    () => { const v = rnd(4, 30), t = rnd(3, 20);
      return { q: `Un ciclista se mueve con velocidad constante de ${v} m/s. ¿Qué distancia recorre en ${t} s?`, o: opciones(v * t, [v + t, v / t, v * t * 2], x => fmt(x) + ' m'), e: `d = v × t = ${v} × ${t} = ${v * t} m.` }; },
    () => { const m = rnd(2, 30) * 10, V = pick([10, 20, 25, 40, 50]), d = m / V;
      return { q: `Un objeto tiene masa de ${m} g y volumen de ${V} cm³. ¿Cuál es su densidad?`, o: opciones(d, [m * V, V / m, m - V], x => fmt(x) + ' g/cm³'), e: `ρ = m/V = ${m}/${V} = ${fmt(d)} g/cm³.` }; },
    () => { const R = pick([2, 4, 5, 6, 10, 12, 20]), I = pick([0.5, 1, 1.5, 2, 3]), V = R * I;
      return { q: `Por una resistencia de ${R} Ω circula una corriente de ${fmt(I)} A. Según la ley de Ohm, ¿cuál es el voltaje?`, o: opciones(V, [R / I, I / R, R + I], x => fmt(x) + ' V'), e: `V = I × R = ${fmt(I)} × ${R} = ${fmt(V)} V.` }; },
    () => { const s = rnd(1, 9) * 5, V = pick([100, 200, 250, 500]), c = s / V * 100;
      return { q: `Se disuelven ${s} g de azúcar en agua hasta completar ${V} mL de solución. ¿Cuál es la concentración en % m/v?`, o: opciones(c, [s / V, V / s, c * 10], x => fmt(x) + ' %'), e: `% m/v = (${s} g / ${V} mL) × 100 = ${fmt(c)} %.` }; },
    () => { const m = rnd(1, 10), h = rnd(2, 15), g = 10, E = m * g * h;
      return { q: `Un objeto de ${m} kg está a ${h} m de altura. Tomando g = 10 m/s², ¿cuál es su energía potencial gravitacional?`, o: opciones(E, [m * h, E / 2, m + g + h], x => fmt(x) + ' J'), e: `Ep = m·g·h = ${m} × 10 × ${h} = ${E} J.` }; },
    () => { const F = rnd(2, 20) * 5, m = pick([2, 4, 5, 10]), a = F / m;
      return { q: `Sobre un carrito de ${m} kg actúa una fuerza neta de ${F} N. ¿Cuál es su aceleración?`, o: opciones(a, [F * m, m / F, F - m], x => fmt(x) + ' m/s²'), e: `a = F/m = ${F}/${m} = ${fmt(a)} m/s².` }; }
  ]
};

/* ---------- PLAN Y CONSEJOS ---------- */
const CONSEJOS = {
  es: [
    ['La noche anterior', 'Duerme por lo menos 7 horas. Repasar hasta la madrugada baja la concentración del día siguiente.'],
    ['Qué llevar', 'Documento de identidad original y vigente, lápiz de mina negra número 2, borrador y tajalápiz. Revisa tu citación en icfes.gov.co.'],
    ['Qué no llevar', 'Celular, relojes inteligentes, calculadora ni ningún aparato electrónico. Pueden anular tu examen.'],
    ['Llega temprano', 'Ubica el sitio de examen un día antes y llega con tiempo. Las puertas se cierran a la hora indicada en la citación.'],
    ['Lee la pregunta completa', 'Muchas respuestas se pierden por leer rápido. Subraya mentalmente qué te piden: causa, consecuencia, idea principal, dato.'],
    ['Descarta opciones', 'Si dudas, elimina las opciones claramente falsas. Entre dos, la correcta suele responder exactamente lo que se pregunta.'],
    ['No dejes preguntas en blanco', 'Una pregunta en blanco vale lo mismo que una mala. Responde todas, aunque sea con tu mejor intento.'],
    ['Administra el tiempo', 'Si una pregunta te frena más de dos minutos, márcala y sigue. Vuelve al final.'],
    ['Llena bien la hoja', 'Rellena el óvalo completo y revisa que el número de la pregunta coincida con el de la hoja de respuestas.'],
    ['Come bien', 'Desayuna y lleva algo liviano para el descanso entre sesiones. El examen dura casi todo el día.']
  ],
  en: [
    ['The night before', 'Sleep at least 7 hours. Studying until dawn lowers your focus the next day.'],
    ['What to bring', 'Original valid ID, No. 2 black pencil, eraser and sharpener. Check your citation at icfes.gov.co.'],
    ['What not to bring', 'Phones, smartwatches, calculators or any electronic device. They can cancel your exam.'],
    ['Arrive early', 'Find the test site the day before and arrive on time. Doors close at the time on your citation.'],
    ['Read the whole question', 'Many answers are lost by reading too fast. Note what is being asked: cause, consequence, main idea, data.'],
    ['Rule out options', 'If unsure, discard the clearly wrong options. Between two, the right one answers exactly what is asked.'],
    ['Leave nothing blank', 'A blank answer counts the same as a wrong one. Answer everything with your best attempt.'],
    ['Manage your time', 'If a question takes more than two minutes, mark it and move on. Come back at the end.'],
    ['Fill the sheet carefully', 'Fill the whole oval and check the question number matches the answer sheet.'],
    ['Eat well', 'Have breakfast and bring a light snack for the break between sessions. The exam takes most of the day.']
  ]
};

/* Niveles de desempeño de referencia (aproximados) por prueba, sobre 100 */
const NIVELES = {
  lc:  [[0, 35], [36, 50], [51, 65], [66, 100]],
  mat: [[0, 35], [36, 50], [51, 70], [71, 100]],
  soc: [[0, 40], [41, 55], [56, 70], [71, 100]],
  cn:  [[0, 40], [41, 55], [56, 70], [71, 100]],
  ing: [[0, 36, 'A−'], [37, 57, 'A1'], [58, 70, 'A2'], [71, 79, 'B1'], [80, 100, 'B+']]
};
