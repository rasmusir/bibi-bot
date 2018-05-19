// Type definitions for dialogflow
// Project: dialogflow
// Definitions by: Rasmus Israelsson <nourl>
declare module "dialogflow" {
    class SessionsClient {
        sessionPath(projectId: string, sessionId: string): string
        detectIntent(request: Request): Promise<DetectIntentResponse[]>
    }

    interface Request {
        session: string,
        queryInput: QueryInput
        queryParams?: QueryParameters
        inputAudio?: string
        options?: any
        callback?: (Error?: any, response?: DetectIntentResponse) => void
    }

    interface QueryInput {
        text: {
            text: string,
            languageCode: string
        }
    }
    interface QueryParameters {
        fields: {
            kind: string
            stringValue: string
            listValue: {
                values: string[]
            }
        }
    }
    interface DetectIntentResponse {
        responseId: string
        queryResult: QueryResult
    }
    
    interface QueryResult {
        queryText: string
        languageCode: string
        speechRecognitionConfidence: number
        action: string
        parameters: Parameters
        allRequiredParamsPresent: boolean
        fulfillmentText: string
        fulfillmentMessages: Message[]
        webhookSource: string
        webhookPayload: any
        outputContexts: Context[]
        intent: Intent
        intentDetectionConfidence: number
        diagnosticInfo: any
    }
    interface Parameters {
        fields: Fields
    }
    interface Fields {
        [field: string]: Field
    }
    interface Field {
        kind: string
        stringValue?: string
        listValue?: {
            values: [Field]
        }
    }
    interface Context {
        name: string
        lifespanCount: number
        parameters: any
    }
    interface Intent {
        name: string
        displayName: string
        webhookState: number
        priority: number
        isFallback: boolean
        mlDisabled: boolean
        inputContextNames: string[]
        events: string[]
        trainingPhrases: any[]
        action: string
        outputContexts: Context[]
        resetContexts: boolean
        parameters: any[]
        messages: Message[]
        defaultResponsePlatforms: any[]
        toorFollowupIntentName: string
        parentFollowupIntentName: string
        followupIntentInfo: any[]
    }
    interface Message {
        platform: number
        text: { text: string[] }
        image: { imageUri: string, accessibilityText: string}
        quickReplies: any
        card: any
        payload: any
        simpleResponses: any
        basicCard: any
        suggestions: any
        linkOutSuggestion: any
        listSelect: any
        carouselSelect: any
    }
}
