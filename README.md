# Sprencia

- Proyecto desarrollado para la startup Sprencia que ha sido una de las seleccionadas por la cámara de Comercio de Valencia para formar parte de su programa de aceleración de startups.

- A partir de una hoja de requerimientos se ha diseñado un modelo de datos en el que nos encontramos con una tabla principal de usuarios (la cual contempla la distinción de dos roles) y una para actividades. En un principio se cuenta con unas categorías dadas pero se ha contemplado la opción de que se amplíen en un futuro, de modo que se han recogido en una tabla independiente. Se ha optado por la misma metodología para las localidades donde se imparten. Por último, la base de datos cuenta con una tabla para almacenar las imágenes de las actividades, las opiniones de los clientes así como para los proveedores que soliciten colaborar con la compañía.

- Se ha creado una API en la cual para cada entidad de base de datos se ha creado un controlador y cada uno contiene una serie de end-points, con una estructura en la que se parte de una ruta api.

- El desarrollo del front es con Angular y el back con Node+Express utilizando librerías como multer para la carga de imágenes, jsonwebtoken para el tratamiento del token, dayjs para el trabajo con fechas, nodemailer para el trabajo en la recepción de mail al solicitar una recuperación de contraseñas, dotenv para las variables de entorno...

- Al ser una startup y no disponer de un tema corporativo, se ha realizado un diseño con tonalidades en blanco, negro y gris para facilitar el visionarlo con otros colores. Para facilitar la futura inserción de un tema corporativo se han establecido los estilos en la hoja de estilos principal, de modo que se podrán cambiar los colores, fuente o diseño desde un único sitio.
