import server from "./server";
export declare const startServer: () => import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
export declare const stopServer: (httpServer: ReturnType<typeof server.listen>) => void;
