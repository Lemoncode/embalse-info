import type { Media } from "@content-island/api-client";

export interface Developer {
  id: string;
  language: "es";
  lastUpdate: string;
  fullname: string;
  picture: Media;
  linkedin: string;
}
