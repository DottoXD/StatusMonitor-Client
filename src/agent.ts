/* 
    @ StatusMonitor Client @

    - Coded by DottoXD & contributors -
    Last file edit: 27/01/2023
    Copyright DottoXD; This project is GPL-3.0 licensed.
*/

import Config from "../config.json";
import Si from "systeminformation";
import Undici, { ProxyAgent, getGlobalDispatcher } from "undici";
import Os from "os";

import DataType from "./types/data";

export default class Agent {
	public ProxyAgent = new ProxyAgent({
		uri: (Config.proxy.type == "HTTPS" ? "https" : "http") + "://" + Config.proxy.host + ":" + Config.proxy.port,
		token: "Basic " + Buffer.from(Config.proxy.username + ":" + Config.proxy.password)
	});

	public async start(): Promise<void> {
		setInterval(async () => {
			await this.postData();
		}, Config.agent.interval);
	}

	public async postData(): Promise<void> {
		try {
			await Undici.fetch(
				(Config.remote.protocol == "HTTPS" ? "https" : "http") +
					"://" +
					Config.remote.host +
					":" +
					(Config.remote.port ? Config.remote.port : "") +
					"/api/postAgentData",
				{
					body: JSON.stringify(await this.getData()),
					method: "POST",
					headers: {
						Authorization: Config.remote.key,
					},
					dispatcher: Config.proxy.host ? this.ProxyAgent : getGlobalDispatcher(),
				},
			);
		} catch (error) {
			console.log("Exception while sending data to server!");
		}
	}

	public async getData(): Promise<DataType> {
		const Memory = await Si.mem();
		const Load = await Si.currentLoad();
		const Network = await Si.networkStats();
		const Time = Si.time();
		const Latency = await Si.inetLatency(Config.agent.pingIp);

		return {
			memUsed: Memory.used / (1024 * 1024),
			memTotal: Memory.total / (1024 * 1024),
			cpuUsage: Load.currentLoad,
			load: Load.avgLoad,
			netRx: Network[0].rx_bytes / (1024 * 1024),
			netTx: Network[0].tx_bytes / (1024 * 1024),
			netRxSec: Network[0].rx_sec / (1024 * 1024),
			netTxSec: Network[0].tx_sec / (1024 * 1024),
			uptime: Time.uptime,
			latency: Latency,
			platform: Os.platform() + " " + Os.arch(),
		};
	}
}
