# StatusMonitor Client

A free, efficient and open source status monitoring solution.
You can selfhost [StatusMonitor Server](https://github.com/DottoXD/StatusMonitor-Server) to export your machine's stats on an awesome status page.

# Last updates

## 2.0

WIP.

# Features

This project can currently monitor the RAM, CPU and Disk usage along with the system's load value and the system's uptime.
This works perfectly on dedicated servers, VPSes, VMs and Docker containers.
You can use [StatusMonitor Process](https://github.com/DottoXD/StatusMonitor-Process) to monitor a NodeJS process' stats with ease.

# Known issues

There are no known issues at the moment.

# Setup

You can easily setup [StatusMonitor Client](https://github.com/DottoXD/StatusMonitor-Client) in 3 steps! (Or alternatively use the install script below this).

**Step one: clone the repo:**
_make sure to do this in an empty directory!_

```
git clone https://github.com/DottoXD/StatusMonitor-Client .
```

**Step two: install every dependency!**

```
npm install
```

**Step three: start the server!**

```
npm run start:prod
```

## Install script

[Click here!](https://github.com/DottoXD/StatusMonitor-Client/blob/main/Install.sh)
Note: The script should work just fine, but make sure to open an [issue](https://github.com/DottoXD/StatusMonitor-Client/issues) or a [pull request](https://github.com/DottoXD/StatusMonitor-Client/pulls) if you find any bugs!

```
wget -O - https://raw.githubusercontent.com/DottoXD/StatusMonitor-Client/main/Install.sh | sh
```

## Uninstall script

[Click here!](https://github.com/DottoXD/StatusMonitor-Client/blob/main/Uninstall.sh)
Note: The script should work just fine, but make sure to open an [issue](https://github.com/DottoXD/StatusMonitor-Client/issues) or a [pull request](https://github.com/DottoXD/StatusMonitor-Client/pulls) if you find any bugs!

```
wget -O - https://raw.githubusercontent.com/DottoXD/StatusMonitor-Client/main/Uninstall.sh | sh
```
