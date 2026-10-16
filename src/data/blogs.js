const blogs = [
  {
    id: 1,
    titulo: 'Las nuevas tendencias en tecnología',
    resumen:
      'Conoce las novedades tecnológicas, dispositivos inteligentes y avances que están cambiando nuestra vida.',
    imagen: '/img/teclado.jpg',
    parrafos: [
      'La tecnología avanza constantemente y cada año aparecen nuevos dispositivos que buscan mejorar la experiencia de los usuarios. Los accesorios gamer, los dispositivos inalámbricos y los equipos con iluminación RGB se han convertido en productos muy populares.',
      'Actualmente, muchas personas buscan productos que combinen diseño, comodidad y buen rendimiento. Los teclados mecánicos, audífonos Bluetooth y mouse gamer son algunos ejemplos de accesorios que se utilizan tanto para jugar como para trabajar o estudiar.',
      'En Tech Store buscamos ofrecer productos tecnológicos que sean útiles para distintas actividades y que permitan a los usuarios mejorar su experiencia diaria con la tecnología.',
    ],
  },
  {
    id: 2,
    titulo: 'Consejos para cuidar tus dispositivos',
    resumen:
      'Aprende recomendaciones para mantener tus equipos funcionando correctamente.',
    imagen: '/img/audifonos.jpg',
    parrafos: [
      'Cuidar correctamente los dispositivos tecnológicos permite prolongar su vida útil y mantener un buen funcionamiento. Una limpieza frecuente y un uso adecuado pueden evitar muchos problemas en equipos y accesorios.',
      'Es recomendable mantener teclados, mouse y audífonos libres de polvo y humedad. También es importante evitar golpes, tirones en los cables y guardar los dispositivos en lugares seguros cuando no se estén utilizando.',
      'En el caso de los dispositivos inalámbricos, también se debe cuidar la batería y realizar una carga adecuada. Estas medidas simples ayudan a conservar los productos tecnológicos en mejores condiciones durante más tiempo.',
    ],
  },
]

export const listarBlogs = () => blogs

export const obtenerBlog = (id) => blogs.find((b) => b.id === Number(id))
