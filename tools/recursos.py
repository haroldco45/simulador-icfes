"""Robot de Rumbo al ICFES (Vibras Positivas HM).
Corre en GitHub Actions:
  1. Descarga fotos reales del examen Saber 11 desde noticias (imagen principal de cada artículo, "Foto: Icfes").
  2. Arma og.png (vista previa del enlace, 1200x630) con una foto real.
  3. Busca videos del Saber 11 en YouTube por área y escribe videos.json.
"""
import io, json, os, re, sys, urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ARTICULOS = [
    ('https://www.elcolombiano.com/colombia/educacion/prueba-saber-11-icfes-presentar-examen-HL39106166', 'Foto: Icfes / El Colombiano'),
    ('https://bogota.gov.co/mi-ciudad/educacion/mas-de-650-mil-personas-presentaran-pruebas-de-estado-el-26-de-julio', 'Foto: Alcaldía de Bogotá'),
    ('https://www.elpais.com.co/colombia/icfes-saber-11-2026-esta-es-la-fecha-de-publicacion-de-resultados-y-como-consultarlos-2758.html', 'Foto: Icfes / El País'),
    ('https://bogota.gov.co/mi-ciudad/educacion/presentacion-de-las-pruebas-saber-11-calendario-b-en-bogota-2026', 'Foto: Icfes / Alcaldía de Bogotá'),
    ('https://www.noticiasrcn.com/economia/presenta-las-pruebas-saber-11-lo-que-debe-llevar-y-lo-que-no-puede-ingresar-al-icfes-1043202', 'Foto: Icfes / Noticias RCN'),
    ('https://www.eltiempo.com/vida/educacion/mas-de-110-000-jovenes-presentaran-este-fin-de-semana-las-pruebas-saber-11-esto-es-todo-lo-que-debe-saber-para-la-aplicacion-del-examen-3539963', 'Foto: Icfes / El Tiempo'),
    ('https://www.diariodelsur.com.co/?p=604540', 'Foto: Diario del Sur'),
    ('https://www.bluradio.com/sociedad/educacion/icfes-confirma-fechas-de-las-pruebas-saber-11-en-2026-asi-sera-el-calendario-so35', 'Foto: Icfes / Blu Radio'),
]

BUSQUEDAS = [
    ('Icfes Saber 11 caja de herramientas', None),
    ('Saber 11 lectura crítica preguntas resueltas', 'lc'),
    ('Saber 11 matemáticas preguntas resueltas', 'mat'),
    ('Saber 11 sociales y ciudadanas preguntas resueltas', 'soc'),
    ('Saber 11 ciencias naturales preguntas resueltas', 'cn'),
    ('Saber 11 inglés preguntas resueltas', 'ing'),
    ('ICFES inglés Saber 11 parte 1 avisos', 'ing'),
]


def get(url, binary=False):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'es-CO,es;q=0.9'})
    with urllib.request.urlopen(req, timeout=40) as r:
        data = r.read()
    return data if binary else data.decode('utf-8', 'ignore')


def og_image(html):
    for pat in [r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)',
                r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image',
                r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)']:
        m = re.search(pat, html, re.I)
        if m:
            return m.group(1).replace('&amp;', '&')
    return None


