# Configuración de Google Tag Manager

## 1. Crear cuenta en GTM
1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea una nueva cuenta y contenedor
3. Copia tu GTM ID (formato: GTM-XXXXXXX)

## 2. Configurar en el proyecto

### 2a. Desarrollo local
1. Copiá `.env.example` a `.env.local`
2. Poné tu ID real de contenedor:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-TU_ID_AQUI
   ```

Tiene que ser un ID de **contenedor de GTM** (`GTM-...`), no un Measurement
ID de GA4 (`G-...`). El measurement ID va adentro de GTM, en el tag de
configuración del paso 3, no en esta variable.

### 2b. Producción — este paso es obligatorio
La variable se inlinea **en tiempo de build**, así que definirla solo en
local no hace nada en producción.

1. Vercel → Project Settings → Environment Variables
2. `NEXT_PUBLIC_GTM_ID` con el mismo valor, en Production, Preview y Development
3. Redeploy

Para verificar que quedó prendido:
```
curl -s https://portfolio-laureano.vercel.app | grep -c googletagmanager
```
Tiene que devolver 1 o más. Si devuelve 0, la variable no llegó al build.

## 3. Configurar Google Analytics 4 en GTM

### Paso 1: Crear cuenta de GA4
1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad GA4
3. Copia el Measurement ID (formato: G-XXXXXXXXXX)

### Paso 2: Configurar en GTM
1. En GTM, ve a "Tags" → "New"
2. Nombre: "GA4 Configuration"
3. Tag Configuration: "Google Analytics: GA4 Configuration"
4. Measurement ID: Tu ID de GA4
5. Trigger: "All Pages"
6. Guardar

### Paso 3: Crear eventos personalizados

#### Event: Contact Click
1. Crear nuevo Tag
2. Nombre: "GA4 Event - Contact Click"
3. Tag Type: "Google Analytics: GA4 Event"
4. Configuration Tag: Selecciona "GA4 Configuration"
5. Event Name: `contact_click`
6. Event Parameters:
   - `contact_type`: {{dataLayer.contact_type}}
   - `contact_link`: {{dataLayer.contact_link}}
7. Trigger: Custom Event → Event name equals "contact_click"

#### Event: Project Click
1. Crear nuevo Tag
2. Nombre: "GA4 Event - Project Click"
3. Tag Type: "Google Analytics: GA4 Event"
4. Configuration Tag: Selecciona "GA4 Configuration"
5. Event Name: `project_click`
6. Event Parameters:
   - `project_name`: {{dataLayer.project_name}}
   - `project_status`: {{dataLayer.project_status}}
   - `project_type`: {{dataLayer.project_type}}
7. Trigger: Custom Event → Event name equals "project_click"

#### Event: Language Change
1. Crear nuevo Tag
2. Nombre: "GA4 Event - Language Change"
3. Tag Type: "Google Analytics: GA4 Event"
4. Configuration Tag: Selecciona "GA4 Configuration"
5. Event Name: `language_change`
6. Event Parameters:
   - `from`: {{dataLayer.from}}
   - `to`: {{dataLayer.to}}
7. Trigger: Custom Event → Event name equals "language_change"

#### Event: Navigation Click
1. Crear nuevo Tag
2. Nombre: "GA4 Event - Navigation Click"
3. Tag Type: "Google Analytics: GA4 Event"
4. Configuration Tag: Selecciona "GA4 Configuration"
5. Event Name: `navigation_click`
6. Event Parameters:
   - `section`: {{dataLayer.section}}
   - `path`: {{dataLayer.path}}
7. Trigger: Custom Event → Event name equals "navigation_click"

## 4. Variables de Data Layer
Para cada parámetro de evento, crear una variable:

1. Ve a "Variables" → "New"
2. Variable Type: "Data Layer Variable"
3. Data Layer Variable Name: (ej: `contact_type`, `project_name`, etc.)
4. Guardar con nombre descriptivo

## 5. Testing
1. Click en "Preview" en GTM
2. Ingresa la URL de tu sitio
3. Verifica que los eventos se disparen correctamente
4. Una vez verificado, click en "Submit" → "Publish"

## 6. Verificar en GA4
1. Ve a GA4 → Realtime
2. Navega por tu sitio
3. Deberías ver los eventos en tiempo real

## Eventos que trackea tu portfolio:
- **contact_click**: Click en LinkedIn, GitHub, Email o CV
- **contact_copy**: Click en el botón de copiar el email
- **project_click**: Click en un proyecto, con `project_link_type` en `demo` o `repo`
- **language_change**: Cambio de idioma
- **navigation_click**: Navegación entre secciones
- **Pageviews**: Automático con GA4 Configuration

## Métricas útiles en GA4:
- Qué proyectos generan más interés, y si miran el demo o el código
- Qué links de contacto usan más
- Dispositivos y ubicaciones de visitantes
- Tasa de rebote

### Lo que esta configuración NO puede darte
El sitio es una sola ruta con navegación por anclas (`/#about`, `/#experience`),
así que el tag de configuración con trigger "All Pages" produce **un solo
pageview por sesión**. Tiempo por sección y flujo de comportamiento no salen
de acá: harían falta eventos de `scroll_depth` o `section_view` que este
setup no define.