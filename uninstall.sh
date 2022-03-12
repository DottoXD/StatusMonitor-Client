# !/bin/bash

if [ $UID !== 0 ]
 then
  printf "Please run this as root! \n"
  exit
fi

systemctl disable --now statusmonitor
apt remove -y nodejs git
rm -r /etc/statusmonitor
rm /lib/systemd/system/statusmonitor.service

printf "StatusMonitor - Client by DottoXD has been uninstalled! \n"
