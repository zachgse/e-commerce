// resources/js/global.d.ts
import Echo from "laravel-echo";

declare global {
  interface Window {
    Echo: Echo; // 👈 instance of Echo
    Pusher: any;
  }
}

export {};
