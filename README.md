# Empieza por Educar - Registration Form
![assets\logo-exe-300-01.png](https://github.com/SergioLM7/DT-form-registro-exe/blob/main/assets/logo-exe-300-01.png)
## Descripción del Proyecto
Empieza por Educar es una organización sin ánimo de lucro que trabaja para contribuir en la igualdad de oportunidades en educación. La misión de nuestro cliente es crear una red de profesionales que trabajan por la equidad educativa desde dentro y fuera del aula. A través de su programa Programa ExE, enfocado al desarrollo profesional y dirigido a aquellas personas que aspiran a generar un cambio educativo y social en beneficio de la igualdad de oportunidades de todos los niños y niñas, han conseguido formar a más de 300 profesores/as en estos últimos años.

Este proyecto está destinado a ayudar en el proceso de selección de candidat@s del Programa ExE. El objetivo es crear un formulario de inscripción completo que actúe como primer filtro automatizado para los criterios básicos de admisión de l@s candidat@s.<br>

<b>Enlace</b>: https://dt-form-registro-exe.onrender.com/

## Características de la Interfaz
![\assets\landing-formulario-exe.png](https://github.com/SergioLM7/DT-form-registro-exe/blob/main/assets/landing-formulario-exe.png)
### Interfaz Intuitiva
Interfaz de usuario amigable y fácil de usar, diseñada para que usuarios de todos los niveles de experiencia puedan navegar por el formulario.
### Mobile first + optimización en desktop
Filosofía de diseño mobile first y responsive, pero con una buena optimización en las vistas de escritorio para facilitar su uso en el día a día de la empresa.
### Seguridad
Medidas de seguridad robustas para proteger la integridad y confidencialidad de los datos introducidos por el usuario y volcados en la base de datos, incluyendo validación de campos, cifrado de archivos y análisis de malware.

## Funcionalidades Principales
### Validación de cada uno de los campos y alertas en función de los datos introducidos
La utilización de react-hook-forms nos ha permitido validar cada uno de los inputs del formulario, para así unificar la entrada de datos y limitar la posibilidad de sufrir ataques a nuestra Base de Datos.<br>

Alertas: <br>
![assets/registro-alertas.gif](https://github.com/SergioLM7/DT-form-registro-exe/blob/main/assets/registro-alertas.gif) <br>

Confirmación del registro de los datos: <br>
![assets/registro-envio.gif](https://github.com/SergioLM7/DT-form-registro-exe/blob/main/assets/registro-envio.gif) <br>


### Algoritmo filtrador de candidat@s + Sistema de notificación vía email
Una vez el/la usuari@ introduce todos los campos necesarios, estos son procesados por varios algoritmos de nuestro código. Estos se encargan de analizar automáticamente (tal y como solicitó el cliente) si se cumplen los criterios mínimos de acceso al programa de EXE (nivel de inglés en base a la carrera estudiada y nota media de la carrera). <br>

De ser así, se ha automatizado la inclusión de los datos en nuestra Base de Datos y el envío de un email de aceptación inicial que se le remitirá 24h después de su registro indicándole los próximos pasos. Si, por el contrario, no cumple con los criterios, no se incluirán sus datos en la BBDD y se le enviará un email agradeciéndole la participación en el proceso y descartando la continuidad en el mismo.<br>

Ejemplo: <br>
![assets/email-exe-aceptacion.png](https://github.com/SergioLM7/DT-form-registro-exe/blob/main/assets/email-exe-aceptacion.png) <br>

## Tecnologías Utilizadas
- Frontend: React.js, SASS
- Backend: Node.js, Express.js
- Base de Datos: MySQL, AWS, Firebase: Cloud Storage
- Control de Versiones: GitHub
## Arquitectura de la solución completa
![utils\assets\readme\arquitectura-aplicacion-exe.jpg](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/arquitectura-aplicacion-exe.jpg)
## Gestión del Proyecto
- Control de Versiones: se ha gestionado el control de versiones con GitHub desde el principio del proyecto.
- Documentación y Pruebas: se ha incluido la documentación y test del proyecto.
- Metodología ágil: sprint diarios y empleo de la herramienta Trello para el reparto y el control de tareas.
## Estructura del Proyecto
### Backend (Express)
- Controllers: Controladores para gestionar la lógica de negocios.
- Models: Modelos para la gestión de la base de datos.
- Routes: Definición de rutas para la API.
- Validators: Validadores para asegurar la integridad de los datos recibidos.
### Frontend (React)
- Components: componentes React para la interfaz de usuario.
- Context: contextos que se propagan por todo el front para controlar las secciones a las que accede cada tipo de usuario.
- Styles: estilos de la aplicación.


## Instalación
Clonar el repositorio:

```
git clone https://github.com/tu_usuario/tu_repositorio.git

```

Instalar las dependencias del frontend:
```
cd client
npm install
```

Configurar las variables de entorno.
Ejecutar la aplicación:
```
npm run dev
```

## Contribuciones
Las contribuciones son bienvenidas. Para contribuir, por favor sigue los siguientes pasos:
1. Realiza un fork del proyecto.
2. Crea una rama para tu característica (git checkout -b feature/tu_caracteristica).
3. Realiza los commits necesarios (git commit -m 'Añadir mi característica').
4. Envía tus cambios (git push origin feature/tu_caracteristica).
5. Abre un Pull Request.
## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

Autor:<br>
<br>**Sergio Lillo, Full Stack Developer**
<a href="https://www.linkedin.com/in/lillosergio/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" width=30px, height=30px/></a> 
