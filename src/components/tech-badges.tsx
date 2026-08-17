import {
  siGrafana,
  siInfluxdb,
  siMqtt,
  siOpencv,
  siLinux,
  siPython,
  siRaspberrypi,
  siRoboflow,
  siTailscale,
  siYolo,
} from "simple-icons";
import { BrandIcon } from "@/components/brand-icon";
import { cn } from "@/lib/utils";

export const TECH_BADGES = [
  {
    label: "Python",
    detail: "Servicios a bordo",
    logo: <BrandIcon path={siPython.path} color={`#${siPython.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "OpenCV",
    detail: "Visión por computador",
    logo: <BrandIcon path={siOpencv.path} color={`#${siOpencv.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "YOLO",
    detail: "Detección de personas",
    logo: <BrandIcon path={siYolo.path} color={`#${siYolo.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "Roboflow",
    detail: "Dataset y entrenamiento",
    logo: <BrandIcon path={siRoboflow.path} color={`#${siRoboflow.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "MAVLink",
    detail: "Protocolo de vuelo",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/mavlink.png" alt="" className="h-4.5 w-4.5 object-contain" />
    ),
  },
  {
    label: "Raspberry Pi",
    detail: "Companion computer",
    logo: (
      <BrandIcon
        path={siRaspberrypi.path}
        color={`#${siRaspberrypi.hex}`}
        className="h-4.5 w-4.5"
      />
    ),
  },
  {
    label: "Linux",
    detail: "Sistema embebido",
    logo: <BrandIcon path={siLinux.path} color={`#${siLinux.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "MQTT / IoT",
    detail: "Mosquitto broker",
    logo: <BrandIcon path={siMqtt.path} color={`#${siMqtt.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "Tailscale",
    detail: "VPN mesh · Zero Trust",
    logo: (
      <BrandIcon path={siTailscale.path} color={`#${siTailscale.hex}`} className="h-4.5 w-4.5" />
    ),
  },
  {
    label: "AWS",
    detail: "Cloud & EC2",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/aws.svg" alt="" className="h-5 w-auto object-contain" />
    ),
  },
  {
    label: "InfluxDB",
    detail: "Telemetría en la nube",
    logo: <BrandIcon path={siInfluxdb.path} color={`#${siInfluxdb.hex}`} className="h-4.5 w-4.5" />,
  },
  {
    label: "Grafana",
    detail: "Paneles y monitorización",
    logo: <BrandIcon path={siGrafana.path} color={`#${siGrafana.hex}`} className="h-4.5 w-4.5" />,
  },
];

export function TechBadgeRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {TECH_BADGES.map((tech) => (
        <div
          key={tech.label}
          title={tech.detail}
          className="flex items-center gap-2 rounded-full border border-line bg-paper py-2 pl-3 pr-4"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">{tech.logo}</span>
          <span className="text-[12.5px] font-bold text-ink">{tech.label}</span>
        </div>
      ))}
    </div>
  );
}
