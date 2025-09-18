# Configuración de Google Tag Manager

## 1. Crear cuenta en GTM
1. Ve a [Google Tag Manager](https://tagmanager.google.com/)
2. Crea una nueva cuenta y contenedor
3. Copia tu GTM ID (formato: GTM-XXXXXXX)

## 2. Configurar en el proyecto
1. Abre el archivo `.env.local`
2. Reemplaza `GTM-XXXXXXX` con tu ID real:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-TU_ID_AQUI
   ```

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
- **contact_click**: Cuando alguien hace click en LinkedIn, GitHub, Email, WhatsApp o CV
- **project_click**: Cuando alguien hace click en un proyecto
- **language_change**: Cuando cambian el idioma
- **navigation_click**: Cuando navegan por las secciones
- **Pageviews**: Automático con GA4 Configuration

## Métricas útiles en GA4:
- Qué proyectos generan más interés
- Qué links de contacto usan más
- Tiempo en cada sección
- Dispositivos y ubicaciones de visitantes
- Tasa de rebote
- Flujo de comportamiento