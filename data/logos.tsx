import {
  Joystick,
  Code,
  Gem,
  Ghost,
  Sword,
  Cpu,
  Box,
  Gamepad2,
  MonitorPlay,
  Shield,
  Globe,
  Scale,
  Fingerprint,
} from "lucide-react";
import { LogoItem } from "@/types";

// Client Logos Data
export const CLIENT_LOGOS: LogoItem[] = [
  { id: 1, name: "Vertex Games", icon: <Joystick size={32} /> },
  { id: 2, name: "OmniVerse", icon: <Code size={32} /> },
  { id: 3, name: "BlueHorizon VC", icon: <Gem size={32} /> },
  { id: 4, name: "VoidWalker Studios", icon: <Ghost size={32} /> },
  { id: 5, name: "RedDragon eSports", icon: <Sword size={32} /> },
  { id: 6, name: "StreamSync", icon: <Cpu size={32} /> },
  { id: 7, name: "CloudStream Inc.", icon: <Box size={32} /> },
];

// Organization/Alliance Logos Data
export const ORG_LOGOS: LogoItem[] = [
  { id: 1, name: "Intl. Game Developers Assn.", icon: <Gamepad2 size={32} /> },
  { id: 2, name: "Ent. Software Assn.", icon: <MonitorPlay size={32} /> },
  { id: 3, name: "Privacy Professionals", icon: <Shield size={32} /> },
  { id: 4, name: "Global eSports Fed.", icon: <Globe size={32} /> },
  { id: 5, name: "Interactive Law Soc.", icon: <Scale size={32} /> },
  { id: 6, name: "Digital Rights Watch", icon: <Fingerprint size={32} /> },
];
