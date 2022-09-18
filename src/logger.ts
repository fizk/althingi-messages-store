export const LEVELS = {
    NOTHING: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 4,
    DEMO: 5,
    DEBUG: 6
};

export const logLevel = LEVELS.INFO;

interface LogMessage {
    message: string | null,
    broker?: string
    clientId?: string
    correlationId?: number
    size?: number
    timestamp?: string
    topic ?: string | null
    error ?: string
    error_stack ?: string
    error_location ?: string
    request_url ?: string
    request_method ?: string
    response_status ?: number
    request_body ?: unknown
    response_body?: unknown
    event?: unknown
}

export const ConsoleLogger = (_logLevel: number) => ({ namespace, log, label, level }: {
    namespace: string,
    level: number,
    label: string,
    log: LogMessage
}) => {
    const { message,
        topic,
        error,
        error_stack,
        error_location,
        request_url,
        request_method,
        response_status,
        ...extra
    } = log;
    const payload = {
        namespace,
        message: message,
        topic: topic || null,
        error: error || null,
        error_stack: error_stack || null,
        error_location: error_location || null,
        request_url: request_url || null,
        request_method: request_method || null,
        response_status: response_status || 0,
        extra: extra || {},
    };

    if (_logLevel >= level) {
        console.log(`[${new Date().toISOString()}] ${label} ${JSON.stringify(payload)}`)
    }
}
