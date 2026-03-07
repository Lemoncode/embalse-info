"use client";
import { useState, useCallback, useEffect } from "react";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export type GeolocationStatus = 
  | "granted" 
  | "denied";

export interface UseGeolocationReturn {
  location: UserLocation | null;
  status: GeolocationStatus;
  requestLocation: () => void;
  clearLocation: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>("denied");

  //esto es para el check de permisos cuando se cambia desde el navegador
  
  useEffect(() => {
    if (!navigator.permissions) return;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      setStatus(result.state === "granted" ? "granted" : "denied");

      result.addEventListener("change", () => {
        setStatus(result.state === "granted" ? "granted" : "denied");
        if (result.state === "denied") {
          setLocation(null);
        }
      });
    });
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus("granted");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setStatus("denied");
  }, []);

  return { 
    location, 
    status, 
    requestLocation, 
    clearLocation,
  };
}
