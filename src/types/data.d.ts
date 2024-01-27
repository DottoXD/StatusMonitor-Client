/* 
    @ StatusMonitor Client @

    - Coded by DottoXD & contributors -
    Last file edit: 27/01/2023
    Copyright DottoXD; This project is GPL-3.0 licensed.
*/

export default interface Data {
	memUsed: number;
	memTotal: number;
	cpuUsage: number;
	load: number;
	netRx: number;
	netTx: number;
	netRxSec: number;
	netTxSec: number;
	uptime: number;
	latency: number;
	platform: string;
}
