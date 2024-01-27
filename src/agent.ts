/* 
    @ StatusMonitor Client @

    - Coded by DottoXD & contributors -
    Last file edit: 27/01/2023
    Copyright DottoXD; This project is GPL-3.0 licensed.
*/

import Config from "../config.json";
import Si from "systeminformation";
import Undici from "undici";

import DataType from "./types/data";

export default class Agent {
	public async start(): Promise<void> {
		setInterval(async () => {
			await this.postData();
		}, Config.agent.interval);
	}

	public async postData(): Promise<void> {
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
			},
		);
	}

	public async getData(): Promise<DataType> {
		const Memory = await Si.mem();
		const Load = await Si.currentLoad();
		const Network = await Si.networkStats();

		return {
			memUsed: Memory.used,
			memTotal: Memory.total,
			cpuUsage: Load.currentLoad,
			load: Load.avgLoad,
			netRx: Network[0].rx_bytes,
			netTx: Network[0].tx_bytes,
			netRxSec: Network[0].rx_sec,
			netTxSec: Network[0].tx_sec,
		};
	}
}
