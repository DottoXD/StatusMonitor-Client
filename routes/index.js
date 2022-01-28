const config = require("../config.json");
const si = require("systeminformation");

async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    if (config.password && request.headers.password !== config.password) return reply.send({ error: "unauthorised" });

    let networkIn = 0;
    let networkOut = 0;
    let networkInSec = 0;
    let networkOutSec = 0;
    let cpuUsage = 0;
    let totalMem = 0;
    let usedMem = 0;
    let totalDisk = 0;
    let usedDisk = 0;
    let totalSwap = 0;
    let usedSwap = 0;
    let load = 0;
    let osUptime = si.time();

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
      
    await si.currentLoad().then(cpuPercentage => cpuUsage = Math.round(cpuPercentage.currentLoad));
    await si.mem().then((memoryInfo) => (totalMem = memoryInfo.total * Math.pow(1024, -1)));
    await si.mem().then((memoryInfo) => (usedMem = memoryInfo.used * Math.pow(1024, -1)));
    await si.fsSize().then((driveInfo) => (totalDisk = driveInfo[0].size * Math.pow(1024, -2)));
    await si.fsSize().then((driveInfo) => (usedDisk = driveInfo[0].used * Math.pow(1024, -2)));
    await si.mem().then((swapInfo) => (totalSwap = swapInfo.swaptotal * Math.pow(1024, -1)));
    await si.mem().then((swapInfo) => (usedSwap = swapInfo.swapused * Math.pow(1024, -1)));
    await si.networkStats().then((networkStats) => (networkIn = networkStats[0].rx_bytes));
    await si.networkStats().then((networkStats) => (networkOut = networkStats[0].tx_bytes));
    await si.networkStats().then((networkStats) => (networkInSec = networkStats[0].rx_sec));
    await si.networkStats().then((networkStats) => (networkOutSec = networkStats[0].tx_sec));
    
    let convertUptime = await convertSeconds(osUptime.uptime);

    return await reply.send({
      name: config.name,
      type: config.type,
      host: config.name,
      location: config.location,
      online4: true,
      online6: false,
      uptime: convertUptime,
      network_rx: networkIn,
      network_rx_sec: networkInSec,
      network_tx_sec: networkOutSec,
      cpu: cpuUsage,
      memory_total: totalMem,
      memory_used: usedMem,
      swap_total: totalSwap,
      swap_used: usedSwap,
      hdd_total: totalDisk,
      hdd_used: usedDisk,
      custom: "",
      load: 0
    });
  });
}

module.exports = routes;
