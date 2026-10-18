import { Buffer } from 'node:buffer'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { handleNexusChatEndpoint } from './src/server/aiChatEndpoint.ts'
import { handleAgentRunEndpoint } from './src/server/agentRunEndpoint.ts'

function readJsonBody(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk: Buffer) => {
      body += chunk.toString('utf8')
      if (Buffer.byteLength(body) > 24000) {
        reject(new Error('Request body is too large.'))
        request.destroy()
      }
    })
    request.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('A valid JSON request body is required.'))
      }
    })
    request.on('error', reject)
  })
}

function sendJson(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(body))
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.NEXUS_GEMINI_API_KEY || process.env.NEXUS_GEMINI_API_KEY
  const model = env.NEXUS_GEMINI_MODEL || process.env.NEXUS_GEMINI_MODEL

  return {
    plugins: [react(), {
      name: 'nexus-ai-chat-development-endpoint',
      configureServer(server) {
        server.middlewares.use('/api/agents/run', (request, response, next) => {
          if (request.method !== 'GET' && request.method !== 'POST') {
            void handleAgentRunEndpoint(request, {
              status(statusCode) {
                response.statusCode = statusCode
                return this
              },
              json(body) {
                sendJson(response, response.statusCode, body)
                return this
              },
              setHeader(name, value) {
                response.setHeader(name, value)
              },
            }, {
              apiKey,
              model,
              runToken: env.NEXUS_AGENT_RUN_TOKEN || process.env.NEXUS_AGENT_RUN_TOKEN,
              isProduction: mode === 'production',
              storage: {
                url: env.NEXUS_SUPABASE_URL || env.VITE_SUPABASE_URL || process.env.NEXUS_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
                serviceRoleKey: env.NEXUS_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXUS_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
                isProduction: mode === 'production',
              },
            })
            return
          }

          const invoke = async (body?: unknown) => handleAgentRunEndpoint(Object.assign(request, { body }), {
            status(statusCode) {
              response.statusCode = statusCode
              return this
            },
            json(result) {
              sendJson(response, response.statusCode, result)
              return this
            },
            setHeader(name, value) {
              response.setHeader(name, value)
            },
          }, {
            apiKey,
            model,
            runToken: env.NEXUS_AGENT_RUN_TOKEN || process.env.NEXUS_AGENT_RUN_TOKEN,
            isProduction: mode === 'production',
            storage: {
              url: env.NEXUS_SUPABASE_URL || env.VITE_SUPABASE_URL || process.env.NEXUS_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
              serviceRoleKey: env.NEXUS_SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXUS_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
              isProduction: mode === 'production',
            },
          })

          if (request.method === 'POST') {
            void readJsonBody(request).then(invoke).catch((error: unknown) => {
              sendJson(response, error instanceof Error && error.message.includes('too large') ? 413 : 400, {
                error: error instanceof Error ? error.message : 'The request could not be read.',
                code: 'INVALID_REQUEST',
              })
            })
          } else {
            void invoke()
          }
          void next
        })

        server.middlewares.use('/api/ai/chat', (request, response, next) => {
          if (request.method !== 'POST') {
            void handleNexusChatEndpoint(request, {
              status(statusCode) {
                response.statusCode = statusCode
                return this
              },
              json(body) {
                sendJson(response, response.statusCode, body)
                return this
              },
              setHeader(name, value) {
                response.setHeader(name, value)
              },
            }, apiKey, model)
            return
          }

          void readJsonBody(request).then(async (body) => {
            const chatRequest = Object.assign(request, { body })
            await handleNexusChatEndpoint(chatRequest, {
              status(statusCode) {
                response.statusCode = statusCode
                return this
              },
              json(result) {
                sendJson(response, response.statusCode, result)
                return this
              },
              setHeader(name, value) {
                response.setHeader(name, value)
              },
            }, apiKey, model)
          }).catch((error: unknown) => {
            sendJson(response, error instanceof Error && error.message.includes('too large') ? 413 : 400, {
              error: error instanceof Error ? error.message : 'The request could not be read.',
              code: 'INVALID_REQUEST',
            })
          })
          void next
        })
      },
    }],
  }
})
