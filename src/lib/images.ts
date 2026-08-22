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
  buildUnboxing: {
    src: "/images/montaje-01-unboxing.jpg",
    alt: "Contenido completo del kit Holybro X500 V2 extendido sobre una mesa: chasis, motores, hélices, controladora y accesorios",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildPixhawk: {
    src: "/images/montaje-02-pixhawk.jpg",
    alt: "Controladora de vuelo Pixhawk 6X vista de frente, con todos sus puertos TELEM, GPS, CAN, POWER y RC IN etiquetados",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildPdb: {
    src: "/images/montaje-03-pdb.jpg",
    alt: "Placa de distribución de potencia (PDB) del kit, con sus conectores XT60 dorados para batería y ESCs",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildEsc: {
    src: "/images/montaje-04-esc.jpg",
    alt: "Controlador electrónico de velocidad (ESC) cableado a un motor, con el conector XT60 de alimentación",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildArms: {
    src: "/images/montaje-05-brazos.jpg",
    alt: "Los cuatro brazos de fibra de carbono del chasis, cada uno ya con su motor brushless y cableado montado",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildPlates: {
    src: "/images/montaje-06-placas.jpg",
    alt: "Placas superior e inferior de fibra de carbono del chasis, antes de unirse con los brazos",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildCenterPlate: {
    src: "/images/montaje-07-placa-central.jpg",
    alt: "Placa central del chasis con la PDB atornillada y el primer brazo ya acoplado",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildSkeleton: {
    src: "/images/montaje-08-esqueleto.jpg",
    alt: "Esqueleto del chasis visto desde arriba, con los cuatro brazos y el tren de aterrizaje montados, aún sin electrónica de control",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildPixhawkMounted: {
    src: "/images/montaje-09-pixhawk-montada.jpg",
    alt: "Pixhawk 6X atornillada sobre la placa superior del chasis, con el cableado del GPS y de los ESCs empezando a conectarse",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildWiringDetail: {
    src: "/images/montaje-10-cableado-detalle.jpg",
    alt: "Primer plano en ángulo del cableado alrededor de la Pixhawk 6X ya montada sobre el chasis",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildFrameDone: {
    src: "/images/montaje-11-armazon-terminado.jpg",
    alt: "Armazón del dron ya terminado, visto desde arriba, con las cuatro hélices montadas y la Pixhawk 6X centrada",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildRadioControl: {
    src: "/images/montaje-12-radio-control.jpg",
    alt: "Emisora y receptor FlySky FS-i6X recién sacados de su embalaje",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  buildBatteryCharger: {
    src: "/images/montaje-13-bateria-cargador.jpg",
    alt: "Batería LiPo 4S y cargador balanceador Ultra Power UP10, junto a los cables de carga",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  pieceGps: {
    src: "/images/pieza-gps.jpg",
    alt: "Módulo GPS y brújula Holybro M10 con su cable de conexión y el mástil de montaje aún en su bolsa",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  pieceTelemetry: {
    src: "/images/pieza-telemetria.jpg",
    alt: "Par de radios de telemetría de 433 MHz y 100 mW, emisor y receptor, con su antena SMA",
    credit: "Fotografía propia — montaje del kit Holybro X500 V2",
  },
  joseManuelDroneFrontal: {
    src: "/images/jose-manuel-dron-01-frontal.jpg",
    alt: "El dron personal de José Manuel visto de frente, con su gimbal de cámara suspendido bajo el chasis",
    credit: "Fotografía cedida por José Manuel",
  },
  joseManuelDroneGimbal: {
    src: "/images/jose-manuel-dron-02-gimbal.jpg",
    alt: "Vista superior del dron de José Manuel, con la carcasa protectora del gimbal cerrada",
    credit: "Fotografía cedida por José Manuel",
  },
  joseManuelDroneNaza: {
    src: "/images/jose-manuel-dron-03-naza.jpg",
    alt: "Detalle de la controladora de vuelo DJI Naza y el receptor de radio del dron de José Manuel",
    credit: "Fotografía cedida por José Manuel",
  },
  droneControllerLiveFeed: {
    src: unsplash("photo-1559840251-2a04897f8559"),
    alt: "Manos sujetando el mando de un dron con el vídeo en directo de la cámara mostrado en la pantalla acoplada",
    credit: "Unsplash",
  },
} satisfies Record<string, SiteImage>;
