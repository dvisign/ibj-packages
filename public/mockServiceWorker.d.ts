declare function handleRequest(event: any, requestId: any): Promise<Response>;
declare function resolveMainClient(event: any): Promise<any>;
declare function getResponse(event: any, client: any, requestId: any): Promise<Response>;
declare function sendToClient(client: any, message: any, transferrables?: any[]): Promise<any>;
declare function respondWithMock(response: any): Promise<Response>;
/**
 * Mock Service Worker (2.2.2).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */
declare const INTEGRITY_CHECKSUM: "223d191a56023cd36aa88c802961b911";
declare const IS_MOCKED_RESPONSE: unique symbol;
declare const activeClientIds: Set<any>;
//# sourceMappingURL=mockServiceWorker.d.ts.map