def fotos():
    os.makedirs(os.path.join(ROOT, 'fotos'), exist_ok=True)
    creditos = []
    for url, cred in ARTICULOS:
        if len(creditos) >= 5:
            break
        try:
            img_url = og_image(get(url))
            if not img_url:
                print('sin og:image', url); continue
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            im = Image.open(io.BytesIO(get(img_url, True))).convert('RGB')
            if im.width < 700:
                print('muy pequeña', img_url, im.size); continue
            if im.width > 1600:
                im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
            n = len(creditos) + 1
            name = f'fotos/foto{n}.jpg'
            im.save(os.path.join(ROOT, name), quality=82, optimize=True, progressive=True)
            creditos.append({'archivo': name, 'credito': cred, 'fuente': url})
            print('ok', name, im.size, img_url)
        except Exception as e:
            print('error', url, e)
    if creditos:
        json.dump(creditos, open(os.path.join(ROOT, 'fotos/creditos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return creditos


def fuente(size, bold=True):
    for p in [os.path.join(ROOT, 'tools', 'BarlowCondensed-ExtraBold.ttf'),
              '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def cover(im, w, h):
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r) + 1, round(im.height * r) + 1), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def og(creditos):
    W, H = 1200, 630
    if creditos:
        base = cover(Image.open(os.path.join(ROOT, creditos[0]['archivo'])).convert('RGB'), W, H)
    else:
        base = Image.new('RGB', (W, H), (27, 20, 70))
    grad = Image.new('L', (W, H))
    gd = ImageDraw.Draw(grad)
    for x in range(W):
        gd.line([(x, 0), (x, H)], fill=int(235 - 200 * x / W))
    shade = Image.new('RGB', (W, H), (27, 20, 70))
    base = Image.composite(shade, base, grad)
    d = ImageDraw.Draw(base)
    d.rounded_rectangle([60, 70, 330, 118], 24, fill=(255, 184, 28))
    d.text((84, 76), 'SABER 11 · GRATIS', font=fuente(34), fill=(27, 20, 70))
    d.text((60, 140), 'RUMBO AL', font=fuente(118), fill=(255, 255, 255))
    d.text((60, 255), 'ICFES', font=fuente(150), fill=(255, 184, 28))
    d.text((62, 420), 'Simulacros con reloj · puntaje sobre 500', font=fuente(40), fill=(255, 255, 255))
    d.text((62, 470), 'Preguntas nuevas en cada intento', font=fuente(40), fill=(255, 255, 255))
    d.text((62, 560), 'simulador-icfes.netlify.app  ·  Vibras Positivas HM', font=fuente(30), fill=(230, 226, 255))
    if creditos:
        d.text((W - 330, H - 36), creditos[0]['credito'], font=fuente(22), fill=(230, 226, 255))
    base.save(os.path.join(ROOT, 'og.png'), optimize=True)
    print('og.png listo')


EMOJI = re.compile('[\U0001F000-\U0001FFFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u200D]')


def limpio(t):
    return re.sub(r'\s{2,}', ' ', EMOJI.sub('', t)).strip(' |-')


def videos():
    out, vistos = [], set()
    for q, area in BUSQUEDAS:
        try:
            html = get('https://www.youtube.com/results?search_query=' + urllib.parse.quote(q) + '&hl=es&gl=CO')
            m = re.search(r'var ytInitialData = (\{.*?\});</script>', html, re.S)
            if not m:
                continue
            data = json.loads(m.group(1))
            found = []

            def walk(o):
                if isinstance(o, dict):
                    if 'videoRenderer' in o:
                        found.append(o['videoRenderer'])
                    for v in o.values():
                        walk(v)
                elif isinstance(o, list):
                    for v in o:
                        walk(v)
            walk(data)
            k = 0
            for v in found:
                vid = v.get('videoId')
                if not vid or vid in vistos:
                    continue
                titulo = limpio(''.join(r.get('text', '') for r in v.get('title', {}).get('runs', [])))
                canal = ''.join(r.get('text', '') for r in v.get('ownerText', {}).get('runs', []))
                if 'saber' not in titulo.lower() and 'icfes' not in titulo.lower():
                    continue
                vistos.add(vid)
                out.append({'id': vid, 'titulo': titulo[:110], 'canal': canal, 'area': area})
                k += 1
                if k >= (3 if area is None else 2) or sum(1 for x in out if x['area'] == area) >= (3 if area is None else 2):
                    break
        except Exception as e:
            print('error videos', q, e)
    if out:
        json.dump(out, open(os.path.join(ROOT, 'videos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(out), 'videos')


if __name__ == '__main__':
    import urllib.parse
    paso = sys.argv[1] if len(sys.argv) > 1 else 'todo'
    if paso in ('todo', 'fotos'):
        c = fotos()
        if not c and os.path.exists(os.path.join(ROOT, 'fotos/creditos.json')):
            c = json.load(open(os.path.join(ROOT, 'fotos/creditos.json'), encoding='utf-8'))
        og(c)
    if paso in ('todo', 'videos'):
        videos()
