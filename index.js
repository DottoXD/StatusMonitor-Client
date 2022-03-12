const fastify = require("fastify")({ logger: true })
const { port } = require("./config.json")

fastify.register(require("./routes/index.js"))

fastify.listen(port, "0.0.0.0", function (err, address) { if (err) { fastify.log.error(err) } })
