
import { FastifyPluginAsync } from 'fastify'

import { JWT_TOKEN_MAX_AGE } from 'plugins/jwtPlugin'
import ErrorMessage from '../constants/ErrorMessage'
import ReturnCode from '../constants/ReturnCode'
import { verifyPassword } from '../utils/crypto'

type LoginBody = {
  email: string
  password: string
}

const authRoutes: FastifyPluginAsync = async (server) => {
  server.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    const user = await server.userRepository.findOneByEmail(request.body.email)
    if (!user) {
      return reply.code(ReturnCode.FAILURE).send({ error: ErrorMessage.INVALID_LOGIN_PARAMS })
    }
    console.log(request.body.password, user.password)
    if (!(await verifyPassword(request.body.password, user.password))) {
      return reply.code(ReturnCode.FAILURE).send({ error: ErrorMessage.INVALID_LOGIN_PARAMS })
    }

    const token = server.jwt.sign({ id: user.id })
    const decodedToken = server.jwt.decode(token)
    let expires = Date.now() + JWT_TOKEN_MAX_AGE
    if (decodedToken && typeof decodedToken === 'object') {
      expires = (decodedToken as { id: string; iat: number }).iat + JWT_TOKEN_MAX_AGE
    }

    return { token, expires }
  })
}

export default authRoutes
