const config = require("../config.json");
const os = require("os");
const osu = require("node-os-utils");

const cpu = osu.cpu;
const drive = osu.drive;
const mem = osu.mem;
const netstat = osu.netstat;

async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    if (config.password && request.headers.password !== config.password) return reply.send({ error: "unauthorised" });

    let networkIn = 0;
    let networkOut = 0;
    let cpuUsage = 0;
    let totalMem = 0;
    let usedMem = 0;
    let totalDisk = 0;
    let usedDisk = 0;
    let osUptime = os.uptime();

    function convertSeconds(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    await netstat.inOut().then((networkStats) => (networkIn = networkStats));
    await netstat.inOut().then((networkStats) => (networkOut = networkStats));
    await cpu.usage().then((cpuPercentage) => (cpuUsage = cpuPercentage));
    await mem.info().then((memoryInfo) => (totalMem = memoryInfo.totalMemMb * Math.pow(1024, 1)));
    await mem.info().then((memoryInfo) => (usedMem = memoryInfo.usedMemMb * Math.pow(1024, 1)));
    await drive.info().then((driveInfo) => (totalDisk = driveInfo.totalGb * Math.pow(1024, 1)));
    await drive.info().then((driveInfo) => (usedDisk = driveInfo.usedGb * Math.pow(1024, 1)));

    let newNetworkIn = 0;
    let newNetworkOut = 0;

    if (!networkIn || networkIn === "not supported") {
      networkIn = 0;
    } else {
      newNetworkIn = networkIn.total.inputMb;
    }
    
    if (!networkOut || networkOut === "not supported") {
      networkOut = 0;
    } else {
      newNetworkOut = networkOut.total.outputMb;
    }

    let convertedUptime = await convertSeconds(osUptime);

    return await reply.send({
      name: config.name,
      type: config.type,
      host: config.name,
      location: config.location,
      online4: true,
      online6: false,
      uptime: convertedUptime,
      network_rx: newNetworkIn,
      network_tx: newNetworkOut,
      cpu: cpuUsage,
      memory_total: totalMem,
      memory_used: usedMem,
      swap_total: 0,
      swap_used: 0,
      hdd_total: totalDisk,
      hdd_used: usedDisk,
      custom: "",
    });
  });
}

module.exports = routes;
