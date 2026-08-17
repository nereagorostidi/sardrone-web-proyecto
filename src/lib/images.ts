export type SiteImage = {
  src: string;
  alt: string;
  credit: string;
};

function unsplash(id: string, params = "w=2400&q=80&auto=format&fit=crop") {
  return `https://images.unsplash.com/${id}?${params}`;
}

export const IMAGES = {
  heroDrone: {
    src: "/images/hero-drone-sar.jpg",
    alt: "Recreación de un dron de búsqueda y rescate sobrevolando un bosque de montaña mientras un equipo de rescate revisa el sendero — ilustración generada por IA a modo de referencia, pendiente de sustituir por fotografía real del prototipo Guardian Eye en campo",
    credit: "Imagen generada con IA (Replicate / Flux) a modo de referencia",
  },
  droneSnowMountain: {
    src: unsplash("photo-1609642779303-04adaf2f6362"),
    alt: "Dron sobrevolando un terreno montañoso, escenario representativo de una misión SAR",
    credit: "Unsplash",
  },
  circuitMacro: {
    src: unsplash("photo-1592659762303-90081d34b277"),
    alt: "Primer plano de una placa de circuito impreso con componentes electrónicos",
    credit: "Unsplash",
  },
  circuitBoard: {
    src: unsplash("photo-1651340741844-48edcd3fe79c"),
    alt: "Placa electrónica con múltiples componentes de superficie",
    credit: "Unsplash",
  },
  antennaTower: {
    src: unsplash("photo-1661095699423-d6ccb41e211f"),
    alt: "Torre de antenas de telecomunicaciones contra el cielo",
    credit: "Unsplash",
  },
  serverRoom: {
    src: unsplash("photo-1584169417032-d34e8d805e8b"),
    alt: "Pasillo de racks de servidores en un centro de datos",
    credit: "Unsplash",
  },
  serverRack: {
    src: unsplash("photo-1695668548342-c0c1ad479aee"),
    alt: "Rack de servidores apilados verticalmente",
    credit: "Unsplash",
  },
  foggyForest: {
    src: unsplash("photo-1486707471592-8e7eb7e36f78"),
    alt: "Bosque cubierto de niebla con visibilidad reducida",
    credit: "Unsplash",
  },
  mountainFog: {
    src: unsplash("photo-1675702662605-57e37a8cb2c3"),
    alt: "Cima de montaña parcialmente cubierta por niebla baja",
    credit: "Unsplash",
  },
  communitySupport: {
    src: unsplash("photo-1582213782179-e0d53f98f2ca"),
    alt: "Grupo de personas juntando las manos en un gesto de unidad y colaboración — imagen de stock a modo representativo, sin relación con las personas reales mencionadas en esta página",
    credit: "Unsplash",
  },
  sustainableGrowth: {
    src: unsplash("photo-1542601906990-b4d3fb778b09"),
    alt: "Manos sosteniendo un pequeño brote de planta con tierra en las raíces, símbolo de crecimiento sostenible — imagen de stock a modo representativo de los Objetivos de Desarrollo Sostenible",
    credit: "Unsplash",
  },
  yoloDetectionFrame: {
    src: "https://img.youtube.com/vi/jjvX-JZZbLM/hqdefault.jpg",
    alt: "Fotograma real del vídeo de detección de personas del dron en el Club Alas de Galapagar, con el pipeline YOLO detectando a una persona sobre vídeo de vuelo",
    credit: "YouTube — vídeo del proyecto",
  },
  dronePilotSky: {
    src: unsplash("photo-1482169704817-5b66aafa1a01"),
    alt: "Piloto con el mando de control mirando hacia un dron en pleno vuelo bajo un cielo despejado, dentro del alcance visual — escenario representativo de una operación en la categoría abierta",
    credit: "Unsplash",
  },
  droneInspectorField: {
    src: "/images/hero-normativa-inspector.jpg",
    alt: "Inspector de seguridad aérea con casco y chaleco reflectante revisando una lista de comprobación en un campo abierto, junto a un dron en vuelo — ilustración generada por IA a modo representativo de la inspección y el cumplimiento normativo",
    credit: "Imagen generada con IA (Replicate / Flux) a modo de referencia",
  },
} satisfies Record<string, SiteImage>;
