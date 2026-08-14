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
    src: unsplash("photo-1546880093-8ea5db50d007", "w=2600&q=80&auto=format&fit=crop"),
    alt: "Dron cuadricóptero volando frente a una cordillera nevada — imagen de referencia, pendiente de sustituir por fotografía real del prototipo Guardian Eye",
    credit: "Unsplash",
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
} satisfies Record<string, SiteImage>;
