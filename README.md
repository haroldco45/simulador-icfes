# Rumbo al ICFES — Simulador Saber 11

PWA bilingüe (español / inglés) para prepararse a la prueba Saber 11 del Icfes.

**Desarrollada por Vibras Positivas HM — Derechos de Autor Reservados**
Caucasia, Antioquia · vibraspositivashm.com · WhatsApp 311 770 0431

## Qué trae

- **Simulacro**: rápido (25 preguntas, 35 min), completo (65 preguntas, 95 min, repartidas como el examen real: 41 LC, 50 MAT, 50 SOC, 58 CN, 55 ING) o de una sola prueba (20 preguntas, 30 min). Reloj, mapa de preguntas, puntaje estimado por prueba y global sobre 500, nivel de desempeño y revisión con explicación.
- **Práctica por área**: sin reloj, con la respuesta y la explicación al instante.
- **Mi puntaje**: calculadora del puntaje global con la fórmula del Icfes: [(LC + MAT + SOC + CN) × 3 + ING] ÷ 13 × 5.
- **Plan de estudio**: semanas hasta el examen, horas por área (más horas a lo que más cuesta, o a lo que salió más bajo en los simulacros).
- **Videos**: clases del Saber 11 en YouTube por área; la lista la actualiza el robot cada lunes.
- **Día del examen**: qué llevar, qué no llevar y cómo administrar el tiempo.
- **Mi progreso**: historial con hora de Colombia, gráfica del puntaje global y promedio por prueba.

## Cada simulacro cambia

- 147 preguntas escritas para la app, con textos, tablas, poema, aviso, diálogo y experimentos (como el examen real).
- 16 generadores en Matemáticas y Ciencias: el 40 % de esas preguntas sale nueva en cada intento, con otros números.
- La app recuerda en el celular qué preguntas ya viste y te da primero las que no; las opciones se barajan siempre.

## Robot (GitHub Actions)

`.github/workflows/recursos.yml` corre `tools/recursos.py`:
1. Descarga fotos reales del Saber 11 (imagen principal de noticias, "Foto: Icfes") a `fotos/` con su crédito en `fotos/creditos.json`.
2. Arma `og.png`, la imagen de vista previa al compartir el enlace, con una de esas fotos.
3. Busca videos del Saber 11 en YouTube y escribe `videos.json` (cada lunes 6:17 a. m., hora de Colombia).

Para correrlo a mano: Actions → "Fotos reales y videos" → Run workflow.

## Publicar

Netlify: conectar el repo `haroldco45/simulador-icfes` con el nombre de sitio `simulador-icfes` → https://simulador-icfes.netlify.app
Si Netlify da otro nombre, cambiar la URL en `canonical`, `og:` y `twitter:` de `index.html` y en `tools/recursos.py`.

## Aviso

Herramienta independiente de práctica. No es un producto oficial ni está avalada por el Icfes. Las preguntas son de práctica tipo Saber 11. Los puntajes son estimados y los niveles de desempeño son de referencia aproximada. Fechas y citaciones oficiales: https://www.icfes.gov.co
