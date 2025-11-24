import fp from 'fastify-plugin'
import type { FastifyPluginAsync } from 'fastify'
import fastifyJWT, { FastifyJWTOptions } from '@fastify/jwt'

// 7 days
export const JWT_TOKEN_MAX_AGE = 7*24*60*60

const jwtPlugin: FastifyPluginAsync = async (server) => {
  await server.register<FastifyJWTOptions>(fastifyJWT, {
    secret: Buffer.from(process.env.JWT_SECRET as string, 'base64'),
  })

  server.decorate('authenticate', async function(request, reply) {
    try {
      await request.jwtVerify({ maxAge: JWT_TOKEN_MAX_AGE })
    } catch (err) {
      reply.send(err)
    }
  })
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  type UserPayload = {
    id: string
    iat: number
  }

  interface FastifyJWT {
    user: UserPayload
  }
}

export default fp(jwtPlugin)
