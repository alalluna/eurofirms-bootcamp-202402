# FormativeLife

Esta app es una pataforma web para unir a las empresas con los estudiantes que terminaron o estén a punto de terminar sus estudios de una forma directa, con el fin de favorecer la inserción laboral.

![](./app.jpg)
### Description

Este programa se va encargar de ayudar a la gente con la inserción laboral, demostrando aquellas áreas que se le da mejor con el fin de que las empresas puedan encontrar mejor lo que buscan.

El programa será un sitio web en donde va aparecer toda la información detallada de los estudios de un estudiante, sea un ciclo de FP como una carrera universitaria o un bootcamp, y va estar separadas en secciones. En cada sección debe aparecer las asignaturas que tiene en un trimestre  la fecha (año) o en un bootcamp (en lugar de asignaturas trabajos independientes). En donde se indicara asignatura y nota de los examenes o trabajos.
Para verificar sus notas el usuario va tener la opción de adjuntar una foto de su boletín académico.

El usuario va poder hacer comentarios sobre sus notas o trabajos echos por trimeste en la sección de esos estudios.

La empresa va mirar con todo detalle aquellas secciones que le interesa de su currículun y va poder guardar el usuario en favoritos si le gusta su perfil para tenerlo a mano. Además si el usuario hace un cambio en su perfil le va a salir un punto amarillo en su "market" de la lista de favoritos para que vea sus últimos cambios.

## Functional Description

### Brief

##### Usuarios

Todo usuario mayor de 16 años se va poder registrar y tener su perfil. Una vez que el usuario se registre va tener la opción a rellenar los estudios que tiene o está cursando. El usuario va tener dos roles, o es un estudiante o una empresa.

##### Estudiantes:
- El estudiante puede añadir estudios, así como las asignaturas o tecnologías que curse.
- El estudiante puede añadir las notas de cada asignatura por trimestre o publicar sus trabajos si hace un bootcamp.
- El estudiante puede inscribirse en las ofertas de trabajo que le vaya aparenciendo y así compartir su perfil con la empresa.
- El estudiante puede y tiene que adjuntar la certificación académica o matrícula para verificar que tiene o está cursando esa estudios

##### Empresas
- La empresa va poder publicar sus ofertas de empleo.
- La empresa va poder seguir el perfil de un usuario si este se apunta a la oferta.

### Use Cases

Student
- add career
- delete career
- add subject (in career)
- delete subject
- add score (to subject)
- add comment (to subject)
- add certification (to subject)
- filter companies
- view company
- view offers (from company)

Company
- add offer
- delete offer
- filter students
- view student


## Technical Description

### Tecnologies 

- JavaScript
- REACT
- Express
- Node
- MongoDB

### Modules

- API (Server)
- App (Programa)
- COM (Paquete o librería propia que se usa en comúm en todos los archivos)

### UI Design

- Figma<br>Enlace al diseño UI -> 
<https://www.figma.com/file/2dek9Awzi4rIL1RpaI8EuR/Untitled?type=design&node-id=0-1&mode=design&t=PZWYtFxGQf7x22pK-0>

### Data Model

User
- id (auto, required)
- name (string, required)
- surname (string)
- address (string)
- activity (string)
- role (string, required)
- age (number)
- email (string, required)
- password (string, required)

Career
- id (auto)
- student (User.id, required)
- title (string, required)
- description (string, required)
- certification (string, required)

Subject
- id (auto)
- career (Career.id, required)
- title (string)
- score (number, optional)
- comment (string, optional)

Offer
- id (auto)
- company (User.id, required)
- title (string, required)
- description (string, required)
- minSalary (number, required)
- maxSalary (number, optional)
- publishDate (date, required)
- expirationDate (date, requeried)
- candidates (array, optional)

